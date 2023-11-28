import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({ name: "", email: "" });

  const token = localStorage.getItem("Token");

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get("http://localhost:4000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, email } = response.data.user;
        setProfile({ name, email });
        setFormData({ name, email });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchUserDetails();
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
      const response = await axios.put(
        "http://localhost:4000/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/')
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
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="m-2"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
