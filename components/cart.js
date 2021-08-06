import Router from 'next/router'


const Cart = () => {
  const viewCart = () => {
    const storage = window.localStorage;
    const cart = JSON.parse(storage.getItem("cart"));
    const numberOfItems = cart.lineItems.reduce(function (accumulator, item){
      return accumulator + item.quantity;
    }, 0)
  
    return (
      console.log('numberofitems', numberOfItems)
    )
  }
  
  return (
    <button onClick={viewCart}>Cart</button>
  )
}

export default Cart