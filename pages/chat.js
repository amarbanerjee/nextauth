import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getSession } from 'next-auth/react';

import { Message_data } from "@/context/context";
import { useContext } from "react";

const socket = io();

export default function Chat({session}) {
  const [message, setMessage] = useState();
  //const [messages, setMessages] = useState([]);
  const { messages, setMessages } = useContext(Message_data);

  //console.log(session);

  let userName = "Test";
  if(session.userData.username){
    userName = session.userData.username;
  }
   

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    const objectMessage = {usename:userName, message:message}
    socket.emit('message', objectMessage);
    setMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.usename}: {msg.message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
  }