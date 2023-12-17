import { useState, useEffect } from "react"
import { useUpdateIncomeMutation, useDeleteIncomeMutation } from "./incomeApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditIncomeForm = ({ income }) => {

    const { _id } = useAuth()

    const [updateIncome, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateIncomeMutation()

    const [deleteIncome, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteIncomeMutation()

    const navigate = useNavigate()

    const [amount, setAmount] = useState(income.amount)
    const [title, setTitle] = useState(income.title)
    const [description, setDescription] = useState(income.description)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setAmount('')
            setTitle('')
            setDescription('')
            navigate('/dash/income')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onAmountChanged = e => setAmount(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const canSave = [title, description, amount].every(Boolean) && !isLoading

    const onSaveIncomeClicked = async (e) => {
        if (canSave) {
            await updateIncome({ id: income.id, user: _id, title, description, amount })
        }
    }
    const onDeleteIncomeClicked = async () => {
        await deleteIncome({ id: income.id })
    }

    const created = new Date(income.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(income.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''
    const validAmountClass = !amount ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const deleteButton = (
        <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteIncomeClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
)

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Income</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveIncomeClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="income-amount">
                    Amount:</label>
                <input
                    className={`form__input ${validAmountClass}`}
                    id="income-amount"
                    name="amount"
                    type="text"
                    autoComplete="off"
                    value={amount}
                    onChange={onAmountChanged}
                />

                <label className="form__label" htmlFor="income-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="income-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="income-text">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="income-text"
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

export default EditIncomeForm