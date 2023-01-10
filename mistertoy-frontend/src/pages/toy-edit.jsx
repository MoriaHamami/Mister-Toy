// const { useState, useEffect } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/toy.action.js"
import React from 'react'
import Select from 'react-select'

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
        navigate('/toy')
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

    function handleSelectChange( target ) {
        console.log('target:', target)
        const labels = target.map(label => label.value)
        // const {value, name: field} = target
        console.log('labels:', labels)
        // let { d, type, checked } = target
        setToyToEdit((prevToy) => {
            console.log('prevToy:', prevToy)
            return { ...prevToy, labels }
        })
    }

    const options = [
        { value: 'on-wheels', label: 'On Wheels' },
        { value: 'box-game', label: 'Box Game' },
        { value: 'art', label: 'Art' },
        { value: 'baby', label: 'Baby' },
        { value: 'doll', label: 'Doll' },
        { value: 'puzzle', label: 'Puzzle' },
        { value: 'outdoor', label: 'Outdoor' },
        { value: 'battery-powered', label: 'Battery Powered' }
      ]

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

            {/* <select
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
            </select> */}

            <Select 
            isMulti
            name="labels"
            options={options}
            onChange={handleSelectChange}
             />

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