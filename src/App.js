import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./pages/navigation/publicNavbar/Navbar";
import Login from "./components/Users/Login/Login";

import Register from "./components/Users/Register/Register";
import UsersList from "./components/Users/usersList/UsersList";
import DoneColumn from "./components/DoneColumn";
import ToDoColumn from "./components/ToDoColumn";
import TaskHomepage from "./pages/navigation/TaskHomepage";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/users" element={<UsersList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doing" element={<TaskHomepage />} />
          <Route path="/done" element={<DoneColumn />} />
          <Route path="/todo" element={<ToDoColumn />} />

          <Route path="/login" element={<Login />} />
        
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
