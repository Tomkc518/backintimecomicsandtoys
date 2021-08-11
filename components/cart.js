import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const storage = window.localStorage;
    const cart = JSON.parse(storage.getItem("cart"));
    if(cart){
      cart.lineItems.forEach(lineItem => {
        setQuantity(quantity => [...quantity, {
          price: lineItem.variant.price,
          title: lineItem.title,
          img: lineItem.variant.image.src,
          qty: lineItem.quantity
        }])
      });
    }
  }, [])  

  // useEffect(() => {
  //   function checkCartData() {
  //     const storage = window.localStorage;
  //     const cart = JSON.parse(storage.getItem("cart"));
  //     if(cart){
  //       cart.lineItems.forEach(lineItem => {
  //         setQuantity(quantity => [...quantity, {
  //           price: lineItem.variant.price,
  //           title: lineItem.title,
  //           img: lineItem.variant.image.src,
  //           qty: lineItem.quantity
  //         }])
  //       });
  //     }
  //   }

  //   checkCartData()

  //   window.addEventListener('storage', checkCartData)
  //   console.log('effect state', state)
  //   return () => {
  //     window.removeEventListener('storage', checkCartData)
  //   }
    
  // }, [])

  const viewCart = () => {
    if (typeof window !== "undefined"){
      const storage = window.localStorage;
      const cart = JSON.parse(storage.getItem("cart"));
      // price - lineitems[i].variant.price
      // title - lineitems[i].title
      // img - lineitems[i].variant.image[i].src
      // qty - lineitems[i].quanity
      // price - subtotalPrice
      console.log('veiw cart state', quantity)
      if (cart !== null) {
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
              {cart.lineItems.map((lineItem, idx) => {

                return (
                  <div key={lineItem.title}>
                    <div>{`${lineItem.title}`}</div>
                    <div>
                      <img src={`${lineItem.variant.image.src}`} height='100px' width='100px'></img>
                    </div>
                    <div>
                      <label>Quantity: </label>
                      <input id={`${lineItem.id}`} name={`${lineItem.id}`} type="number" value={quantity[lineItem.id]} data-idx={idx} />
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
