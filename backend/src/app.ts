import { Context, APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { OpenAIApi, Configuration } from 'openai';

const STANDARD_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Content-Type,X-Api-Key"
};

const generateCompletion = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const queryStringParameters = event.queryStringParameters;
    const prompt = queryStringParameters?.prompt;
    const temperatureStr = queryStringParameters?.temperature;
    const stop = event.multiValueQueryStringParameters?.stop;
    const maxTokens = queryStringParameters?.max_tokens ? parseInt(queryStringParameters.max_tokens, 10) : 64;
    
    const temperature = temperatureStr ? parseFloat(temperatureStr) : 0.5;
    
    if (prompt === undefined) {
        return {
            statusCode: 400,
            headers: {
                ...STANDARD_HEADERS,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: 'prompt is required' })
        };
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
      });
      const openai = new OpenAIApi(configuration);
      
      try { 
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            temperature: temperature,
            max_tokens: maxTokens,
            stop: stop
        });
        return {
            statusCode: 200,
            headers: {
                ...STANDARD_HEADERS,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completion.data)
          };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            headers: {
                ...STANDARD_HEADERS,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: 'Internal Server Error' })
        };

    }
}

export { generateCompletion };
