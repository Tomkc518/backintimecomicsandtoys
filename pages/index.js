import { Client } from "../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import resolver from "../sm-resolver.js";
import Layout from "../components/layout";
import TopProducts from "../components/top-products";
import { client } from "../utils/shopify"
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Home = (props) => {
  const classes = useStyles();
  return (
    <Layout menu={props.menu}>
      {/* <SliceZone {...props} resolver={resolver} />; */}
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
      <img src="/images/logo_black.png" height="400px" width="600px" />
      <h2>Welcome to Back in Time Comics and Toys</h2>
      <p>With over 30 years of experience in the collecting field and 20 years of buying, selling, &amp; trading experience. </p>
      <p>Sunday 11-5, M-F 11-6, Saturday 11-7</p>
      <p>1170 W Kansas St Suite S, Liberty, MO 64068</p>
      <p>(816) 429-7004</p>
      <h1>Top Products</h1>
      </Grid>
      <TopProducts topProducts={props.topProducts}/>
    </Layout>
  );
};

// Fetch content from prismic
// export const getStaticProps = useGetStaticProps({
//   client: Client(),
//   apiParams: {
//     uid: 'home'
//   },
//   type: 'home',
//   queryType: 'single'
// });

export async function getServerSideProps() {
  const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI3MTU2Nzc0OTMyOA=="
  const topProductCollection = await client.collection.fetchWithProducts(collectionId);

  return { props: { topProducts: JSON.parse(JSON.stringify(topProductCollection.products))} }
}

export default Home;
