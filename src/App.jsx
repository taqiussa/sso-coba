import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './functions/provider/PrivateRoute'
import { UserProvider } from './functions/provider/UserProvider'
import MasterUser from './pages/master-data/master-user/MasterUser'
import UserProfile from './pages/user/UserProfile'
import CreateUser from './pages/master-data/master-user/CreateUser'
import EditUser from './pages/master-data/master-user/EditUser'
import MasterGroup from './pages/master-data/master-group/MasterGroup'
import MasterAplikasi from './pages/master-data/master-group/MasterAplikasi'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />

            {/* Master User */}
            <Route path='/master_user' element={<MasterUser />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/edit-user/:id_user' element={<EditUser />} />

            {/* Master Group */}
            <Route path='/master_group' element={<MasterAplikasi />} />
            <Route path='/master_group_group' element={<MasterGroup />} />

            <Route path='/user-profile' element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
