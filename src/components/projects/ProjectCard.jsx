import React, { useContext, useState } from "react";
import { Button, Card, Badge, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import ReactMarkdown from "react-markdown";

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: "left",
  },
  linkStyle: {
    textDecoration: "none",
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
  imageStyle: {
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  imageHoverStyle: {
    transform: "scale(1.05)",
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;
  const [isHovering, setIsHovering] = useState(false);
  const { project } = props;

  const imageClick = () => {
    const liveLink = project.links.find((link) => link.text === "Live");
    if (liveLink) {
      window.open(liveLink.href, "_blank");
    }
  };

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img
          variant="top"
          src={project?.image}
          onClick={imageClick}
          style={{
            ...styles.imageStyle,
            ...(isHovering ? styles.imageHoverStyle : {}), // 호버 여부에 따라 스타일 적용
          }}
          onMouseEnter={() => setIsHovering(true)} // 마우스 올리면 isHovering 상태 true로 변경
          onMouseLeave={() => setIsHovering(false)} // 마우스 내리면 isHovering 상태 false로 변경
        />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>{parseBodyText(project.bodyText)}</Card.Text>
        </Card.Body>

        <Card.Body>
          {project?.links?.map((link) => (
            <Button key={link.href} style={styles.buttonStyle} variant={"outline-" + theme.bsSecondaryVariant} onClick={() => window.open(link.href, "_blank")}>
              {link.text}
            </Button>
          ))}
        </Card.Body>
        {project.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {project.tags.map((tag) => (
              <Badge key={tag} pill bg={theme.bsSecondaryVariant} text={theme.bsPrimaryVariant} style={styles.badgeStyle}>
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
