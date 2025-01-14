import { useState } from "react";
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

export const ContactUs = () => {
  const [contact, setContact] = useState({
    email: "",
    phoneno: "",
    message: "",
  });
  const router = useRouter();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message Sent")
        router.push('/')
        console.log("Message sent successfully:", result);
      } else {
        console.error("Failed to send message:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <Navbar />
      <section className="section-contact">
        <div className="contact-content container">
        
          <h1 className="main-heading">Contact Us</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="https://cdn1.iconfinder.com/data/icons/shopping-115/32/ask-question-256.png" alt="we are always ready to help" width="50%" height="50%" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneno">Phone No</label>
                <input
                  type="text"
                  name="phoneno"
                  id="phoneno"
                  autoComplete="off"
                  value={contact.phoneno}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>
        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551513026616!2d74.30043917540432!3d31.48152117423166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2s!4v1733247379050!5m2!1sen!2s"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default ContactUs;
