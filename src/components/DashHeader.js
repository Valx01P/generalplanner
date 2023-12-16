import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const INCOME_REGEX = /^\/dash\/income(\/)?$/
const INFO_REGEX = /^\/dash\/info(\/)?$/
const CONTACTS_REGEX = /^\/dash\/contacts(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const DashHeader = () => {
    const { isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewContactClicked = () => navigate('/dash/contacts/new')
    const onNewIncomeClicked = () => navigate('/dash/income/new')
    const onNewInfoClicked = () => navigate('/dash/info/new')
    const onNewUserClicked = () => navigate('/dash/users/new')

    const onContactsClicked = () => navigate('/dash/contacts')
    const onIncomeClicked = () => navigate('/dash/income')
    const onInfoClicked = () => navigate('/dash/info')
    const onUsersClicked = () => navigate('/dash/users')


    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !INCOME_REGEX.test(pathname) &&
     !INFO_REGEX.test(pathname) && !CONTACTS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }


    let newInfoButton = null
    if (INFO_REGEX.test(pathname)) {
        newInfoButton = (
            <button
                className="icon-button"
                title="New Info"
                onClick={onNewInfoClicked}
            >
                <p>New Info</p>
            </button>
        )
    }

    let newContactButton = null
    if (CONTACTS_REGEX.test(pathname)) {
        newContactButton = (
            <button
                className="icon-button"
                title="New Contact"
                onClick={onNewContactClicked}
            >
                <p>New Contact</p>
            </button>
        )
    }

    let newIncomeButton = null
    if (INCOME_REGEX.test(pathname)) {
        newIncomeButton = (
            <button
                className="icon-button"
                title="New Income"
                onClick={onNewIncomeClicked}
            >
                <p>New Income</p>
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <p>New User</p>
            </button>
        )
    }





    let infoButton = null
    if (!INFO_REGEX.test(pathname) && pathname.includes('/dash')) {
        infoButton = (
            <button
                className="icon-button"
                title="Info"
                onClick={onInfoClicked}
            >
                <p>View Info</p>
            </button>
        )
    }


    let contactsButton = null
    if (!CONTACTS_REGEX.test(pathname) && pathname.includes('/dash')) {
        contactsButton = (
            <button
                className="icon-button"
                title="Contacts"
                onClick={onContactsClicked}
            >
                <p>View Contacts</p>
            </button>
        )
    }

    let incomeButton = null
    if (!INCOME_REGEX.test(pathname) && pathname.includes('/dash')) {
        incomeButton = (
            <button
                className="icon-button"
                title="Income"
                onClick={onIncomeClicked}
            >
                <p>View Income</p>
            </button>
        )
    }

    let usersButton = null
    if (isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            usersButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <p>View Users</p>
                </button>
            )
        }
    }


    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newContactButton}
                {newIncomeButton}
                {newInfoButton}
                {newUserButton}

                {contactsButton}
                {incomeButton}
                {infoButton}
                {usersButton}

                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">Thug shit</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader