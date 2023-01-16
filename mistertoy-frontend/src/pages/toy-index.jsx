// const { useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// const { Link } = ReactRouterDOM

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToySort } from '../cmps/toy-sort.jsx'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { ADD_TO_CART, SET_FILTER, SET_SORT } from '../store/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userReducer } from '../store/user.reducer.js'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const shoppingCart = useSelector((storeState) => storeState.toyModule.shoppingCart)
    const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const user = useSelector((storeState) => storeState.userModule.user)
    // const [toys, setToys] = useState([])
    // const [cart, setCart] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    async function onLoadToys(filterBy, sortBy) {
        // console.log('filterBy:', filterBy)
        try {
            loadToys(filterBy, sortBy)
        } catch {
            showErrorMsg('Cannot load toys')
        }
        // loadToys(filterBy, sortBy)
        //     .then(() => {
        //         // showSuccessMsg('Toys loaded')
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot load toys')
        //     })
    }

    async function onRemoveToy(toyId) {

        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch {
            showErrorMsg('Cannot remove toy')
        }
        // removeToy(toyId)
        //     .then(() => {
        //         showSuccessMsg('Toy removed')
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot remove toy')
        //     })
    }

    async function onAddToy() {
        const toyToSave = toyService.getRandomToy()

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)

        } catch {
            showErrorMsg('Cannot add toy')

        }
        // saveToy(toyToSave)
        //     .then((savedToy) => {
        //         showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot add toy')
        //     })
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch {
            showErrorMsg('Cannot update toy')
        }

        // saveToy(toyToSave)
        //     .then((savedToy) => {
        //         showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot update toy')
        //     })
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.vendor} to Cart`)
        dispatch({ type: ADD_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    function setFilter(filterBy) {
        // console.log('setFilter', filterBy)
        // onLoadToys(filterBy)
        // setFilter(filterBy)
        dispatch({ type: SET_FILTER, filterBy })
    }

    function setSort(sortBy) {
        // console.log('setFilter', sortBy)
        // onLoadToys('', sortBy)
        // setSort(sortBy)
        dispatch({ type: SET_SORT, sortBy })
    }

    return <section className=" index main-layout full">

        <ToyFilter onSetFilter={setFilter} />

        <ToySort onSetSort={setSort} />

        <section className="add-btn full main-layout">
            <h2>Add Toy</h2>
            {user && user.isAdmin && <Link to={`/toy/edit`} className="button">Add Toy</Link>}
            <button onClick={onAddToy} >Add random Toy ⛐</button>
        </section>

        {isLoading && <p>Loading...</p>}
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            addToCart={addToCart}
            user={user}
        />
        <hr />
        {/* <pre>{JSON.stringify(shoppingCart, null, 2)}</pre> */}

    </section>


}