// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"
import { saveToy } from "../store/toy.action.js"
import { userService } from "../services/user.service.js"
import { addReview, removeReview } from "../store/review.actions.js"
import { Chat } from "../cmps/chat.jsx"

export function ToyDetails() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    // const [updateMsgList, setUpdateMsgList] = useState(null)
    const [isMsgInputShown, setisMsgInputShown] = useState(null)
    // const [inputTxt, setinputTxt] = useState(null)
    const [reviewToEdit, setReviewToEdit] = useState({ content: '', aboutToyId: ''})

    useEffect(() => {
        loadToy()
        // console.log('user:', user)
    }, [toyId])

    async function loadToy() {

        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
        // toyService.getById(toyId)
        //     .then((toy) => setToy(toy))
        //     .catch((err) => {
        //         console.log('Had issues in toy details', err)
        //         showErrorMsg('Cannot load toy')
        //         navigate('/toy')
        //     })
    }

    function onAddMsg() {
        setisMsgInputShown(true)
    }

    async function onSubmitMsg(ev) {
        ev.preventDefault()
        setisMsgInputShown(false)
        // if (!toy.msgs) toy.msgs = []
        const msgToSave = ev.target.msg.value
        // {
        //     id: utilService.makeId(),
        // txt: ev.target.msg.value
        //     by: {
        //         _id: user._id,
        //         fullname: user.fullname,
        //     }
        // }
        // toy.msgs.push(msgToSave)
        try {
            const savedToy = await toyService.addToyMsg(toy._id, msgToSave)
            showSuccessMsg(`Toy message added`)
            // setUpdateMsgList(msgToSave)
            loadToy()

        } catch (err) {
            showErrorMsg('Cannot add toy msg')
        }

        // console.log('ev.target:', ev.target.msg.value)
    }

    async function onRemoveMsg(msgId) {
        // console.log('msgId:', msgId)

        try {
            const savedToy = await toyService.removeToyMsg(toyId, msgId)
            showSuccessMsg(`Toy message deleted `)
            // setUpdateMsgList(msgId)
            loadToy()

        } catch (err) {
            showErrorMsg('Cannot delete toy message')
        }
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.content) return 
        console.log('here:', reviewToEdit)
        try {
            await addReview(reviewToEdit)
            await toyService.addToyReview(toyId, reviewToEdit)
            showSuccessMsg('Review added')
            // setReviewToEdit({ content: reviewToEdit.content, aboutToyId: toyId })
            setReviewToEdit('')
            loadToy()
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }

    const handleChange = ev => {
        const { value } = ev.target
        setReviewToEdit({ ...reviewToEdit, content: value, aboutToyId: toyId })
        // console.log('review:', review)
    }

    async function onRemoveReview(reviewId) {

        try {
            await removeReview(reviewId)
            await toyService.removeToyReview(toyId, reviewId)
            loadToy()
            showSuccessMsg(`Toy review deleted (id: ${reviewId})`)
        } catch (err) {
            showErrorMsg('Cannot delete toy review')
        }
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy : {toy.name}</h1>
        <p>⛐</p>
        <p>Created: {utilService.getFormattedDate(toy.createdAt)}</p>
        <p>Price: ${toy.price.toLocaleString()}</p>
        <p>Messages: </p>
        {toy.msgs && <ul>
            {toy.msgs.map(msg => {
                return <li key={msg.id}>
                    <span>{msg.txt}</span>
                    {user.isAdmin && <button onClick={() => onRemoveMsg(msg.id)} >Remove</button>}
                </li>
            })}
        </ul>}
            <p>Reviews: </p>
        {toy?.reviews?.length ? <ul>
            {toy.reviews.map(review => {
                return <li key={review._id}>
                    <span>{review.content}</span>
                    {user.isAdmin && <button onClick={() => onRemoveReview(review._id)} >Remove</button>}
                </li>
            })}
        </ul> : <h2>No Reviews</h2>}
        {toy.instock ? <p style={{ color: 'green' }}>In stock</p> : <p style={{ color: 'red' }}>Not in stock</p>}
        {/* <div className="detail-btns"> */}
        {/* {isMsgInputShown && <form onSubmit={onSubmitMsg}>
            <textarea type="textarea"
                id="msg"
                name="msg"
                placeholder="Add toy message"
            // value={inputTxt}
            // onChange={handleChange}
            // ref={elInputRef}
            />
            <button >Add msg</button>
        </form>} */}
       {user && toy &&  <Chat toy={toy} user={user}/>}
        {user &&
            <form onSubmit={onAddReview}>
                <textarea type="textarea"
                    id="review"
                    name="review"
                    placeholder="Add toy review"
                    value={reviewToEdit.content}
                    onChange={handleChange}
                // ref={elInputRef}
                />
                <button>Add Review</button>
            </form>
        }
        <Link to={`/toy/edit/${toy._id}`} className="button">Edit</Link>
        <Link to="/toy" className="button">Back</Link>
        {/* </div> */}
        {user && !isMsgInputShown && <button onClick={onAddMsg}>Add msg</button>}

    </section>
}