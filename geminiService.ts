
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GeneratedRecipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateGlutenFreeRecipe(
  ingredients: string,
  mealType: string,
  language: string = 'en'
): Promise<GeneratedRecipe> {
  const prompt = `Create a professional gluten-free ${mealType} recipe using these ingredients: ${ingredients}. 
  The response must be in ${language === 'ar' ? 'Arabic' : language === 'fr' ? 'French' : 'English'}.
  Ensure all ingredients and steps are strictly gluten-free.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      systemInstruction: "You are a world-class gluten-free chef and nutritionist. You specialize in creating safe, delicious, and culturally relevant recipes. You provide clear, step-by-step instructions and estimate prep time and difficulty accurately.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The name of the recipe." },
          description: { type: Type.STRING, description: "A brief, appetizing description of the dish." },
          ingredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of ingredients with quantities." 
          },
          instructions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Step-by-step cooking instructions." 
          },
          prepTime: { type: Type.STRING, description: "Estimated preparation time (e.g., '25 min')." },
          difficulty: { type: Type.STRING, description: "Difficulty level (Easy, Medium, or Hard)." }
        },
        required: ["title", "description", "ingredients", "instructions", "prepTime", "difficulty"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("No response text received from Gemini");
    return JSON.parse(text) as GeneratedRecipe;
  } catch (error) {
    console.error("Error parsing recipe JSON:", error);
    throw new Error("Failed to generate a valid recipe structure.");
  }
}

export async function generateRecipeImage(title: string): Promise<string> {
  const prompt = `A professional, high-end food photography shot of ${title}. 
  The dish is plated beautifully on a rustic table with natural lighting. 
  Gourmet presentation, vibrant colors, shallow depth of field, 8k resolution, appetizing and fresh.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image was generated");
}

export async function generateProductImage(productName: string): Promise<string> {
  const prompt = `A professional commercial product photograph of ${productName}. 
  Clean studio lighting, minimalist background, premium packaging or fresh presentation. 
  High-end commercial quality, sharp focus, vibrant and enticing for a luxury food marketplace.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No product image was generated");
}
