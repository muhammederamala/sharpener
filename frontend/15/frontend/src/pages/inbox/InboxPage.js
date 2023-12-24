import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Inbox.css";

function InboxPage() {
  const [mails, setMails] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/mail/fetch-all-mails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const truncatedMails = response.data.map((mail) => ({
          ...mail,
          body:
            mail.body.length > 100
              ? mail.body.slice(0, 100) + "..."
              : mail.body,
        }));

        setMails(truncatedMails);
      } catch (error) {
        console.error("Error fetching mails:", error);
      }
    };

    fetchMails();
  }, [token]);

  return (
    <div className="container mt-5">
      <Link to="/send-mail">
        <button className="btn btn-secondary mb-3">Compose</button>
      </Link>
      <h1>Inbox</h1>
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group" style={{ border: "none" }}>
            {mails.map((mail) => (
              <li
                key={mail._id}
                className="list-group-item mb-3 px-0"
                style={{ border: "none" }}
              >
                <div className="card mail">
                  <div className="card-body">
                    <h5 className="card-title">From: {mail.senderEmail}</h5>
                    <p className="card-text">Subject: {mail.subject}</p>
                    <p className="card-text">Body: {mail.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InboxPage;
