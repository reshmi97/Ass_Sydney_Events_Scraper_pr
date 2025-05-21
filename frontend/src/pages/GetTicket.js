import React,{useState} from 'react'


function GetTicket(event) {
    const [email, setEmail] = useState('');
    const [optIn, setOptIn] = useState(false);
    let emails = [];
    return (
        <div>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${event.id}`}
            >
                Get Tickets
            </button>

            <div className="modal fade" id={`id${event.id}`} >  
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Enter Email to Continue</h5>
                            {/* <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button> */}
                        </div>

                        <div className="modal-body">
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`check${event.id}`}
                                    checked={optIn}
                                    onChange={(e) => setOptIn(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor={`check${event.id}`}>
                                    I agree to receive event updates
                                </label>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    if (!optIn) return alert("Please check the opt-in box.");
                                    if (!email) return alert("Please enter your email.");
                                    emails.push({ email, optIn }); // save to array or backend
                                    window.open(event.link, '_blank', 'noopener,noreferrer');
                                }}
                            >
                                Continue
                            </button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetTicket;