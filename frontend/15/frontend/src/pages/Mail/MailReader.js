import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function MailReader() {
  const { id } = useParams();
  const [mail, setMail] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMailById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/mail/get-mail-by-id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              id: id,
            },
          }
        );

        setMail(response.data.mail);
      } catch (error) {
        console.error("Error fetching mail by ID:", error);
      }
    };

    fetchMailById();
  }, [id, token]);

  return (
    <div className="container mx-0">
      <div className="row">
        <div className="col-md-1 p-0">
          {/* <Sidebar /> */}
        </div>
        <div className="col-md-9 mt-5">
          <h2 className="mb-4">Mail Details</h2>
          {mail ? (
            <div className="card col-md-10">
              <div className="card-header">
                <h5 className="card-title">{mail.subject}</h5>
                <p className="card-text">From: {mail.senderEmail}</p>
              </div>
              <div className="card-body" style={{ minHeight: "350px" }}>
                <p className="card-text">{mail.body}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MailReader;
