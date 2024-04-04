// Importa todo el módulo Twilio como una entidad
import Twilio from 'twilio';

import { ACCOUNT_SID_TWILIO, AUTH_TOKEN_TWILIO } from '@helpers/ProjectSetup';

export const twilioClient = Twilio(ACCOUNT_SID_TWILIO, AUTH_TOKEN_TWILIO);
