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
import MasterAplikasi from './pages/master-data/master-aplikasi/MasterAplikasi'
import MasterGroup from './pages/master-data/master-group/MasterGroup'
import MasterMenu from './pages/master-data/master-menu/MasterMenu'
import CreateAplikasi from './pages/master-data/master-aplikasi/CreateAplikasi'
import EditAplikasi from './pages/master-data/master-aplikasi/EditAplikasi'
import SetAksesGroup from './pages/master-data/master-group/SetAksesGroup'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />

            {/* Master Data */}
            {/* Master Aplikasi */}
            <Route path='/master_aplikasi' element={<MasterAplikasi />} />
            <Route path='/create_aplikasi' element={<CreateAplikasi />} />
            <Route path='/edit_aplikasi/:id_master_aplikasi' element={<EditAplikasi />} />

            {/* Master Group */}
            <Route path='/master_group' element={<MasterGroup />} />
            <Route path='/set_akses_group/:id_master_group' element={<SetAksesGroup />} />

            {/* Master Menu */}
            <Route path='/master_menu' element={<MasterMenu />} />


            {/* Master User */}
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
