// const { useState, useEffect } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/toy.action.js"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        
        let { value, name: field, type, checked } = target
        value = type === 'number' ? +value : value
        
        // setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        setToyToEdit((prevToy) => {
            if (type === 'checkbox') return { ...prevToy, [field]: checked }
            return { ...prevToy, [field]: value }
        })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
        // toyService.save(toyToEdit)
        //     .then((toy) => {
        //         console.log('toy saved', toy);
        //         showSuccessMsg('Toy saved!')
        //         navigate('/toy')
        //     })
        //     .catch(err => {
        //         console.log('err', err)
        //         showErrorMsg('Cannot save toy')
        //     })
    }

    return <section className="toy-edit">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />

            <select
                name="labels"
                onChange={handleChange}
            >
                <option value="">All</option>
                <option value="on-wheels">On wheels</option>
                <option value="box-game">Box game</option>
                <option value="art">Art</option>
                <option value="baby">Baby</option>
                <option value="doll">Doll</option>
                <option value="puzzle">Puzzle</option>
                <option value="outdoor">Outdoor</option>
                <option value="battery-powered">Battery Powered</option>
            </select>


            <label htmlFor="inStock">Is in Stock</label>
            <input type="checkbox"
                checked={toyToEdit.inStock}
                id="inStock"
                name="inStock"
                onChange={handleChange}
            />

            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}