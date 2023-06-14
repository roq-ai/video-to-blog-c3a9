import * as yup from 'yup';

export const articleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  seo_optimized: yup.boolean().required(),
  video_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
