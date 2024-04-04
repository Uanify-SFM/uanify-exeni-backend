import { CustomBody } from '@api-interfaces/ApiGatewayInterfaces';
import { MessageMediaRequest } from '@api-interfaces/twilioClient/MessageMedia/MessageMediaRequest';
import { MessageTextRequest } from '@api-interfaces/twilioClient/MessageText/MessageTextRequest';
import { InternalResponse } from '@helpers/InternalResponse';
import { TWILIO_PHONE_NUMBER } from '@helpers/ProjectSetup';
import { twilioClient } from '@helpers/TwilioHelper';

export const sendSimpleSMSWhatsApp = async (
  event: CustomBody<MessageTextRequest>
): Promise<InternalResponse> => {
  const output = new InternalResponse();

  try {
    const { message, to } = event.body;
    const whatsappToNumber = `whatsapp:${to}`;
    const messageSent = await twilioClient.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: whatsappToNumber,
    });

    output.payload = messageSent;
  } catch (error) {
    return InternalResponse.buildErrorResponse(error);
  }
  return output;
};

export const sendMediaSMSWhatsApp = async (
  event: CustomBody<MessageMediaRequest>
): Promise<InternalResponse> => {
  const output = new InternalResponse();

  try {
    const { message, media, to } = event.body;
    const whatsappToNumber = `whatsapp:${to}`;
    const messageSent = await twilioClient.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: whatsappToNumber,
      mediaUrl: [media],
    });

    output.payload = messageSent;
  } catch (error) {
    return InternalResponse.buildErrorResponse(error);
  }
  return output;
};
