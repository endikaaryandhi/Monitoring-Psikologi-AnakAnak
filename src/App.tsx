import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ChildQuiz from './pages/ChildQuiz'
import ChildResult from './pages/ChildResult'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Education from './pages/Education'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChildQuiz />} />
        <Route path="/edukasi" element={<Education />} />
        <Route path="/result" element={<ChildResult />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App