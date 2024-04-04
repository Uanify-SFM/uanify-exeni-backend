import Joi from 'joi';

export const imageDataAnalysisValidation = Joi.object({
  prompt: Joi.string().required(),
  image: Joi.string().required(),
});

export const textAnalysisValidation = Joi.object({
  medicalStudyType: Joi.string().required(),
  prompt: Joi.string().required(),
});
