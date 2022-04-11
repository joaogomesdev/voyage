import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import React from "react";
import { useMeQuery } from "../../graphql/generated/graphql";
import { ssrGetProducts } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMeQuery();
  return (
    <div className="text-violet-500">
      <h1>Hello World</h1>
      <pre>ok: {JSON.stringify(me, null, 2)}</pre>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return getServerPageGetProducts(null, ctx);
    return { props: {} };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
