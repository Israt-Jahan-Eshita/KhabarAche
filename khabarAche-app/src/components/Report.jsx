import React from "react";
import { useNavigate } from "react-router-dom"; 
import './Report.css';

const Report = () => {
  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <section className="contact">
      <form>
        <h2>Contact Form</h2>
        <div className="input-nao">
          <label>Full Name</label>
          <input type="text" className="field" placeholder="Enter your name" required />
        </div>
        <div className="input-nao">
          <label>Email Address</label>
          <input type="email" className="field" placeholder="Enter your email" required />
        </div>
        <div className="input-nao">
          <label>Your Message</label>
          <textarea name="" id="" className="field" placeholder="Enter your message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>

      <button onClick={handleBack} className="back-button">
        <i className="bx bx-arrow-back"></i> 
      </button>
    </section>
  );
};

export default Report;
