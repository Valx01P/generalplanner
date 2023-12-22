import { store } from '../../app/store'
import { contactsApiSlice } from '../contacts/contactsApiSlice';
import { incomeApiSlice } from '../income/incomeApiSlice';
import { infoApiSlice } from '../info/infoApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(contactsApiSlice.util.prefetch('getContacts', 'contactsList', { force: true }))
        store.dispatch(incomeApiSlice.util.prefetch('getIncome', 'incomeList', { force: true }))
        store.dispatch(infoApiSlice.util.prefetch('getInfo', 'infoList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
