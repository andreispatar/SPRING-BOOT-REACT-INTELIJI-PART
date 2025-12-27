import Menubar from './components/menubar/menubar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Explore from './pages/Explore/Explore.jsx'
import ManageItems from './pages/ManageItems/ManageItems.jsx'
import ManageCategory from './pages/ManageCategory/ManageCategory.jsx'
import ManageUsers from './pages/ManageUsers/ManageUsers.jsx'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login.jsx'

const App = () => {

  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && <Menubar />}
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manage-items" element={<ManageItems />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App;
