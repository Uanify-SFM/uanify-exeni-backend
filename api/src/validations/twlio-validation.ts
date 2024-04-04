import Joi from 'joi';

export const sendSimpleSMSWhatsAppValidation = Joi.object({
  to: Joi.string().required(),
  message: Joi.string().required(),
});

export const sendMediaSMSWhatsAppValidation = Joi.object({
  to: Joi.string().required(),
  message: Joi.string().allow(null),
  media: Joi.array().items(Joi.string()).required(),
});
