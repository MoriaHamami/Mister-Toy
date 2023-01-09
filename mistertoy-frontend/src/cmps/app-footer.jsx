// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './user-msg.jsx'
import { ShoppingCart } from './shopping-cart.jsx'
import { TOGGLE_CART_SHOWN } from '../store/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {

    const count = useSelector((storeState) => storeState.appModule.count)
    const isCartShown = useSelector((storeState) => storeState.toyModule.isCartShown)
    const toysCount = useSelector((storeState) => storeState.toyModule.toys.length)
    const cart = useSelector((storeState) => storeState.toyModule.shoppingCart)
    console.log('cart', cart);
    const dispatch = useDispatch()

    // TODO: move to storeState


    function onToggleCart(ev) {
        ev.preventDefault()
        // setIsCartShown(!isCartShown)
        dispatch({ type: TOGGLE_CART_SHOWN })
    }

    return (
        <footer>
            <h5>
                Currently {toysCount} toys in the shop
            </h5>
            <p>
                Coffeerights to all - Count: {count}
            </p>
            {
                <h5>
                    <span>{cart.length}</span> Products in your Cart
                    <a href="#" onClick={onToggleCart}>
                        ({(isCartShown) ? 'hide' : 'show'})
                    </a>
                </h5>
            }
            {isCartShown && <ShoppingCart cart={cart} dispatch={dispatch} />}
            <UserMsg />
        </footer>
    )
}
