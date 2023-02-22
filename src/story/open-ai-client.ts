import { Configuration, OpenAIApi } from "openai";

export const getTextCompletion = async (
  prompt: string
): Promise<string | undefined> => {
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);

  // console.log("prompt", prompt);
  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt,
  //   temperature: 0.7,
  //   max_tokens: 1588,
  //   top_p: 1,
  //   best_of: 3,
  //   frequency_penalty: 0.5,
  //   presence_penalty: 0,
  // });

  // console.log("$$choices", response.data.choices);
  // console.log("%%first choice", response.data.choices[0]);

  // return response.data.choices[0]?.text;

  // for debugging
  return `Érase una vez, en lo alto de una montaña nevada y lúgubre, un pequeño grupo de alegres ratas que vivían tranquilamente. Un día, un joven gato egoísta y embustero llegó a la montaña con la intención de hacerse con el control de los territorios que las ratas habían conquistado con tanto esfuerzo.

Las ratas, atemorizadas por el gato, decidieron pedir ayuda a su más sabia anciana. La vieja rata era muy inteligente y amable y todos la respetaban mucho. Cuando escuchó la historia del gato, decidió reunir a todas las ratas para enfrentar al intruso juntos.

Los animales se reunieron en la cima de la montaña y se dispusieron a enfrentarse al gato. La vieja rata les dijo que el reto no sería fácil, pero que todos debían trabajar juntos para vencer al egoísta rival. Entonces empezaron los preparativos: armaron trampas para estrellarle contra los árboles, le lanzaron piedras para distraerlo y usaron sus cuerpos en bloque para bloquear su camino.

El gato se quedó sorprendido ante estos pequeños animales que osaban desafiarlo. Al ver su valentía se dio cuenta de lo equivocado que había estado al intentar dominarlos sin pedirles permiso primero. Se disculpó por su comportamiento egoísta y les ofreció su amistad como gesto de buena voluntad. Las ratas lo aceptaron y desde entonces han vivido en armonía juntos en lo alto de la montaña nevada y lúgubre.`;
};
