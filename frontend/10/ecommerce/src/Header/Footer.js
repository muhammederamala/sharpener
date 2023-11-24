import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light p-4">
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <h4 className="mb-3">Connect With Us</h4>
            <div className="d-flex justify-content-center">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light mx-2"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light mx-2"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light mx-2"
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <h4 className="mb-3">Contact Us</h4>
            <p className="mb-0">
              <FaEnvelope className="mr-2" /> info@yourband.com
            </p>
          </Col>
          <Col md={4} className="text-center">
            <h4 className="mb-3">&copy; 2023 Your Band</h4>
            <p className="mb-0">All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
