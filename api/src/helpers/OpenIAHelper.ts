import { OpenAI } from 'openai';

import { openAIModels } from '@enums/enums';
import { OpenIAConnectionError } from '@helpers/ExceptionsHelper';
import { openAICofig } from '@helpers/ProjectSetup';

export class OpenIAHelper {
  static instance: OpenIAHelper;
  private readonly openAI = new OpenAI(openAICofig);

  constructor() {
    if (!OpenIAHelper.instance) {
      OpenIAHelper.instance = this;
    }

    return OpenIAHelper.instance;
  }

  async createConnection(): Promise<OpenAI> {
    try {
      return this.openAI;
    } catch (error) {
      throw new OpenIAConnectionError(
        'OpenAI connection error',
        error as Error
      );
    }
  }
}

export const responseOpenIA = async (prompt: string) => {
  const openai = await new OpenIAHelper().createConnection();

  const response = await openai.completions.create({
    model: openAIModels.GPT_3_5_TURBO_0914,
    prompt: prompt,
    temperature: 1,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0];
};
