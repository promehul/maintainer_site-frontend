import React, { Component } from 'react'
import styles from '../../../../css/life_at_img/sections/interests.css'
import { Container, Card, Image } from 'semantic-ui-react';
import webDevelopment from './Frame.png';
import gameDevelopment from './Front_1_.png';
import productDesign from './image 151.png';
const json = [
    {
      name: "Web Development",
      text: "Building a better web for IITR, one line of code at a time.",
      image: webDevelopment,
      backgroundColor: "#B0E0FC",
    },
    {
      name: "Game Development",
      text: "Creating games that are fun, engaging and educational.",
      image: gameDevelopment,
      backgroundColor: "#BAD4FE",
    },
    {
      name: "Product Design",
      text: "Designing products that are user-friendly and intuitive.",
      image: productDesign,
      backgroundColor: "#CEE3FE",
    },
  ];

  const InterestsSection = () => {
    return (
      <div styleName="styles.container">
        <Container styleName="styles.sub-container">
          <div styleName="styles.heading">Our interests</div>
          <Card.Group styleName="styles.cards">
            {json.map((item) => (
              <Card styleName="styles.card" key={item.name}>
                <div styleName="styles.card-img" style={{ backgroundColor: item.backgroundColor }}>
                  <Image src={item.image} alt={item.name} />
                </div>
                <Card.Content>
                  <Card.Header styleName="styles.card-name">{item.name}</Card.Header>
                  <Card.Description styleName="styles.card-text">{item.text}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  };
  export default InterestsSection;