import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getArticleById, updateArticleById } from 'apiSdk/articles';
import { Error } from 'components/error';
import { articleValidationSchema } from 'validationSchema/articles';
import { ArticleInterface } from 'interfaces/article';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { VideoInterface } from 'interfaces/video';
import { UserInterface } from 'interfaces/user';
import { getVideos } from 'apiSdk/videos';
import { getUsers } from 'apiSdk/users';

function ArticleEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ArticleInterface>(
    () => (id ? `/articles/${id}` : null),
    () => getArticleById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ArticleInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateArticleById(id, values);
      mutate(updated);
      resetForm();
      router.push('/articles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ArticleInterface>({
    initialValues: data,
    validationSchema: articleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Article
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
              {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
            </FormControl>
            <FormControl id="content" mb="4" isInvalid={!!formik.errors?.content}>
              <FormLabel>Content</FormLabel>
              <Input type="text" name="content" value={formik.values?.content} onChange={formik.handleChange} />
              {formik.errors.content && <FormErrorMessage>{formik.errors?.content}</FormErrorMessage>}
            </FormControl>
            <FormControl
              id="seo_optimized"
              display="flex"
              alignItems="center"
              mb="4"
              isInvalid={!!formik.errors?.seo_optimized}
            >
              <FormLabel htmlFor="switch-seo_optimized">Seo Optimized</FormLabel>
              <Switch
                id="switch-seo_optimized"
                name="seo_optimized"
                onChange={formik.handleChange}
                value={formik.values?.seo_optimized ? 1 : 0}
              />
              {formik.errors?.seo_optimized && <FormErrorMessage>{formik.errors?.seo_optimized}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<VideoInterface>
              formik={formik}
              name={'video_id'}
              label={'Select Video'}
              placeholder={'Select Video'}
              fetcher={getVideos}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.youtube_url}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'article',
  operation: AccessOperationEnum.UPDATE,
})(ArticleEditPage);
