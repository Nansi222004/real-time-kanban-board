import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/user/Home";

import Login from "./pages/user/Login";

import Register from "./pages/user/Register";

import KanbanBoard from "./pages/user/KanbanBoard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />



        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />



        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<Register />}
        />



        {/* BOARD */}
        <Route
          path="/board"
          element={<KanbanBoard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;