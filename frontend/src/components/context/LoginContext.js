import { createContext, useEffect, useState } from "react";

export const LoginContext=createContext();

export const LoginContextProvider=({children})=>{
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken ? JSON.parse(storedToken) : null;
      });

      const logOut =()=>{
        setToken(null);
        setYes(null);
      }
      const [yes, setYes] = useState(() => {
        const storedYes = localStorage.getItem('yes');
        return storedYes ? JSON.parse(storedYes) : null;
      });
      
      

      useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('yes', JSON.stringify(yes));
      }, [token,yes]);
    return(
        <LoginContext.Provider value={{token,setToken,logOut,setYes,yes}}>
            {children}
        </LoginContext.Provider>
    )
}