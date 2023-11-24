// AboutScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from './AboutScreen.module.css';

function AboutScreen() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h2>Welcome to Our E-Commerce Store</h2>
          <p>
            At [Your Company Name], we are passionate about delivering high-quality products and an exceptional shopping experience to our valued customers.
          </p>
          <p>
            Our commitment to excellence is reflected in every aspect of our business, from the careful selection of products to our dedicated customer support team.
          </p>
        </Col>
        <Col md={6}>
          <div className={classes.imageContainer}>
            <img
              src="https://images.pexels.com/photos/3017260/pexels-photo-3017260.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="About Us"
              className="img-fluid rounded"
            />
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col md={6}>
          <h3>Our Values</h3>
          <p>
            [Your Company Name] is built on a foundation of integrity, transparency, and customer satisfaction. We believe in providing products that meet the highest standards of quality and craftsmanship.
          </p>
          <p>
            Our values extend to our relationships with customers, partners, and the community. We are committed to fostering a positive and inclusive shopping environment for everyone.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg?auto=compress&cs=tinysrgb&w=600"
            alt="Team"
            className="img-fluid rounded"
          />
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col md={6}>
          <h3>Product Quality</h3>
          <p>
            Our curated selection of products undergoes rigorous quality checks to ensure that you receive items that not only meet but exceed your expectations.
          </p>
          <p>
            We source from reputable suppliers and strive to bring you the latest trends and innovations in the market. Your satisfaction with our products is our top priority.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="https://images.pexels.com/photos/7125136/pexels-photo-7125136.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Product Quality"
            className="img-fluid rounded"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AboutScreen;
