import { Configuration, OpenAIApi } from "openai";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 24 * 60 * 60 });
export const getTextCompletion = async (
  prompt: string
): Promise<string | undefined> => {
  const cachedStory = cache.get(prompt);
  if (cachedStory) {
    return cachedStory as string;
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  console.log("prompt", prompt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 1588,
    top_p: 1,
    best_of: 3,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });

  console.log("$$choices", response.data.choices);
  console.log("%%first choice", response.data.choices[0]);

  const story = response.data.choices[0]?.text;
  cache.set(prompt, story);

  return story;
};
