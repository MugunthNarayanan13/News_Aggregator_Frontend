import { GoogleGenerativeAI } from "@google/generative-ai";

export async function createChatSession() {
    let apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log("API key:", apiKey);
    if (apiKey == undefined) {
        console.log("ERROR API doesnt exist", apiKey);
        apiKey = "";
    }
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction:
            "I will give you the link of a news article...try to generate a summary of that article from the headline. Give only the summary and not anything else. GIve summary of length 200 words.",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    return model.startChat({
        generationConfig,
    });
}