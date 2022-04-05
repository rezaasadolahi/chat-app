import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import Moment from 'react-moment'
import { io } from "socket.io-client"





const ChatRoom = () => {
    const location = useLocation()
    const [data, setData] = useState({})
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [socket, setSocket] = useState()
    const [loading, setLoading] = useState(false)
    const msgBoxRef = useRef()


    useEffect(() => {
        const socket = io("http://localhost:4020")
        setSocket(socket)

        socket.on("connect", () => {
            console.log("socket Connected")
            socket.emit("joinRoom", location.state.room)
        })
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on("getLatestMessage", (newMessage) => {
                setAllMessages([...allMessages, newMessage])
                msgBoxRef.current.scrollIntoView({ behavior: "smooth" })
                setMessage("")
                setLoading(false)
            })
        }
    }, [socket, allMessages])

    useEffect(() => {
        setData(location.state)
    }, [location])


    const handleChange = (e) => setMessage(e.target.value)
    const handleEnter = (e) => e.keyCode === 13 ? onSubmit() : ''

    const onSubmit = () => {
        if (message !== '') {
            setLoading(true)
            const newMessage = { time: new Date(), message, name: data.name }
            socket.emit("newMessage", { newMessage, room: data.room })
        }
    }





    return (
        <div className='container py-4 m-5 w-50 shadow bg-white text-dark border rounded'>

            <section className='text-center px-3 mb-4 text-capitalize'>
                <h1 className='text-dark mb-4 user-select-none d-flex align-items-center justify-content-center'>
                    <p className='text-primary'>{data?.room} &nbsp;</p>
                    Room
                </h1>
            </section>

            <div className='bg-light border rounded p-3 mb-4' style={{ height: '450px', overflowY: 'scroll' }}>
                {
                    allMessages.map((msg, index) => {
                        return data.name === msg.name ?
                            <section className='row justify-content-end pl-5' key={index}>
                                <section className='d-flex flex-column align-items-end m-2 p-2 shadow bg-info border rounded w-auto'>
                                    <section>
                                        <strong className='m-1'>{msg.name} &nbsp;</strong>
                                        <small className='text-muted'><Moment toNow>{msg.time}</Moment></small>
                                    </section>
                                    <h4 className='m-1'>{msg.message}</h4>
                                </section>
                            </section>
                            :
                            <section className='row justify-content-start' key={index}>
                                <section className='d-flex flex-column align-items-start m-2 p-2 shadow bg-white border rounded w-auto'>
                                    <section>
                                        <strong className='m-1'>{msg.name}&nbsp;</strong>
                                        <small className='text-muted'><Moment toNow>{msg.time}</Moment></small>
                                    </section>
                                    <h4 className='m-1'>{msg.message}</h4>
                                </section>
                            </section>
                    })
                }
                <div ref={msgBoxRef} ></div>
            </div>

            <div className='form-group d-flex'>
                <input
                    type="text"
                    name='message'
                    className='form-control bg-light'
                    placeholder='Type your message'
                    autoComplete='off'
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleEnter}
                />
                <button type='submit' className='btn btn-warning mx-2 pt-2 d-flex' onClick={onSubmit}>
                    {
                        loading
                            ?
                            <div class="spinner-border spinner-border-sm text-primary"></div>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                    }
                </button>
            </div>

        </div>
    )
}


export default ChatRoom