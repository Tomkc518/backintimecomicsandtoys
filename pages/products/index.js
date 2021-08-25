import { client } from "../../utils/shopify";
import Layout from '../../components/layout'
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
import Products from "../../components/products";
import Grid from '@material-ui/core/Grid';
import TagFilter from "../../components/tagFilter";
import Client from 'shopify-buy/index.unoptimized.umd';
import { useState, useEffect } from 'react';
import SearchFilter from "../../components/searchFilter";

const clientExtended = Client.buildClient({
  domain: 'back-in-time-comics-toys.myshopify.com',
  storefrontAccessToken: '2ef3445070a263a260c0f82cebbff07a'
});

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

const products = (props) => {
  //const classes = useStyles();
  const [productsState, setProductsState] = useState(props.products);

  const handleTagFilters = async (filters) => {
    if(filters.length > 0){
      // const results = props.tags.filter(edge => edge.node.tags.some(tag => filters.indexOf(tag) >= 0));
      // let resultIds = [];
      // results.forEach(result => {
      //   resultIds.push(result.node.id)
      // });
      // const currentProductsState = props.products;
      // const filteredProducts = currentProductsState.filter(product => resultIds.some(id => product.id === id));

      const filterQuery = filters.join(" AND ");
      const filteredProducts = await client.product.fetchQuery({query: filterQuery});

      //console.log('filteredProducts', JSON.parse(JSON.stringify(filteredProducts)))
      
      setProductsState(filteredProducts);
    } else {
      setProductsState(props.products)
    }
  }

  const handleSearchFilter = async (search) => {
    console.log("search criteria", search);
    const searchedProducts = await client.product.fetchQuery({query: search})
    setProductsState(searchedProducts);
  }

  return (
  <Layout menu={props.menu}>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={2}>
        <SearchFilter handleSearchFilter={search => handleSearchFilter(search)}/>
        <TagFilter tags={props.tags} handleTagFilters={filters => handleTagFilters(filters)}/>
      </Grid>
      <Grid item xs={6}>
        <Products products={productsState}/>
      </Grid>
    </Grid>
  </Layout>
  )
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();

  // const productsQuery = clientExtended.graphQLClient.query((root) => {
  //   root.addConnection('products', {args: {first: 10}}, (product) => {
  //     product.add('title');
  //     product.add('tags');// Add fields to be returned
  //     product.add('totalInventory');
  //   });
  // });
  
  // // Call the send method with the custom products query
  // const productData = await clientExtended.graphQLClient.send(productsQuery).then(({model, data}) => {
  //   // Do something with the products
  //   //const result = data.products.edges.filter(edge => edge.tag === 'Bag');
  //   //const result = data.products.edges.filter(edge => edge.node.tags.some(tag => tag === 'Pokemon'));
  //   //const tagsSearch = ['Pokemon'];
  //   //const result = data.products.edges.filter(edge => tagsSearch.includes(edge.node.tags));
  //   //const result = data.products.edges.filter(edge => edge.node.tags.some(tag => tagsSearch.indexOf(tag) >= 0));
  //   //console.log("result", JSON.stringify(result));
  //   //productData = JSON.stringify(data);
  //   return JSON.parse(JSON.stringify(data.products.edges));
  // });

  const tagQuery = clientExtended.graphQLClient.query((root) => {
    root.addConnection('productTags', {args: {first: 100}}, (tag) => {
    });
  });

  const tagData = await clientExtended.graphQLClient.send(tagQuery).then(({model, data}) => {
    return model.productTags;
  });

  //console.log('tag Data', JSON.parse(JSON.stringify(tagData)));

  return { props: { products: JSON.parse(JSON.stringify(products)), tags: JSON.parse(JSON.stringify(tagData))} }
}

export default products
