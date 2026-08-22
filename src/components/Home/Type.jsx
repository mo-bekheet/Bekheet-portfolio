import React from "react";
import Typewriter from "typewriter-effect";
import { useSiteProfile } from "../../hooks/useSiteProfile.js";

const DEFAULT_ROLES = [
  "AI Delivery Engineer",
  "Agentic AI Engineer",
  "Machine Learning Engineer",
  "Generative AI Specialist",
  "Computer Vision Engineer"
];

function Type() {
  const profile = useSiteProfile();
  const strings = profile.roles?.length ? profile.roles : DEFAULT_ROLES;

  return (
    <Typewriter
      options={{
        strings,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
