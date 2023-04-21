import Register from "./components/Register";
import Login from "./components/Login";
import { Home } from "./pages/Home";
import AuthContext from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./utils/PrivateRoute";
import { useEffect,useContext } from "react";
// import { genrateNewKeys,encrypt,decrypt } from "./utils/crypto";

function App() {
  const {currentUser,setCurrentUser} = useContext(AuthContext);

  
  return (
    <>
      
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} exact/>
              <Route path="/getsub/:fileId" element={<Home />}  />
            </Route>
          </Routes>
        </Router>
  
      
    </>
  );
}

export default App;
