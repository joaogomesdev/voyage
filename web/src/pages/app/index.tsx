import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import React from "react";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <h1>Hello World</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res));

    return {
      props: {},
    };
  },
});
