// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        console.log('filterByToEdit:', filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target

        setFilterByToEdit((prevFilter) => {
            if (type === 'checkbox') return { ...prevFilter, [field]: checked }
            return { ...prevFilter, [field]: value }
        })
    }

    // function onSubmitFilter(ev) {
    //     // update father cmp that filters change on submit
    //     ev.preventDefault()
    // onSetFilter(filterByToEdit)
    // }


    return <section className="toy-filter full main-layout">
        <h2>Toys Filter</h2>
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
                ref={elInputRef}
            />

            <select
                name="label"
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
                checked={filterByToEdit.inStock}
                id="inStock"
                name="inStock"
                onChange={handleChange}
            />

            <button hidden>Filter</button>
        </form>

    </section>
}