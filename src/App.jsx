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
import CreateAplikasi from './pages/master-data/master-aplikasi/CreateAplikasi'
import EditAplikasi from './pages/master-data/master-aplikasi/EditAplikasi'
import SetAksesGroup from './pages/master-data/master-group/SetAksesGroup'
import masterMenuRoutes from './pages/master-data/master-menu/routes'
import masterAplikasiRoutes from './pages/master-data/master-aplikasi/routes'
import masterUserRoutes from './pages/master-data/master-user/routes'
import masterGroupRoutes from './pages/master-data/master-group/routes'

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
            {
              masterAplikasiRoutes && masterAplikasiRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))
            }

            {/* Master Group */}
            {
              masterGroupRoutes && masterGroupRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))
            }

            {/* Master Menu */}
            {
              masterMenuRoutes && masterMenuRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))
            }

            {/* Master User */}
            {
              masterUserRoutes && masterUserRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))
            }

            <Route path='/user-profile' element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
