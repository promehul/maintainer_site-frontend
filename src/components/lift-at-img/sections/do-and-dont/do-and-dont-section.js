import React, { Component, useState, useEffect , useRef} from "react";
import styles from "../../../../css/life_at_img/sections/do-and-dont.css";
import { Container } from "semantic-ui-react";
import redCircle from "./red_circle.png";
import redArrow from "./red_arrow.png";
import greenCircle from "./green_circle.png";
import greenArrow from "./green_arrow.png";

const DoAndDontSection = () => {
  const weAreJson = [
    "One team, One family",
    "Make a Difference Every Day",
    "Stay humble and learn together",
    "Word hard, Party harder",
    "Do the right thing",
    "Lead by institute, driven by IITR junta",
  ];
  const weAreNotJson = [
    "One team, One family",
    "Make a Difference Every Day",
    "Stay humble and learn together",
    "Word hard, Party harder",
    "Do the right thing",
    "Hello",
  ];
  const scrollbarRef = useRef(null);
  const contentRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeOption, setActiveOption] = React.useState(1);
  const [displayJson, setDisplayJson] = React.useState(weAreJson);
  const [isRedHovered, setIsRedHovered] = React.useState(false);
  const [isGreenHovered, setIsGreenHovered] = React.useState(false);
  const [showWeAreHeading, setShowWeAreHeading] = useState(true);
  const [showWeAreNotHeading, setShowWeAreNotHeading] = useState(false);
  const handleOptionChange = (value) => {
    if (value == activeOption) {
    } else {
      if (value) {
        setDisplayJson(weAreJson);
      } else {
        setDisplayJson(weAreNotJson);
      }
      setActiveOption(value);
    }
  };


  const handleScroll = (event) => {
    const scrollPosition = event.target.scrollLeft;
    const scrollWidth = event.target.scrollWidth - event.target.clientWidth;
  
    if (scrollPosition > scrollWidth / 2) {
      setShowWeAreHeading(false);
      setShowWeAreNotHeading(true);
      setDisplayJson(weAreNotJson);
    } else {
      setShowWeAreHeading(true);
      setShowWeAreNotHeading(false);
      setDisplayJson(weAreJson);
    }
  };

  
  useEffect(() => {
    const scrollbar = scrollbarRef.current;
    if (scrollbar) {
      scrollbar.addEventListener("scroll", handleScroll);
  
      return () => {
        scrollbar.removeEventListener("scroll", handleScroll);
      };
    }
  }, [weAreJson, weAreNotJson]);

  const triggerRedFadeIn = () => {
    setIsRedHovered(true);
  };

  const triggerRedFadeOut = () => {
    setIsRedHovered(false);
  };

  const triggerGreenFadeIn = () => {
    setIsGreenHovered(true);
  };
  const triggerGreenFadeOut = () => {
    setIsGreenHovered(false);
  };
  return (
    <div styleName="styles.container">
      <div class="heading">
        <Container>
          <img
            src={greenArrow}
            className={`${
              activeOption
                ? styles["green-arrow-hover"]
                : isGreenHovered
                ? styles["green-arrow-hover"]
                : styles["green-arrow"]
            }`}
          />
          <img
            src={greenCircle}
            className={`${
              activeOption
                ? styles["green-circle-hover"]
                : isGreenHovered
                ? styles["green-circle-hover"]
                : ""
            }`}
            styleName="styles.green-circle"
            onMouseEnter={triggerGreenFadeIn}
            onMouseLeave={triggerGreenFadeOut}
            onClick={() => {
              handleOptionChange(1);
            }}
          />
          {!activeOption ? (
            <div
              className={`${
                !isGreenHovered
                  ? styles["we-are-not-active-heading"]
                  : styles["bring-active"]
              }`}
              styleName="styles.heading styles.paddingLeft"
            >
              We Are
            </div>
          ) : (
            <div styleName="styles.heading styles.we-are-heading styles.paddingLeft">
              We Are
            </div>
          )}
        </Container>
      </div>
      <div styleName="styles.mob-heading">
    {showWeAreHeading && <h1>We Are</h1>}
    {showWeAreNotHeading && <h1>We Are Not</h1>}
    
  </div>
      <div styleName="styles.content" ref={contentRef}>
        {displayJson.map((value) => {
          return (
            <div
              styleName="styles.gradient-border styles.content"
              key={activeOption + value}
            >
              <h2 styleName="styles.sub-heading styles.sub-heading-animation">
                {value}
              </h2>
            </div>
          );
        })}
      </div>
      <div className={styles.scrollbarContainer} ref={scrollbarRef} onScroll={handleScroll}>
      <div className={styles.scrollbar}></div>
    </div>
 
      <div>
        <Container>
          <div styleName="styles.right-align">
            <img
              src={redCircle}
              className={`${
                !activeOption
                  ? styles["red-circle-hover"]
                  : isRedHovered
                  ? styles["red-circle-hover"]
                  : ""
              }`}
              styleName="styles.red-circle"
              onMouseEnter={triggerRedFadeIn}
              onMouseLeave={triggerRedFadeOut}
              onClick={() => {
                handleOptionChange(0);
              }}
            />
            {activeOption ? (
              <div
                className={`${
                  !isRedHovered
                    ? styles["we-are-not-active-heading"]
                    : styles["bring-active"]
                }`}
                styleName="styles.heading styles.paddingTop"
              >
                We Aren't
              </div>
            ) : (
              <div styleName="styles.heading styles.paddingTop styles.we-are-not-heading">
                We Aren't
              </div>
            )}
            <img
              src={redArrow}
              className={`${
                !activeOption
                  ? styles["red-arrow-hover"]
                  : isRedHovered
                  ? styles["red-arrow-hover"]
                  : styles["red-arrow"]
              }`}
            />
          </div>
        </Container>
      </div>
    </div>
  );
  
  
};

export default DoAndDontSection;
