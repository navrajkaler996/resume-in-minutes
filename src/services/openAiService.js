import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_RESUME_IN_MINUTES_V1_API_KEY
); // Store key in .env

/**
 * Generates experience bullet points using Gemini
 * @param {string} userInput - Info about the user's job or background
 * @returns {Promise<string>} - AI-generated bullet points
 */
export async function generateExperience(userInputArray) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Map each experience to a prompt and get AI results
    const results = await Promise.all(
      userInputArray.map(async (exp) => {
        const prompt = `Write 3 to 5 bullet points for a resume experience section based on this: ${exp.description}. Note: just give the points and separate each of them with a *`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Optionally, split the text into an array of bullet points
        // Remove empty entries and trim each point
        const keyPoints = text
          .split("*")
          .map((point) => point.trim())
          .filter((point) => point.length > 0);

        return keyPoints;
      })
    );

    // results is an array of arrays of bullet points
    return results;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Return an array of error messages if you want to keep array structure
    return userInputArray.map(() => [
      "Something went wrong while generating experience.",
    ]);
  }
}

export async function generateSummary(
  summaryInput,
  targettedRolesInput,
  skillsInput
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Rewrite the following rough resume summary into a polished, professional summary for a resume. Moreover, these are the roles targeted by the user: ${targettedRolesInput} and these are the skills the user possesses: ${skillsInput}. No options needed. Just one output. Make it 4 to 5 lines long:\n\n${summaryInput}\n\n`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Ensure the summary is 4-5 lines by splitting on newlines and trimming excess lines if needed
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Join only the first 5 lines (in case the AI returns more)
    const summary = lines.slice(0, 5).join("\n");
    return summary;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong while generating the summary.";
  }
}

export async function generateProjectKeyPoints(projectsArray) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const results = await Promise.all(
      projectsArray.map(async (proj) => {
        const prompt = `Write 3 concise bullet points for this project: ${proj.title}  based on this project description: ${proj.description} and technologies used: ${proj.technologies}. Just give the points and separate each with a *`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Split into bullet points
        const keyPoints = text
          .split("*")
          .map((point) => point.trim())
          .filter((point) => point.length > 0);

        return keyPoints;
      })
    );

    // Returns an array of arrays of bullet points (one array per project)
    return results;
  } catch (error) {
    console.error("Gemini Error:", error);
    return projectsArray.map(() => [
      "Something went wrong while generating project key points.",
    ]);
  }
}
