import Layout from '../../components/layout'
import { client } from "../../utils/shopify";
import Link from 'next/link'


const Product = (props) => {
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
    // Fetch data from external API
    const product = await client.product.fetch(id);
    //.then((products) => {
    // Do something with the products
    
  //});
    //const data = await res.json()
  
    // Pass data to the page via props
    return { props: { product: JSON.parse(JSON.stringify(product)) } }
  }

export default Product
