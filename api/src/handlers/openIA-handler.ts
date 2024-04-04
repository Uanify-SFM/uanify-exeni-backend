import { imageDataAnalysis } from '@controllers/openIAController';
import { middify } from '@helpers/Middy';
import {
  imageDataAnalysisValidation,
  textAnalysisValidation,
} from '@validations/openIA-validation';

export const handlerImageDataAnalysisOpenIA = middify(
  imageDataAnalysis,
  imageDataAnalysisValidation
);

export const handlerTextDataAnalysisOpenIA = middify(
  imageDataAnalysis,
  textAnalysisValidation
);
