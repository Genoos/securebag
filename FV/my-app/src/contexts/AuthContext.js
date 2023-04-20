import React, { useContext, useEffect, useState } from "react";



const AuthContext = React.createContext({currentUser:null});

export function useAuth() {
  return useContext(AuthContext);
}


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  const signup= async (email,name, passwd) => {
    try {
      const response = await fetch("http://127.0.0.1:4000/user/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,name, passwd})

        })
        const data = await response.json();
        console.log("data ", data);
      } catch (err) {
          console.log("createuser err ", err);
      }
  }


  const login  = async (email, passwd) => {
    console.log("login called", email, passwd);
    try{
        
        const response = await fetch("http://127.0.0.1:4000/user/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, passwd})

        })
        const data = await response.json();
        console.log("data ", data);
        setCurrentUser(data);

    }catch(err){
      console.log("login err ", err);
    }
  }

  const logout = async () => {
    try{
      setCurrentUser(null);
      console.log("logged out");
    }catch(err){console.log("logout err ", err)}
  }

  const value = {
    currentUser,
    login,
    signup,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;