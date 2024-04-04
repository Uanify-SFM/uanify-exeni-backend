import { CustomBody } from '@api-interfaces/ApiGatewayInterfaces';
import { ImageDataAnalysisRequest } from '@api-interfaces/openIA/ImageDataAnalysis/ImageDataAnalysisRequest';
import { TextDataAnalysisRequest } from '@api-interfaces/openIA/TextDataAnalysis/TextDataAnalysisRequest';
import { InternalResponse } from '@helpers/InternalResponse';
import { responseOpenIA } from '@helpers/OpenIAHelper';

export const imageDataAnalysis = async (
  event: CustomBody<ImageDataAnalysisRequest>
) => {
  let output: InternalResponse = new InternalResponse();

  try {
    const { image, prompt } = event.body;

    const fullPrompt = `${prompt} Basado en la siguiente imagen: ${image}. Describe un diagnostico de lo que pasa.`;
    const openAIImageAnalysis = await responseOpenIA(fullPrompt);
    const message = openAIImageAnalysis;
    output.payload = message;
  } catch (error) {
    output = InternalResponse.buildErrorResponse(error);
  }
  return output;
};

export const textDataAnalysis = async (
  event: CustomBody<TextDataAnalysisRequest>
) => {
  let output: InternalResponse = new InternalResponse();
  try {
    const { prompt, medicalStudyType } = event.body;
    const fullPrompt = `${prompt} Basado en el estudio de ${medicalStudyType}. Describe un diagnostico de lo que pasa que sea facil de entender para alguien que no sabe medicina en muy poco texto`;
    const openAITextAnalysis = await responseOpenIA(fullPrompt);
    const message = openAITextAnalysis;

    output.payload = message;
  } catch (error) {
    output = InternalResponse.buildErrorResponse(error);
  }
  return output;
};
