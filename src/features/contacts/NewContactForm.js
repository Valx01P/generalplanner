import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewContactMutation } from "./contactsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'

const NewContactForm = () => {

    const { _id } = useAuth()

    const [addNewContact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewContactMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPhone('')
            setEmail('')
            setDescription('')
            navigate('/dash/contact')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const canSave = [name, phone, email, description].every(Boolean) && !isLoading

    const onSaveContactClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewContact({ user: _id, name, phone, email, description })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveContactClicked}>
                <div className="form__title-row">
                    <h2>New Contact</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="name">
                    Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="phone">
                    Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="email">
                    Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />
            </form>
        </>
    )

    return content
}

export default NewContactForm