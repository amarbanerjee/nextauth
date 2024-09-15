import { createContext, useState } from "react";
export const Message_data = createContext(null);


function Context({ children }) {
    const [messages, setMessages] = useState([]);
  
    return (
      <Message_data.Provider value={{ messages, setMessages }}>
        {children}
      </Message_data.Provider>
    );
  }

  export default Context;