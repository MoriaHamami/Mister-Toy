// const { useState, useEffect } = React
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { userService } from '../services/user.service.js'
import { REMOVE_FROM_CART } from '../store/toy.reducer.js'
// import { checkout } from '../store/user.action.js'

export function ShoppingCart({ cart, dispatch }) {

  // const user = userService.getLoggedinUser()

  function removeFromCart(toyId) {
    console.log(`Todo: remove: ${toyId} from cart`)
    // TODO: use dispatch
    dispatch({ type: REMOVE_FROM_CART, toyId })
  }

  function getCartTotal() {
    return cart.reduce((acc, toy) => acc + toy.price, 0)
  }

  // function onCheckout() {
  //   const amount = getCartTotal()
  //   checkout(-amount)
  //     .then(newScore => {
  //       showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
  //     })
  // }

  const total = getCartTotal()
  return <section className="cart" >
    <h5>Your Cart</h5>

    <ul>
      {
        cart.map((toy, idx) => <li key={idx}>
          <button onClick={() => { removeFromCart(toy._id) }}>x</button>
          {toy.vendor} | ${toy.price}
        </li>)
      }
    </ul>

    <p>Total: ${total.toLocaleString()} </p>
    {/* <button disabled={!user || !total} onClick={onCheckout}>Checkout</button> */}
  </section>

}
