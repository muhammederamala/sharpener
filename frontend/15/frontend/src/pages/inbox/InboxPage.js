import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Inbox.css";
import Sidebar from "../../components/Sidebar";

function InboxPage() {
  const [mails, setMails] = useState([]);
  const [unread, setUnRead] = useState();
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

        const truncatedMails = response.data.receivedMails.map((mail) => ({
          ...mail,
          body:
            mail.body.length > 100
              ? mail.body.slice(0, 100) + "..."
              : mail.body,
        }));

        setMails(truncatedMails);
        setUnRead(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching mails:", error);
      }
    };

    fetchMails();
    const intervalId = setInterval(fetchMails, 2000);
    return () => clearInterval(intervalId);
  }, [token]);

  const handleDeleteMail = async (mailId) => {
    try {
      await axios.delete(`http://localhost:4000/mail/delete-mail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: mailId,
        },
      });

      setMails((prevMails) => prevMails.filter((mail) => mail._id !== mailId));
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return (
    <div className="container mx-0">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar unread={unread} />
        </div>
        <div className="col-md-9 mt-5">
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
                    <div
                      className={`card mail ${
                        mail.read ? "read-mail" : "unread-mail"
                      }`}
                    >
                      <div className="card-body">
                        <h5 className="card-title">From: {mail.senderEmail}</h5>
                        <p className="card-text">Subject: {mail.subject}</p>
                        <p className="card-text">Body: {mail.body}</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteMail(mail._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxPage;
