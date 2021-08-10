import { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { client } from "../utils/shopify";

const Cart = () => {

  const [state, setState] = useState(false);
  const [quantity, setQuantity] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const viewCart = () => {
    if (typeof window !== "undefined"){
      const storage = window.localStorage;
      const cart = JSON.parse(storage.getItem("cart"));
      // price - lineitems[i].variant.price
      // title - lineitems[i].title
      // img - lineitems[i].variant.image[i].src
      // qty - lineitems[i].quanity
      // price - subtotalPrice
      const numberOfItems = cart.lineItems.reduce(function (accumulator, item){
        return accumulator + item.quantity;
      }, 0)

      const updateCartQuantities = async event => {
        event.preventDefault()

        console.log('form event', event.target)
        console.log('state', {quantity})
      }

      return (
        <form onSubmit={updateCartQuantities}>
          <div>
            {cart.lineItems.map(lineItem => {
              return (
                <div key={lineItem.title}>
                  <div>{`${lineItem.title}`}</div>
                  <div>
                    <img src={`${lineItem.variant.image.src}`} height='100px' width='100px'></img>
                  </div>
                  <div>
                    Quantity: <input id={`${lineItem.id}`} name={`${lineItem.title}`} type="number" value={quantity[lineItem.id]} />
                  </div>
                  <div>
                  {`Price: ${lineItem.variant.price}`}
                  </div>
                </div>
              )
            })}
          </div>
          <br></br>
          <div>
            {`Cart SubTotal Price: ${cart.subtotalPrice}`}
          </div>
          <button type="submit">Update Quantities</button>
        </form>
      )
    }
  }

  return (
    <>
    <button onClick={toggleDrawer(true)}>Cart</button>
    <Drawer anchor='right' open={state} onClose={toggleDrawer(false)}>
      {viewCart()}
    </Drawer>
    </>
  )
}

export default Cart
