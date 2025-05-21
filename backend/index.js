import * as cheerio from 'cheerio';
import axios from "axios";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import env from "dotenv";
env.config();

const app = express();
const port=5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//------- Scraping code ------------
const url = 'https://www.eventbrite.com.au/d/australia--sydney/events/';
let data ;

async function fetchEvents() {
    data=[];
    try{
        await axios.get(url).
        then((response) => {
            let $ = cheerio.load(response.data);
            $('.popular_events--bucket-wrapper .discover-vertical-event-card ').each(function (index, el) {
                const title = $(el).find('.Stack_root__1ksk7 h3').text().trim();
                const link = $(el).find('.Stack_root__1ksk7 a').attr('href');
                const date = $(el).find('.Stack_root__1ksk7>p:first-of-type').text().trim();
                const place = $(el).find('.Stack_root__1ksk7>p').eq(1).text().trim();
                const imgSrc = $(el).find('img').attr('src');
                if (title && link && date && place && imgSrc) {
                    data.push({ title, link, date, place, imgSrc });
                }
            });
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }catch(err){
        console.log(err);
    }
   
}

fetchEvents();

//2hours
setInterval(async () => {
  const newEvents = await fetchEvents();
  events = newEvents;
},  1000 * 60 * 60 * 2);
//------- END Scraping code ------------

app.get("/", (req, res) => {
    res.json(data);
});


app.listen(port, () => {
    console.log("Server is running on : ", port);
})
