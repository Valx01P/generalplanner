import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewInfoMutation } from "./infoApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'

const NewInfoForm = () => {

    const { id } = useAuth()

    const [addNewInfo, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewInfoMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setDescription('')
            navigate('/dash/info')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const canSave = [title, description].every(Boolean) && !isLoading

    const onSaveInfoClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewInfo({ user: id, title, description })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveInfoClicked}>
                <div className="form__title-row">
                    <h2>New Info</h2>
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
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
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
                {/* <div className="form__control-bar">
                    <button
                        className="icon-button"
                        title="Save"
                        disabled={!canSave}
                    >
                        <p>Submit</p>
                    </button>
                </div> */}
            </form>
        </>
    )

    return content
}

export default NewInfoForm