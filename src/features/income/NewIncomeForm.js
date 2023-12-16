import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewIncomeMutation } from "./incomesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'

const NewIncomeForm = ({}) => {

    const { _id } = useAuth()

    const [addNewIncome, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewIncomeMutation()

    const navigate = useNavigate()

    const [amount, setAmount] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setAmount('')
            setTitle('')
            setDescription('')
            navigate('/dash/income')
        }
    }, [isSuccess, navigate])

    const onAmountChanged = e => setAmount(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const canSave = [amount, title, description].every(Boolean) && !isLoading

    const onSaveIncomeClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewIncome({ user: _id, amount, title, description })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validAmountClass = !amount ? "form__input--incomplete" : ''
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveIncomeClicked}>
                <div className="form__title-row">
                    <h2>New Income</h2>
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
                <label className="form__label" htmlFor="amount">
                    Amount:</label>
                <input
                    className={`form__input ${validAmountClass}`}
                    id="amount"
                    name="amount"
                    type="text"
                    autoComplete="off"
                    value={amount}
                    onChange={onAmountChanged}
                />

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
            </form>
        </>
    )

    return content
}

export default NewIncomeForm