import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoginPage1 from './Components/LoginPage1';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import HomePage from './Components/HomePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
