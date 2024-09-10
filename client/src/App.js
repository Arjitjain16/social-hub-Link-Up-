import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {Routes , Route} from "react-router-dom"

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/profile/:username" element={<Profile />} />
         <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
      
    </div>
  );
}

export default App;
