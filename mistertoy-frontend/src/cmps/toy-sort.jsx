// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToySort({ onSetSort }) {

    const [currSort, setCurrSort] = useState(toyService.getDefaultSort())

    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    useEffect(() => {
        // update father cmp that sorts change very type
        onSetSort(currSort)
    }, [currSort])

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = (type === 'number') ? +value : value
    //     setSortByToEdit((prevSort) => ({ ...prevSort, [field]: value }))
    // }

    // function onSubmitSort(ev) {
    //     // update father cmp that sorts change on submit
    //     ev.preventDefault()
    //     onSetSort(sortByToEdit)
    // }


    // return <section className="toy-sort full main-layout">
    //     <h2>Toys Sort</h2>
    //     <form onSubmit={onSubmitSort}>
    //         <label htmlFor="name">Name:</label>
    //         <input type="text"
    //             id="name"
    //             name="txt"
    //             placeholder="By name"
    //             value={sortByToEdit.txt}
    //             onChange={handleChange}
    //             ref={elInputRef}
    //         />

    //         <label htmlFor="maxPrice">Max price:</label>
    //         <input type="number"
    //             id="maxPrice"
    //             name="maxPrice"
    //             placeholder="By max price"
    //             value={sortByToEdit.maxPrice}
    //             onChange={handleChange}
    //         />

    //         <button hidden>Sort</button>
    //     </form>

    // const [selectedOpt, setSelectedOpt] = useState('all')

    function setSort(newSort) {
        const change = newSort === currSort.value ? -currSort.change : 1
        const sortBy = {
            value: newSort,
            change
        }
        // onSetSort(sortBy)
        setCurrSort(sortBy)
    }

    return <section className="mail-sort">
        <button onClick={() => {setSort('name')}}>
            {/* <img className="sort-icon icon" src={`./assets/img/icons/icons-mail/${dateIcon}-icon.png`} /> */}
            Name
        </button>
        <button onClick={() => {setSort('price')}}>
            {/* <img className="sort-icon icon" src={`./assets/img/icons/icons-mail/${subjectIcon}-icon.png`} /> */}
            Price
        </button>
        <button onClick={() => {setSort('createdAt')}}>
            {/* <img className="sort-icon icon" src={`./assets/img/icons/icons-mail/${subjectIcon}-icon.png`} /> */}
            Created
        </button>

        {/* <div className="dropdown">
            <button className="dropbtn" style={{ textTransform: 'capitalize' }}>
                <img className="sort-icon icon" src="./assets/img/icons/icons-mail/down-icon.png" />
                {selectedOpt}
            </button>
            <div className="dropdown-content">
                {selectedOpt !== 'all' && <a className="all-btn" onClick={() => onOptSelected('all')} style={{ textTransform: 'capitalize' }}>All</a>}
                {selectedOpt !== 'read' && <a className="read-btn" onClick={() => onOptSelected('read')} style={{ textTransform: 'capitalize' }}>Read</a>}
                {selectedOpt !== 'unread' && <a className="unread-btn" onClick={() => onOptSelected('unread')} style={{ textTransform: 'capitalize' }}>Unread</a>}
            </div>
        </div> */}

    </section>
}