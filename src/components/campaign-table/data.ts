export const defaultCampaigns = [
  {
    name: "Performance Max - Dynamic",
    spend: 3129.19,
    impressions: 565017,
    clicks: 23176,
    ctr: "4.09%",
    conversions: 330,
    cpa: 3.59,
  },
  {
    name: "Shopping - Bestsellers",
    spend: 1043.59,
    impressions: 751143,
    clicks: 16637,
    ctr: "2.21%",
    conversions: 525,
    cpa: 1.99,
  },
  {
    name: "Display - Custom Intent",
    spend: 3189.07,
    impressions: 765800,
    clicks: 17543,
    ctr: "2.29%",
    conversions: 391,
    cpa: 8.16,
  },
  {
    name: "Smart Shopping - Electronics",
    spend: 17137.91,
    impressions: 137190,
    clicks: 25410,
    ctr: "18.52%",
    conversions: 489,
    cpa: 14.60,
  },
];

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateSampleData = () => {
  return [
    {
      name: "Performance Max - Dynamic",
      spend: generateRandomNumber(1000, 5000),
      impressions: generateRandomNumber(100000, 800000),
      clicks: generateRandomNumber(10000, 30000),
      get ctr() {
        return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
      },
      conversions: generateRandomNumber(200, 600),
      get cpa() {
        return Number((this.spend / this.conversions).toFixed(2));
      },
    },
    {
      name: "Shopping - Bestsellers",
      spend: generateRandomNumber(800, 3000),
      impressions: generateRandomNumber(200000, 900000),
      clicks: generateRandomNumber(8000, 25000),
      get ctr() {
        return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
      },
      conversions: generateRandomNumber(300, 700),
      get cpa() {
        return Number((this.spend / this.conversions).toFixed(2));
      },
    },
    {
      name: "Display - Custom Intent",
      spend: generateRandomNumber(2000, 6000),
      impressions: generateRandomNumber(300000, 1000000),
      clicks: generateRandomNumber(12000, 35000),
      get ctr() {
        return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
      },
      conversions: generateRandomNumber(250, 550),
      get cpa() {
        return Number((this.spend / this.conversions).toFixed(2));
      },
    },
    {
      name: "Smart Shopping - Electronics",
      spend: generateRandomNumber(10000, 20000),
      impressions: generateRandomNumber(100000, 500000),
      clicks: generateRandomNumber(15000, 40000),
      get ctr() {
        return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
      },
      conversions: generateRandomNumber(400, 800),
      get cpa() {
        return Number((this.spend / this.conversions).toFixed(2));
      },
    },
  ];
};