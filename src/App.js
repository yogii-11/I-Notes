import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
      </Routes>
      </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
