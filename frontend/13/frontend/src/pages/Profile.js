import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ displayName: "", photoUrl: "" });
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDXxzjI1NKvI10Yz_uSoJbvlohynnXe6lE",
          {
            idToken: token,
          }
        );
        const userData = response.data.users[0];
        setFormData({
          displayName: userData.displayName || "",
          photoUrl: userData.photoUrl || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        idToken: token,
        returnSecureToken: false,
      };
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDXxzjI1NKvI10Yz_uSoJbvlohynnXe6lE",
        payload
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="mb-4">Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="displayName">
              <Form.Label>Display Name:</Form.Label>
              <Form.Control
                type="text"
                name="displayName"
                onChange={handleChange}
                value={formData.displayName}
                className="m-2"
              />
            </Form.Group>
            <Form.Group controlId="photoUrl">
              <Form.Label>Photo URL:</Form.Label>
              <Form.Control
                type="text"
                name="photoUrl"
                onChange={handleChange}
                value={formData.photoUrl}
                className="m-2"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="m-2">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
