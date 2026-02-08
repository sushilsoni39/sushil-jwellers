import { MetalType } from "../types";
import { INITIAL_PRICES } from "../constants";

export class GeminiService {
  constructor() {
    // API client removed to eliminate external dependencies
  }

  /**
   * Returns local market sentiments without external API calls
   */
  async getMarketInsight(metal: string) {
    const sentiments = [
      `${metal} prices are showing steady consolidation in major Indian hubs.`,
      `Increased festive demand is providing strong support for ${metal} levels.`,
      `Investors are closely watching global cues for the next big move in ${metal}.`,
      `${metal} remains a preferred safe-haven asset for Indian households this season.`,
      `Retail demand for ${metal} jewelry remains robust despite minor price fluctuations.`
    ];
    
    // Simulate a brief delay for realism
    await new Promise(resolve => setTimeout(resolve, 300));
    return sentiments[Math.floor(Math.random() * sentiments.length)];
  }

  /**
   * Simulates live price updates based on initial benchmarks
   */
  async fetchLivePrices() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const getPrice = (type: MetalType) => {
        const base = INITIAL_PRICES.find(p => p.type === type)?.pricePerGram || 5000;
        // Apply a random fluctuation between -0.5% and +0.5%
        const fluctuation = 1 + (Math.random() - 0.5) * 0.01;
        return Math.round(base * fluctuation * 100) / 100;
      };

      return {
        gold: getPrice(MetalType.GOLD),
        silver: getPrice(MetalType.SILVER),
        platinum: getPrice(MetalType.PLATINUM)
      };
    } catch (error) {
      console.error("Failed to simulate prices:", error);
      return null;
    }
  }

  /**
   * Generates elegant taglines locally
   */
  async generateProductTagline(productName: string) {
    const templates = [
      `Embodying the timeless grace of ${productName}.`,
      `${productName}: A legacy of elegance for the modern queen.`,
      `Where heritage meets craftsmanship: The ${productName}.`,
      `Exquisite detail for your most precious moments.`,
      `The pinnacle of artisanal luxury and sophisticated charm.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }
}

export const geminiService = new GeminiService();
