import { Client } from "../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import resolver from "../sm-resolver.js";
import Layout from "../components/layout";

const Home = (props) => {
  return (
    <Layout menu={props.menu}>
      <SliceZone {...props} resolver={resolver} />;
    </Layout>
  );
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  apiParams: {
    uid: 'home'
  },
  type: 'home',
  queryType: 'single'
});

export default Home;
