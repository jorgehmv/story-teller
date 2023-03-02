import { Configuration, OpenAIApi } from "openai";
import Cache from "file-system-cache";

const cache = Cache();
export const getTextCompletion = async (
  prompt: string,
  notCachedCallback: () => Promise<void>
): Promise<string | undefined> => {
  const cachedStory = await cache.get(prompt);
  if (cachedStory) {
    return cachedStory as string;
  }

  await notCachedCallback();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

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

  const story = response.data.choices[0]?.text;
  await cache.set(prompt, story);

  return story;
};
