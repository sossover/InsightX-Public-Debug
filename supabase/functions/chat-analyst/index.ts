import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { message, messages, context } = await req.json();

    // Create system message with context
    let systemMessage = `You are an AI marketing analyst assistant. Your role is to help analyze marketing data and provide insights.`;
    
    if (context) {
      systemMessage += `\nHere is the current marketing data context:\n`;
      if (context.campaignData) {
        systemMessage += `Campaign Data: ${JSON.stringify(context.campaignData)}\n`;
      }
      if (context.deviceData) {
        systemMessage += `Device Data: ${JSON.stringify(context.deviceData)}\n`;
      }
      if (context.countryData) {
        systemMessage += `Country Data: ${JSON.stringify(context.countryData)}\n`;
      }
    }

    console.log('Making request to OpenAI with message:', message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemMessage },
          ...messages,
          { role: 'user', content: message }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI Response:', data);

    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-analyst function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});