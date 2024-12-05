import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaignData, deviceData, countryData } = await req.json();

    const prompt = `Analyze this marketing campaign data and provide insights:
    
    Campaign Performance:
    ${JSON.stringify(campaignData)}
    
    Device Statistics:
    ${JSON.stringify(deviceData)}
    
    Country Statistics:
    ${JSON.stringify(countryData)}
    
    Please provide:
    1. A brief performance summary
    2. Key observations (3 points)
    3. Actionable recommendations (3 points)
    Format the response as a JSON object with these keys: summary, observations, recommendations`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a marketing analytics expert. Provide concise, actionable insights.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI Response:', data);

    return new Response(JSON.stringify({ 
      insights: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});