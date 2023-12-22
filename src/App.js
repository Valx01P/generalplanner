import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import InfoList from './features/info/InfoList'
import IncomeList from './features/income/IncomeList'
import ContactsList from './features/contacts/ContactsList'
import NewUserForm from './features/users/NewUserForm'
import NewInfoForm from './features/info/NewInfoForm'
import NewIncomeForm from './features/income/NewIncomeForm'
import NewContactForm from './features/contacts/NewContactForm'
import EditUser from './features/users/EditUser'
import EditInfo from './features/info/EditInfo'
import EditIncome from './features/income/EditIncome'
import EditContact from './features/contacts/EditContact'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle'

function App() {
  useTitle("TL - Home")

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}> {/*allowed roles*/}
            <Route element={<Prefetch />}> {/*Protected Routes*/}
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />
                {/* Provides url names for path routing */}
                <Route path="contacts">
                  <Route index element={<ContactsList />} />
                  <Route path=":id" element={<EditContact />} />
                  <Route path="new" element={<NewContactForm />} />
                </Route>

                <Route path="income">
                  <Route index element={<IncomeList />} />
                  <Route path=":id" element={<EditIncome />} />
                  <Route path="new" element={<NewIncomeForm />} />
                </Route>

                <Route path="info">
                  <Route index element={<InfoList />} />
                  <Route path=":id" element={<EditInfo />} />
                  <Route path="new" element={<NewInfoForm />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

              </Route>{/* End Dash */}
            </Route>{/* End Prefetch */}
          </Route>{/* End Protected Routes */}
        </Route>{/* End Persist Login */}

      </Route>
    </Routes>
  );
}

export default App;
