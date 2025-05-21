import React, { useEffect, useState } from 'react'
import GetTicket from './GetTicket.js';

function Home() {
    const [data, setdata] = useState([]);
    async function display() {
        try {
            const info = await fetch("http://localhost:5000/");
            const detail = await info.json();
            setdata(detail);
            console.log(detail);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        display();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {data.map((event,index) => (
                    <div className="col-md-4" key={event.link || index} >
                        <div className="card mb-4 shadow-sm">
                            <img src={event.imgSrc} className="card-img-top" alt={event.title} />
                            <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text"><strong>📅 Date:</strong> {event.date}</p>
                                <p className="card-text"><strong>📍 Place:</strong> {event.place}</p>
                               
                                <GetTicket link={event.link} id={index} />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Home