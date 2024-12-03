import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
