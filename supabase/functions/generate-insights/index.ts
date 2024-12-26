import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaignData, deviceData, countryData, keywordData } = await req.json();
    console.log('Received request with data:', { 
      campaigns: campaignData?.length,
      devices: deviceData?.length,
      countries: countryData?.length,
      keywords: keywordData?.length
    });

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    // Calculate totals for the system message
    const totals = campaignData.reduce((acc: any, campaign: any) => ({
      spend: acc.spend + campaign.spend,
      impressions: acc.impressions + campaign.impressions,
      clicks: acc.clicks + campaign.clicks,
      conversions: acc.conversions + campaign.conversions,
    }), { spend: 0, impressions: 0, clicks: 0, conversions: 0 });

    // Create a context-aware system message
    let systemMessage = `You are an AI marketing analyst. Analyze the following data:\n`;
    
    if (campaignData?.length > 0) {
      systemMessage += `Campaign Performance Data: ${JSON.stringify(campaignData)}\n`;
    }
    
    if (deviceData?.length > 0) {
      systemMessage += `Device Distribution: ${JSON.stringify(deviceData)}\n`;
    }
    
    if (countryData?.length > 0) {
      systemMessage += `Geographic Performance: ${JSON.stringify(countryData)}\n`;
    }
    
    if (keywordData?.length > 0) {
      systemMessage += `Keyword Performance: ${JSON.stringify(keywordData)}\n`;
    }

    systemMessage += `\nTotals - Spend: $${totals.spend.toFixed(2)}, Impressions: ${totals.impressions}, Clicks: ${totals.clicks}, Conversions: ${totals.conversions}`;

    console.log('Making request to OpenAI with system message length:', systemMessage.length);

    const userMessage = `Based on the provided data, please provide:
1. A brief summary of overall performance
2. 3-4 key observations focusing on the most relevant metrics and patterns
3. 2-3 actionable recommendations for improvement
Format the response as a JSON object with fields: summary (string), observations (array of strings), and recommendations (array of strings).`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('OpenAI Response:', data);

    let insights;
    try {
      insights = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e);
      throw new Error('Invalid response format from AI');
    }

    // Validate the response format
    if (!insights.summary || !Array.isArray(insights.observations) || !Array.isArray(insights.recommendations)) {
      console.error('Invalid response structure:', insights);
      throw new Error('Invalid response structure from AI');
    }

    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-insights function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});