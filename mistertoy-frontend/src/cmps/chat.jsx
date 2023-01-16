import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { socketService, SOCKET_EVENT_IS_TYPING, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_REMOVE_MSG, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_DELETE_MSG, SOCKET_EMIT_IS_TYPING } from '../services/socket.service'
import { toyService } from '../services/toy.service'

export function Chat({ toy, user }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    // const [isBotMode, setIsBotMode] = useState(false)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    // let botTimeout

    useEffect(() => {
        setMsgs(toy.msgs)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_DELETE_MSG, removeMsg)
        socketService.on(SOCKET_EVENT_IS_TYPING, setTypingState)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toy._id)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_DELETE_MSG, removeMsg)
            socketService.off(SOCKET_EVENT_IS_TYPING, setTypingState)
            // botTimeout && clearTimeout(botTimeout)
        }
    }, [])
    // useEffect(() => {
    // }, [msgs])

    // useEffect(() => {
    // }, [topic])

    function setTypingState(state) {
        setIsTyping(state)
    }

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function removeMsg(msgId) {
        // const newMsgs = 
        // setMsgs(newMsgs)
        setMsgs(prevMsgs => prevMsgs.filter(msg => msg.id !== msgId))
    }

    // function sendBotResponse() {
    //     // Handle case: send single bot response (debounce).
    //     botTimeout && clearTimeout(botTimeout)
    //     botTimeout = setTimeout(() => {
    //         setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
    //     }, 1250)
    // }

    async function sendMsg(ev) {
        ev.preventDefault()
        // const from = loggedInUser?.fullname || 'Me'
        // const from = getMsgFrom(msg)
        const newMsg = { txt: msg.txt }
        // console.log('newMsg.txt:', newMsg.txt)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        try {
            const savedMsg = await toyService.addToyMsg(toy._id, newMsg.txt)
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            // socketService.emit(SOCKET_EVENT_ADD_MSG, newMsg)
            showSuccessMsg(`Toy message added`)
            // setUpdateMsgList(msgToSave)
            // loadToy()
            addMsg(savedMsg)
            setMsg({ txt: '' })
            setIsTyping(false)
            socketService.emit(SOCKET_EMIT_IS_TYPING, false)
        } catch (err) {
            showErrorMsg('Cannot add toy msg')
        }

    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        if(value) {
            setIsTyping(true)
            socketService.emit(SOCKET_EMIT_IS_TYPING, true)
        } else {
            setIsTyping(false)
            socketService.emit(SOCKET_EMIT_IS_TYPING, false)
        }
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    async function onRemoveMsg(msgId) {
        // console.log('msgId:', msgId)

        try {
            const removedMsg = await toyService.removeToyMsg(toy._id, msgId)
            showSuccessMsg(`Toy message deleted `)
            // setUpdateMsgList(msgId)
            // loadToy()
            // socketService.on(SOCKET_EMIT_REMOVE_MSG, msgId)
            socketService.emit(SOCKET_EMIT_REMOVE_MSG, removedMsg)
            removeMsg(msgId)

        } catch (err) {
            showErrorMsg('Cannot delete toy message')
        }
    }

    // function onAddMsg() {
    //     setisMsgInputShown(true)
    // }

    // function getMsgFrom(msg) {
    //     if (msg.from) {
    //         // console.log('msg.from:',msg.from)
    //         msg.from = loggedInUser.fullname ? 'Me' : msg.from
    //     }
    //     else {
    //         msg.from = (msg.by.fullname === loggedInUser.fullname) ? 'Me' : msg.by.fullname
    //     }
    //     return msg.from
    // }


    return (
        <section className="chat">
            <h2>Chat Room</h2>
            {/* 
            <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({ target }) => setIsBotMode(target.checked)} />
                Bot Mode
            </label> */}

            {/* <div>
                <label>
                    <input type="radio" name="topic" value="Love"
                        checked={topic === 'Love'} onChange={({ target }) => setTopic(target.value)} />
                    Love
                </label>

                <label>
                    <input
                        type="radio" name="topic" value="Politics"
                        checked={topic === 'Politics'} onChange={({ target }) => setTopic(target.value)} />
                    Politics
                </label>

            </div> */}

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            {<span>{user.fullname} is typing..</span>}
            <ul>
                {/* {msgs.map((msg, idx) => (<li key={idx}><span className="button" onClick={() => onRemoveMsg(msg.id)}>x</span><p>{msg.from}: {msg.txt}</p></li>))} */}
                {msgs && msgs.map((msg, idx) => {
                    return (<li key={idx}>
                        {user.isAdmin && <span className="button" onClick={() => onRemoveMsg(msg.id)}>x</span>}
                        <p>{(msg.by.fullname === loggedInUser.fullname) ? 'Me' : msg.by.fullname}: {msg.txt}</p>
                    </li>)
                })}
                {/* {msgs && msgs.map((msg, idx) => (<li key={idx}><span className="button" onClick={() => onRemoveMsg(msg.id)}>x</span><p>{(msg.by.fullname === loggedInUser.fullname) ? 'Me' : msg.by.fullname}: {msg.txt}</p></li>))} */}
            </ul>
        </section>
    )
}