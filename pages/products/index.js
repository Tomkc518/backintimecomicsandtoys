import { client } from "../../utils/shopify";
import Layout from '../../components/layout'
import Button from '@material-ui/core/Button';
import Products from "../../components/products";
import Grid from '@material-ui/core/Grid';
import TagFilter from "../../components/tagFilter";
import Client from 'shopify-buy/index.unoptimized.umd';
import { useState } from 'react';
import SearchFilter from "../../components/searchFilter";

const clientExtended = Client.buildClient({
  domain: 'back-in-time-comics-toys.myshopify.com',
  storefrontAccessToken: '2ef3445070a263a260c0f82cebbff07a'
});

const products = (props) => {
  const [productsState, setProductsState] = useState(props.products);
  console.log('productsState', productsState);
  const handleTagFilters = async (filters) => {
    if(filters.length > 0){

      const filterQuery = filters.join(" AND ");
      const filteredProducts = await client.product.fetchQuery({query: `tag:${filterQuery}`});

      setProductsState(filteredProducts);
    } else {
      setProductsState(props.products)
    }
  }

  const handleSearchFilter = async (search) => {
    const searchedProducts = await client.product.fetchQuery({query: `title:${search}*`})
    setProductsState(searchedProducts);
  }

  const loadNextPage = async () => {
    // const productsQuery = clientExtended.graphQLClient.query((root) => {
    //   root.addConnection('products', {args: {first: 20}}, (product) => {});
    // });
  
    // const productData = await clientExtended.graphQLClient.send(productsQuery).then(({model, data}) => {
    //   return JSON.parse(JSON.stringify(data.products.edges))
    // });

    const nextPageQuery = clientExtended.graphQLClient.query((root) => {
      root.addConnection('products', {args: {first: 20, after: `${productsState.edges[productsState.edges.length -1].cursor}`}}, (product) => {
        product.add('title');
        product.add('availableForSale');
        product.add('description');
        product.addConnection('variants', {args: {first: 10}}, (variant) => {
          variant.add('image', image => {
            image.add("originalSrc")
          });
          variant.add('priceV2', price => {
            price.add('amount')
          });
        })
      })
    })

    const nextPageData = await clientExtended.graphQLClient.send(nextPageQuery).then(({model, data}) => {
      return JSON.parse(JSON.stringify(data.products))
    })

    // const ids = [];
    // nextPageData.forEach(data => {
    //   ids.push(data.id)
    // });
    // const nextProducts = await client.product.fetchMultiple(ids);
    setProductsState(nextPageData);
  }

  return (
  <Layout menu={props.menu}>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={2}>
        <SearchFilter handleSearchFilter={search => handleSearchFilter(search)}/>
        <TagFilter tags={props.tags} handleTagFilters={filters => handleTagFilters(filters)}/>
      </Grid>
      <Grid item xs={9}>
        <Products products={productsState.edges}/>
      </Grid>
    </Grid>
    <Grid container justifyContent="flex-end" spacing={3}>
      <Grid item xs={2}>
        {
          productsState.pageInfo.hasNextPage === true &&
            <Button variant="contained" onClick={loadNextPage}>
              Load Next Page
            </Button>
        }
      </Grid>
      </Grid>
  </Layout>
  )
}

export async function getServerSideProps() {

  const productsQuery = clientExtended.graphQLClient.query((root) => {
    root.addConnection('products', {args: {first: 20}}, (product) => {
      product.add('title');
      product.add('availableForSale');
      product.add('description');
      product.addConnection('variants', {args: {first: 10}}, (variant) => {
        variant.add('image', image => {
          image.add("originalSrc")
        });
        variant.add('priceV2', price => {
          price.add('amount')
        })
      })
    });
  });

  const products = await clientExtended.graphQLClient.send(productsQuery).then(({model, data}) => {
  //console.log("proucts model", JSON.parse(JSON.stringify(model)));
  //console.log("product data", JSON.parse(JSON.stringify(data.products)));
  return JSON.parse(JSON.stringify(data.products))
  });

  const tagQuery = clientExtended.graphQLClient.query((root) => {
    root.addConnection('productTags', {args: {first: 100}}, (tag) => {
    });
  });

  const tagData = await clientExtended.graphQLClient.send(tagQuery).then(({model, data}) => {
    return model.productTags;
  });

  return { props: { products: products, tags: JSON.parse(JSON.stringify(tagData))} }
}

export default products
