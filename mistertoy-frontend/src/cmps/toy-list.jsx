import { NavLink } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart, user }) {
    return <ul className="toy-list full">
        {toys.map(toy => {
            return <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <div>
                    <NavLink to={`/toy/${toy._id}`} className="button">Details</NavLink>
                    {user && user.isAdmin && <div>
                        <NavLink to={`/toy/edit/${toy._id}`} className="button">Edit</NavLink>
                        <button onClick={() => { onRemoveToy(toy._id) }}>❌</button>
                    </div>}
                    {/* <button onClick={() => { onEditToy(toy) }}>Change price</button> */}
                </div>


                {/* <button className="buy" onClick={() => { addToCart(toy) }}>
                    Add to Cart
                </button> */}
            </li>})}
    </ul>
}