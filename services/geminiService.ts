import { TripData, TripGenerationParams } from "../types";

// This file is now completely inert for the static version.
// No Google GenAI imports to prevent build errors.

export const generateTripItinerary = async (params: TripGenerationParams): Promise<TripData> => {
  // Logic removed for static deployment. 
  // This ensures the app doesn't look for an API_KEY.
  throw new Error("此版本為靜態瀏覽模式，不支援 AI 生成功能。");
};