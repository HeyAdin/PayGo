import { Suspense } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoutes'
import { FundsTransfer } from './pages/FundsTransfer'
function App() {

  return (
    <div className='bg-gradient-to-br from-[#0A2B24] to-[#176F5B] min-h-screen flex justify-center items-center h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Suspense fallback={"...Loading"}> <Signin /> </Suspense>} />
          <Route path='/signup' element={<Suspense fallback={"...Loading"}> <Signup /> </Suspense>} />
          <Route path='/' element={<Suspense fallback={"...Loading"}>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Suspense>} />

          <Route path='/dashboard' element={<Suspense fallback={"...Loading"}>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Suspense>} />

          <Route path='/funds-transfer' element={<Suspense>
            <ProtectedRoute>
              <FundsTransfer />
            </ProtectedRoute>
          </Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
