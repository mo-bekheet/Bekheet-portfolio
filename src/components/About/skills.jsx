import React from "react";
import Marquee from "react-fast-marquee";

function Skills({ skillsData, title }) {
  return (
    <div className="skills-marquee-container">
      <Marquee
        gradient={false}
        speed={80}
        pauseOnHover={true}
        pauseOnClick={true}
        delay={0}
        play={true}
        direction="left"
      >
        {skillsData.map((skill, id) => (
          <div className="skills-marquee-item" key={id}>
            <div className="skills-marquee-card">
              <div className="skills-marquee-card-divider">
                <div className="skills-marquee-card-divider-inner">
                  <div className="skills-marquee-card-divider-line"></div>
                </div>
              </div>
              <div className="skills-marquee-card-content">
                <div className="skills-marquee-card-icon">
                  {/* Use the icon from the skill object */}
                  {skill.icon && <img src={skill.icon} alt={skill.name || title} />}
                </div>
                <p className="skills-marquee-card-text">
                  {skill.name || skill}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Skills;
