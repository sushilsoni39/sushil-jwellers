
import { GoogleGenAI } from "@google/genai";
import { MetalType } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Helper to call Gemini API with exponential backoff retry logic
   */
  private async withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        const isRateLimit = error?.status === 429 || 
                          error?.code === 429 || 
                          error?.message?.includes('429') || 
                          error?.message?.includes('quota');
        
        if (isRateLimit && i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 2000 + Math.random() * 1000;
          console.warn(`Gemini API rate limited. Retrying in ${Math.round(delay)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  }

  async getMarketInsight(metal: string) {
    try {
      const response = await this.withRetry(() => this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a very brief (20 words max) market sentiment for ${metal} prices in India today.`,
        config: {
          temperature: 0.7,
        }
      }));
      return response.text || "Stable market conditions expected.";
    } catch (error) {
      console.error("Gemini insight error:", error);
      // Fallback insights based on general trends
      const fallbacks: Record<string, string> = {
        'Gold': "Gold remains a preferred hedge against inflation in Indian households.",
        'Silver': "Industrial demand continues to support silver prices in the domestic market.",
        'Platinum': "Platinum maintains its luxury appeal with steady investment interest."
      };
      return fallbacks[metal] || "Market indicators suggest steady growth for precious metals.";
    }
  }

  async fetchLivePrices() {
    try {
      const response = await this.withRetry(() => this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Current live market rate per gram in INR for 24K Gold, Silver, and Platinum in India today. Return ONLY 3 numbers separated by commas in this exact order: Gold_Price, Silver_Price, Platinum_Price. Do not include any text, currency symbols, or headers.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      }));

      const text = response.text || "";
      const numbers = text.match(/\d+([,.]\d+)?/g);
      
      if (numbers && numbers.length >= 3) {
        const cleanVal = (s: string) => parseFloat(s.replace(',', ''));
        return {
          gold: cleanVal(numbers[0]),
          silver: cleanVal(numbers[1]),
          platinum: cleanVal(numbers[2])
        };
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch live prices via Gemini Search:", error);
      return null;
    }
  }

  async generateProductTagline(productName: string) {
    try {
      const response = await this.withRetry(() => this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a one-line luxury tagline for a jewelry piece named "${productName}".`,
        config: {
          temperature: 0.9,
        }
      }));
      return response.text || "Exquisite craftsmanship for your timeless moments.";
    } catch (error) {
      return "Timeless elegance for every occasion.";
    }
  }
}

export const geminiService = new GeminiService();
