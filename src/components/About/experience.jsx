import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import experiences from "./experiecesContent.js"; 
import { SectionWrapper } from "../hoc/index.js";
import StarIcon from '@mui/icons-material/Star';

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
// Component styling
contentStyle={{
  background: `
    linear-gradient(
      145deg,
      rgba(19, 15, 38, 0.92) 20%,
      rgba(28, 22, 54, 0.92) 80%
    )`,
  backdropFilter: 'blur(16px) saturate(200%)',
  border: '1px solid rgba(199, 112, 240, 0.15)',
  boxShadow: `
    0 0 20px rgba(199, 112, 240, 0.1),
    inset 0 0 15px rgba(255, 255, 255, 0.05)
  `,
  color: '#e8e1ff',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `
      0 0 35px rgba(199, 112, 240, 0.25),
      inset 0 0 20px rgba(255, 255, 255, 0.1)
    `,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `
      linear-gradient(
        45deg,
        transparent 45%,
        rgba(199, 112, 240, 0.1) 50%,
        transparent 55%
      )
    `,
    animation: 'rotateGlow 12s linear infinite',
    pointerEvents: 'none',
  },
}}

contentArrowStyle={{
  borderRight: '7px solid rgba(155, 89, 182, 0.4)',
  filter: 'drop-shadow(0 0 8px rgba(199, 112, 240, 0.3))',
  '&::before': {
    content: '""',
    position: 'absolute',
    right: '-7px',
    top: '0',
    height: '100%',
    width: '3px',
    background: `
      linear-gradient(
        to bottom,
        rgba(199, 112, 240, 0.6),
        rgba(138, 43, 226, 0.6)
      )
    `,
    animation: 'pulseGlow 2s ease-in-out infinite',
  },
}}
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
      <motion.div id="experience">
        <h1 className="project-heading">
          <strong className="purple">Professional </strong>Experience
        </h1>
      </motion.div>
      <motion.div> 
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
      </motion.div>
    </>
  );
};

export default SectionWrapper(ExperienceJourney, "work");
