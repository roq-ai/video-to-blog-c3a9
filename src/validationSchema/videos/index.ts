import * as yup from 'yup';
import { articleValidationSchema } from 'validationSchema/articles';

export const videoValidationSchema = yup.object().shape({
  youtube_url: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  article: yup.array().of(articleValidationSchema),
});
