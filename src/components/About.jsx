import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    fontSize: "1.2em",
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    // display: "flex",
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col style={styles.introImageContainer}>
                  <img src={data?.imageSource} alt="profile" />
                </Col>
                <Col style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                  <hr />
                  <div className="about-detail">
                    <ul>
                      <li>
                        <i className="xi-profile"></i>
                        <p>
                          <strong>NAME</strong>
                          <em>이원철</em>
                        </p>
                      </li>
                      <li>
                        <i className="xi-calendar"></i>
                        <p>
                          <strong>BIRTH</strong>
                          <em>92.02.14</em>
                        </p>
                      </li>
                      <li>
                        <i className="xi-maker"></i>
                        <p>
                          <strong>ADRESS</strong>
                          <em>
                            인천광역시 <br />
                            남동구
                          </em>
                        </p>
                      </li>
                      <li>
                        <i className="xi-call"></i>
                        <p>
                          <strong>PHONE</strong>
                          <em>010-6865-8255</em>
                        </p>
                      </li>
                      <li>
                        <i className="xi-gmail"></i>
                        <p>
                          <strong>EMAIL</strong>
                          <em>daylily0214@gmail.com</em>
                        </p>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
