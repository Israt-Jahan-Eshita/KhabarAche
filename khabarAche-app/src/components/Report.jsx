import React from "react";
import './Report.css'
const Report = () =>
{
    return (
    <section className="contact">
        <form>
            <h2>Contact Form</h2>
            <div className="input-nao">
                <label>Full Name</label>
                <input type="text" className="field" placeholder="Enter your name" required/>
            </div>
            <div className="input-nao">
                <label>Email Address</label>
                <input type="email" className="field" placeholder="Enter your email" required/>
            </div>
            <div className="input-nao">
                <label>Your Message</label>
                <textarea name="" id="" className="field" placeholder="Enter you message" required>
                </textarea>
            </div>
            <button type="submit">Send</button>
        </form>
    </section>
    )
}