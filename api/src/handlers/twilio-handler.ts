import {
  sendMediaSMSWhatsApp,
  sendSimpleSMSWhatsApp,
} from '@controllers/twilioController';
import { middify } from '@helpers/Middy';
import {
  sendMediaSMSWhatsAppValidation,
  sendSimpleSMSWhatsAppValidation,
} from '@validations/twlio-validation';

export const handlerSendSimpleSMSWhastapp = middify(
  sendSimpleSMSWhatsApp,
  sendSimpleSMSWhatsAppValidation
);

export const handlerSendMediaSMSWhastapp = middify(
  sendMediaSMSWhatsApp,
  sendMediaSMSWhatsAppValidation
);
