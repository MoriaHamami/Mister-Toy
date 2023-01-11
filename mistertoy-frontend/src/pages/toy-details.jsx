// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy : {toy.name}</h1>
        <p>⛐</p>
        <p>Created: {utilService.getFormattedDate(toy.createdAt)}</p>
        <p>Price: ${toy.price.toLocaleString()}</p>
        <p>Messages: {toy.msg}</p>
        {toy.instock ? <p style={{ color: 'green' }}>In stock</p> : <p style={{ color: 'red' }}>Not in stock</p>}
        {/* <div className="detail-btns"> */}
            <Link to={`/toy/edit/${toy._id}`} className="button">Edit</Link>
            <Link to="/toy" className="button">Back</Link>
        {/* </div> */}

    </section>
}