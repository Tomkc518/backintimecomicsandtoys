import { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { client } from "../utils/shopify";

const Cart = () => {

  const [state, setState] = useState(false);
  
  const [quantityState, setQuantityState] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  useEffect(() => {
    const storage = window.localStorage;
    const cart = JSON.parse(storage.getItem("cart"));
    if(cart){
      cart.lineItems.forEach(lineItem => {
        setQuantityState(quantityState => [...quantityState, {
          id: lineItem.id,
          price: lineItem.variant.price,
          title: lineItem.title,
          img: lineItem.variant.image.src,
          qty: lineItem.quantity
        }])
      });
    }
  }, [])  

  const cartQuantityOnChange = async event => {
    event.preventDefault()

    const updatedCart = [...quantityState];
    updatedCart[event.target.dataset.idx][event.target.className] = event.target.value;
    setQuantityState(updatedCart);
  }

  const updateCartQuantities = async () => {
    event.preventDefault()

    const storage = window.localStorage;
    let checkoutId = storage.getItem('checkoutId');
    const updatedQuantities = quantityState.map((lineItem) => {
      return {
        id: lineItem.id,
        quantity: parseInt(lineItem.qty) 
      }
    })
    const cart = await client.checkout.updateLineItems(checkoutId, updatedQuantities);
    storage.setItem('cart', JSON.stringify(cart));
  }

  const viewCart = () => {
      if (quantityState.length > 0) {
        const numberOfItems = quantityState.reduce(function (accumulator, item){
          return accumulator + item.quantity;
        }, 0)

        return (
          <form>
            <div>
              {quantityState.map((lineItem, idx) => {
                return (
                  <div key={lineItem.title}>
                    <div>{`${lineItem.title}`}</div>
                    <div>
                      <img src={`${lineItem.img}`} height='100px' width='100px'></img>
                    </div>
                    <div>
                      <label>Quantity: </label>
                      <input id={`${lineItem.id}`} name={`${lineItem.id}`} type="number" value={lineItem.qty} data-idx={idx} onChange={cartQuantityOnChange} className="qty"/>
                    </div>
                    <div>
                    {`SubTotal Price: $${lineItem.price * lineItem.qty} `}
                    </div>
                  </div>
                )
              })}
            </div>
            <br></br>
            <button onClick={updateCartQuantities}>Update Quantities</button>
            <br></br>
            <button type="submit">Checkout</button>
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
