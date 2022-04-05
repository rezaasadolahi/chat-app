import { useState } from 'react'
import { useNavigate } from 'react-router-dom'






function MainForm() {
    const [data, setData] = useState({ name: '', room: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }


    const validation = () => {
        if (!data.name) {
            setError('Please enter your name')
            return false
        }
        if (!data.room) {
            setError('Please enter your room')
            return false
        }
        setError('')
        return true
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            navigate(`/chat/${data.room}`, { replace: true, state: data })
        }
    }






    return (
        <div className='px-3 py-4 shadow bg-white text-dark border rounded row'>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <section className='form-group mb-4'>
                    <h2 className='text-warning mb-4 user-select-none'>Welcome to Chatclub</h2>
                </section>
                <section className='form-group mb-4'>
                    <input
                        type="text"
                        name="name"
                        placeholder='Enter name'
                        className='form-control bg-light'
                        value={data.name}
                        onChange={handleChange}
                    />
                </section>
                <section className='form-group mb-4'>
                    <select
                        className='form-select bg-light'
                        name='room'
                        value={data.room}
                        onChange={handleChange}
                    >
                        <option value='SelectRoom' disabled>Select Room</option>
                        <option value='game'>Gaming</option>
                        <option value='Coding'>Coding</option>
                        <option value='SocialMedia'>SocialMedia</option>
                    </select>
                </section>
                <button type='submit' className='btn btn-primary w-100 mb-2'>Submit</button>
            </form>
            {error ? <big className='text-danger'>{error}</big> : ''}
        </div >
    )
}


export default MainForm