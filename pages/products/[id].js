import Layout from '../../components/layout'
import { client } from "../../utils/shopify";
import Link from 'next/link'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Client from 'shopify-buy/index.unoptimized.umd';

const clientExtended = Client.buildClient({
  domain: 'back-in-time-comics-toys.myshopify.com',
  storefrontAccessToken: '2ef3445070a263a260c0f82cebbff07a'
});

const Product = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };

  const addToCart = async () => {
    const storage = window.localStorage;
    let checkoutId = storage.getItem('checkoutId');
    if (!checkoutId){
      const checkout = await client.checkout.create();
      checkoutId = checkout.id;
      storage.setItem('checkoutId', checkoutId);
    }
    const cart = await client.checkout.addLineItems(checkoutId, [
      {
        variantId: props.product.variants[0].id,
        quantity: 1,
      }
    ]);
    storage.setItem('cart', JSON.stringify(cart));
    handleClick();
  };
  
  return (
    <Layout menu={props.menu}>
        <div>
            <div key={`${props.product.id}`}>
                <p >{props.product.title}</p>
                <img src={`${props.product.images[0].src}`} className="productImage"></img>
                <p>{props.product.description}</p>
                <button onClick={addToCart}>Add to Cart</button>
                <div>
                    <Link href="/products">Back</Link>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Item Sucessfuly Added to Your Cart!
            </Alert>
          </Snackbar>
        </div>
        <style jsx>{`
            .productImage {
                max-height: 350px;
                max-width: 350px;
            }
        `}</style>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    const product = await client.product.fetch(id);

    const productsQuery = clientExtended.graphQLClient.query((root) => {
      root.addConnection('products', {args: {first: 10}}, (product) => {
        product.add('title');
        product.add('tags');// Add fields to be returned
        product.add('totalInventory');
      });
    });
    
    // Call the send method with the custom products query
    clientExtended.graphQLClient.send(productsQuery).then(({model, data}) => {
      // Do something with the products
      //const result = data.products.edges.filter(edge => edge.tag === 'Bag');
      //const result = data.products.edges.filter(edge => edge.node.tags.some(tag => tag === 'Pokemon'));
      const tagsSearch = ['Pokemon'];
      //const result = data.products.edges.filter(edge => tagsSearch.includes(edge.node.tags));
      const result = data.products.edges.filter(edge => edge.node.tags.some(tag => tagsSearch.indexOf(tag) >= 0));
      console.log("result", JSON.stringify(result));
      //console.log("data", JSON.stringify(data));
    });

    return { props: { product: JSON.parse(JSON.stringify(product)) } }
  }

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Product
