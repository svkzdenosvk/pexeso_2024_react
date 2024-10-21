import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppGame from "./AppGame"
import ErrorPage from "./components/ErrorPage"


const App = () => {
  return (
    
    <BrowserRouter>
        <Routes>
             <Route path="/" element={<AppGame/>}/>
             <Route path="*" element={<ErrorPage/>}/>

        </Routes>
    </BrowserRouter>

  )
}

export default App