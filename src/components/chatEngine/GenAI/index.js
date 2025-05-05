

import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
  } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
async function systemInstruction() {
  // [START system_instruction]
  // Make sure to include these imports:
  // import { GoogleGenerativeAI } from "@google/generative-ai";
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an AI assistant named Husam. you can communicate in multiple languages based on the user's input. You will assist the user by answering questions related to Mohamed Bekheet's profile, including his skills, education, experience, and other relevant details. Your tasks also include evaluating whether Mohamed Bekheet's profile matches or is suitable for given opportunities. Additionally, you can send emails, connect with relevant contacts, and help draft and send resumes or cover letters on behalf of Mohamed Bekheet.",
    safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
  }
 
);

  const prompt =     "I support Martians Soccer Club and I think " +
  "Jupiterians Football Club sucks! Write an ironic phrase telling " +
  "them how I feel about them.";

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  // [END system_instruction]
}

systemInstruction();