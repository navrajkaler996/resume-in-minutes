import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_RESUME_IN_MINUTES_V1_API_KEY
); // Store key in .env

/**
 * Generates experience bullet points using Gemini
 * @param {string} userInput - Info about the user's job or background
 * @returns {Promise<string>} - AI-generated bullet points
 */
export async function generateExperience(userInput) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Write 3 to 5 bullet points for a resume experience section based on this: ${userInput}. Note: just give the points and seperate each of them with a *`;

    const result = await model.generateContent(prompt);

    // The response structure is different from OpenAI!
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong while generating experience.";
  }
}
