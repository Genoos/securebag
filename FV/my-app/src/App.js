import Register from "./components/Register";
import Login from "./components/Login";
import { Home } from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./utils/PrivateRoute";
// import { genrateNewKeys,encrypt,decrypt } from "./utils/crypto";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              {/* <Route path="/folder/:folderId" element={<Home />} /> */}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      
    </>
  );
}

export default App;
