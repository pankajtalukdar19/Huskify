import './App.css'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Frontend from './Layout/Frontend/Frontend';
function App() {


  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<Frontend />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
