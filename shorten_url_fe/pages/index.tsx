import type { NextPage } from "next";
import { Button, Form, Input, Layout, notification, Tooltip } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { isWebUri } from "valid-url";
import { CopyOutlined } from "@ant-design/icons";
import { isString } from "lodash";
import Head from "next/head";

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 0 50px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  padding: 30px;
  background: #073763;
  border-radius: 8px;

  .ant-row.ant-form-item {
    min-width: 600px;

    :last-of-type {
      margin-bottom: 0;
    }
  }

  .ant-form-item-control-input-content,
  .ant-input-group {
    display: flex;
  }
`;

interface EncodeValues {
  url: string;
}

const Home: NextPage = () => {
  const [shortenUrl, setShortenUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const formik = useFormik<Partial<EncodeValues>>({
    initialValues: {},
    onSubmit: async (values: Partial<EncodeValues>, formikHelpers) => {
      const { resetForm } = formikHelpers;
      setLoading(true);
      try {
        const {
          data: { token },
        } = await axios.post<{ token: string }>("/encode", values);

        const shortenUrl = `${window.location.origin}/${token}`;
        setShortenUrl(shortenUrl);
        resetForm();
      } catch (e: any) {
        const responseData = e.response?.data;
        notification.error({
          message: isString(responseData) ? responseData : e.message,
        });
      } finally {
        setLoading(false);
      }
    },
    validationSchema: yup.object({
      url: yup
        .string()
        .required("Required")
        .test("is-url", "Invalid URL", (value: string | undefined): boolean => {
          const result = isWebUri(value || "");

          return !!result;
        }),
    }),
  });

  const { submitForm, setFieldValue, values, errors } = formik;
  const { url } = values;

  const saveToClipboard = (text: string) => () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Layout>
      <Head>
        <title>Shorten URL</title>
        <meta name="description" content="Shorten URL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContent>
        <StyledForm onFinish={submitForm}>
          <Form.Item
            required
            validateStatus={errors.url && "error"}
            help={errors.url}
          >
            <Input
              placeholder="Shorten Your Link"
              value={url}
              onChange={(e) => setFieldValue("url", e.target.value)}
            />
            <Button type="primary" onClick={submitForm} loading={loading}>
              Shorten
            </Button>
          </Form.Item>
          {shortenUrl && (
            <Form.Item>
              <Input.Group compact>
                <Input disabled value={shortenUrl} />
                <Tooltip title="Copy to Clipboard">
                  <Button
                    icon={<CopyOutlined />}
                    onClick={saveToClipboard(shortenUrl)}
                  />
                </Tooltip>
              </Input.Group>
            </Form.Item>
          )}
        </StyledForm>
      </StyledContent>
    </Layout>
  );
};

export default Home;
