import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './functions/provider/PrivateRoute'
import { UserProvider } from './functions/provider/UserProvider'
import MasterUser from './pages/users/MasterUser'
import UserProfile from './pages/user/UserProfile'
import CreateUser from './pages/users/CreateUser'
import EditUser from './pages/users/EditUser'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/master_user' element={<MasterUser />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/edit-user/:id_user' element={<EditUser />} />
            <Route path='/user-profile' element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
