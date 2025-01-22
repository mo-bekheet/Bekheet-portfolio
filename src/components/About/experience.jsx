import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import experiences from "./experiecesContent.js"; 
import { SectionWrapper } from "../hoc/index.js";
import { textVariant } from "../utils/motion.js";
import StarIcon from '@mui/icons-material/Star';

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }} // Fixed CSS value
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="vertical-timeline-element-icon flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      }
    >
      <div>
        <h3 className="vertical-timeline-element-title text-white text-[24px] font-bold">
          {experience.title}
        </h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
        {experience.link && (
          <div className="flex justify-center items-center">
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline inline-block"
            >
              <button className="round-button">Visit Website</button>
            </a>
          </div>
        )}
      </ul>
    </VerticalTimelineElement>
  );
};

const ExperienceJourney = () => {
  return (
    <>
      <motion.div id="experience" variants={textVariant()}>
        <h1 className="project-heading">
          <strong className="purple">Professional </strong>Experience
        </h1>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
          <VerticalTimelineElement
            iconStyle={{ background: "#c95bf5", color: "rgb(255 255 255)" }}
            icon={<StarIcon />}
          />
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(ExperienceJourney, "work");
