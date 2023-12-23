import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SendMailPage() {
  const navigate = useNavigate();
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const token = localStorage.getItem("token");

  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the editor content to raw format
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    // Prepare the data to be sent in the request body
    const emailData = {
      recipientEmail,
      subject,
      body: rawContentState,
    };

    try {
      // Make an Axios POST request with the Bearer token
      const response = await axios.post(
        "http://localhost:4000/mail/send-mail",
        emailData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
      // Handle the response as needed
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error sending email:", error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="recipientEmail" className="col-md-1 col-form-label">
            To:
          </label>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              id="recipientEmail"
              value={recipientEmail}
              onChange={handleRecipientEmailChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="subject" className="col-md-1 col-form-label">
            Subject:
          </label>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="body" className="col-md-1 col-form-label">
            Body:
          </label>
          <div className="col-md-8">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class form-control"
              toolbarClassName="toolbar-class"
              editorStyle={{ minHeight: "200px" }} // Set the minimum height here
            />
            <button type="submit" className="btn btn-primary mt-3">
              Send Email
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendMailPage;
