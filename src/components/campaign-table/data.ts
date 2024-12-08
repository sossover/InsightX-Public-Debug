import { Campaign } from "./types";

export const defaultCampaigns: Campaign[] = [
  {
    name: "Search - Brand Terms",
    spend: 2845.65,
    impressions: 125890,
    clicks: 8965,
    ctr: "7.12%",
    conversions: 425,
    cpa: 6.70,
  },
  {
    name: "Performance Max - Competitor KW",
    spend: 4614.52,
    impressions: 780417,
    clicks: 15769,
    ctr: "2.02%",
    conversions: 250,
    cpa: 18.44,
  },
  {
    name: "Display - Remarketing",
    spend: 1578.92,
    impressions: 458962,
    clicks: 3256,
    ctr: "0.71%",
    conversions: 85,
    cpa: 18.58,
  },
  {
    name: "Performance Max - In-Market",
    spend: 3962.88,
    impressions: 70570,
    clicks: 771,
    ctr: "1.09%",
    conversions: 3,
    cpa: 1062.01,
  },
];

export const campaignTypes = [
  "Search - Brand Terms",
  "Search - Non-Brand",
  "Search - Dynamic Search Ads",
  "Performance Max - General",
  "Performance Max - Retail",
  "Display - Remarketing",
  "Display - Custom Intent",
  "Display - Similar Audiences",
  "Video - Skippable In-Stream",
  "Video - Discovery",
  "Shopping - Standard",
  "Shopping - Smart"
];

export const generateRandomCampaign = (usedNames: Set<string>): Campaign => {
  const spend = Math.random() * 5000 + 500; // More realistic spend range
  const impressions = Math.floor(Math.random() * 1000000 + 10000);
  const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01)); // CTR between 1-6%
  const conversions = Math.floor(clicks * (Math.random() * 0.05 + 0.01)); // CVR between 1-6%
  const ctr = ((clicks / impressions) * 100).toFixed(2) + "%";
  const cpa = spend / (conversions || 1);

  let name;
  do {
    name = campaignTypes[Math.floor(Math.random() * campaignTypes.length)];
  } while (usedNames.has(name));
  usedNames.add(name);

  return {
    name,
    spend,
    impressions,
    clicks,
    ctr,
    conversions,
    cpa,
  };
};

export const generateSampleData = (): Campaign[] => {
  const usedNames = new Set<string>();
  return Array(4).fill(null).map(() => generateRandomCampaign(usedNames));
};