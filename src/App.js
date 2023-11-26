import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import PlansList from './features/plans/PlansList'
import InfoList from './features/info/InfoList'
import IncomeList from './features/income/IncomeList'
import ContactList from './features/contacts/ContactsList'



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />
          {/* Provices url names for path routing */}
          <Route path="contacts">
            <Route index element={<ContactList />} />
          </Route>

          <Route path="income">
            <Route index element={<IncomeList />} />
          </Route>

          <Route path="info">
            <Route index element={<InfoList />} />
          </Route>

          <Route path="plans">
            <Route index element={<PlansList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;
