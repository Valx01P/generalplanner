import { useState, useEffect } from "react"
import { useUpdateInfoMutation, useDeleteInfoMutation } from "./infoApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditInfoForm = ({ info }) => {

    const { _id } = useAuth()

    const [updateInfo, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateInfoMutation()

    const [deleteInfo, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteInfoMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(info.title)
    const [description, setDescription] = useState(info.description)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setDescription('')
            navigate('/dash/info')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const canSave = [title, description].every(Boolean) && !isLoading

    const onSaveInfoClicked = async (e) => {
        if (canSave) {
            await updateInfo({ id: info.id, user: _id, title, description })
        }
    }
    const onDeleteInfoClicked = async () => {
        await deleteInfo({ id: info.id })
    }

    const created = new Date(info.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(info.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const deleteButton = (
        <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteInfoClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
)

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Info</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveInfoClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="info-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="info-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="info-text">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="info-text"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
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

export default EditInfoForm