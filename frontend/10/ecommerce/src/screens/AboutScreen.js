import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import classes from "./AboutScreen.module.css";
import Footer from "../Header/Footer";

function AboutScreen() {
  return (
    <Fragment>
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <h2>Welcome to Our Music Band</h2>
            <p>
              At [Your Band Name], we are dedicated to creating memorable
              musical experiences and connecting with our audience through the
              power of music.
            </p>
            <p>
              From energetic performances to soulful compositions, our
              commitment to musical excellence is at the heart of everything we
              do.
            </p>
          </Col>
          <Col md={6}>
            <div className={classes.imageContainer}>
              <img
                src="https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Band Members"
                className="img-fluid rounded"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="mt-4">
          <Col md={6}>
            <h3>Our Musical Journey</h3>
            <p>
              [Your Band Name] was formed with a shared passion for music and a
              desire to create a unique sound that resonates with our listeners.
            </p>
            <p>
              Our journey is marked by collaborations, creative exploration, and
              a dedication to delivering performances that leave a lasting
              impact.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="https://images.pexels.com/photos/1649691/pexels-photo-1649691.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Band Rehearsal"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
        <hr />
        <Row className="mt-4">
          <Col md={6}>
            <h3>Musical Diversity</h3>
            <p>
              [Your Band Name] embraces musical diversity, drawing inspiration
              from various genres to create a dynamic and eclectic sound.
            </p>
            <p>
              From rock and jazz to blues and beyond, our goal is to take you on
              a musical journey that transcends boundaries and resonates with
              your soul.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="https://images.pexels.com/photos/2717073/pexels-photo-2717073.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Concert Performance"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
        <div style={{ minHeight: "80px" }}></div>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default AboutScreen;
