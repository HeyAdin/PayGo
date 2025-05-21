import { Suspense } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
function App() {

  return (
    <div className='flex justify-center items-center h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Suspense fallback={"...Loading"}> <Signin/> </Suspense>} />
          <Route path='/signup' element={<Suspense fallback={"...Loading"}> <Signup/> </Suspense>} />
          <Route path='/dashboard' element={<Suspense fallback={"...Loading"}> <Dashboard /> </Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
