import { useState, useEffect } from "react"
import { useUpdateContactMutation, useDeleteContactMutation } from "./contactsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditContactForm = ({ contact }) => {

    const [updateContact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateContactMutation()

    const [deleteContact, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteContactMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(contact.name)
    const [phone, setPhone] = useState(contact.phone)
    const [description, setDescription] = useState(contact.description)
    const [email, setEmail] = useState(contact.email)


    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setPhone('')
            setDescription('')
            setEmail('')
            navigate('/dash/contacts')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)


    const canSave = [name, phone, description, email].every(Boolean) && !isLoading

    const onSaveContactClicked = async (e) => {
        if (canSave) {
            await updateContact({ id: contact.id, name, phone, description, email })
        }
    }
    const onDeleteContactClicked = async () => {
        await deleteContact({ id: contact.id })
    }

    const created = new Date(contact.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(contact.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''


    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const deleteButton = (
        <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteContactClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
)

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Contact</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveContactClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="contact-name">
                    Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="contact-phone">
                    Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="contact-phone"
                    name="phone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="contact-text">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="contact-text"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label" htmlFor="contact-email">
                    Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="contact-email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <div className="form__row">
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditContactForm