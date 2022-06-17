import { GetServerSideProps, NextPage } from "next";
import axios from "axios";

const TokenPage: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    req: { url },
  } = context;
  try {
    const { data: originalUrl } = await axios.post<string>("/decode", {
      token: url,
    });

    return {
      redirect: {
        destination: originalUrl,
        permanent: true,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default TokenPage;
