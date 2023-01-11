// const { NavLink } = ReactRouterDOM

import { NavLink } from "react-router-dom";

export function ToyPreview({ toy }) {
    return <article>
        <h4>{toy.name}</h4>
        <h1>⛐</h1>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        {/* <p>Owner: <span>{toy.owner && toy.owner.fullname}</span></p> */}


    </article>
}