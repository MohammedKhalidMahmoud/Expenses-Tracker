import { useState } from "react";
import { createContext } from "react";

export const tokenContext=createContext({});

export function TokenProvider({children}){  
    const [token, setToken] = useState(localStorage.getItem('token'));

    const saveToken = (userToken) => {
        setToken(userToken);
        localStorage.setItem('token', userToken);
    };
    
    const removeToken = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <tokenContext.Provider value={{ token, saveToken, removeToken}}>
            {children}
        </tokenContext.Provider>
    );
}
