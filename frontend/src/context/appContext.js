import React, { useState } from "react";
import { io } from "socket.io-client";
import { SERVER_URL } from "../static/server";

const socket = io(SERVER_URL);

// initial a context object
export const AppContext = React.createContext();

// assign the Provider to a component
export function AppContextProvider({children}) {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const contextValue = {
        socket, 
        suggestedUsers, 
        setSuggestedUsers, 
        notifications, 
        setNotifications
    };

    return (
        <AppContext.Provider value={ contextValue }>
            { children }
        </AppContext.Provider>
    );
}