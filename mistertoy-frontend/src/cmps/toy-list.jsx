import { NavLink } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
    return <ul className="toy-list full">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <div>
                    <NavLink to={`/toy/${toy._id}`} className="button">Details</NavLink>
                    <NavLink to={`/toy/edit/${toy._id}`} className="button">Edit</NavLink>
                    <button onClick={() => { onRemoveToy(toy._id) }}>❌</button>
                    {/* <button onClick={() => { onEditToy(toy) }}>Change price</button> */}
                </div>


                {/* <button className="buy" onClick={() => { addToCart(toy) }}>
                    Add to Cart
                </button> */}
            </li>)}
    </ul>
}