import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import vars from '../../config/vars';
import { addUser, removeUser } from '../../redux/chatUsersOnlineSlice';

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  subscribe: () => {},
  unsubscribe: () => {},
  reconnect: () => {},
});

const SocketProvider = ({ children }) => {
  const { userId,isLoggedIn, token } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const subscribers = useRef([]);
  const socketUrl = `${vars.SOCKET_URL}/ws/chat/${userId}/?token=${token}`;
  const initializeWebSocket = useCallback((socketUrl) => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket Connection Opened');
    };

    ws.onmessage = (event) => {
      console.log(userId,event);
      subscribers.current.forEach((callback) => {
        callback(event);
      });
    };

    ws.onclose = () => {
      console.error('WebSocket Close');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Handle error (e.g., show error message)
    };

    setSocket(ws);

    return () => {
      ws.close();
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    if(isLoggedIn)
    initializeWebSocket(socketUrl);
  }, [isLoggedIn, initializeWebSocket]);

  const subscribe = useCallback((callback) => {
    subscribers.current.push(callback);
  }, []);

  const unsubscribe = useCallback((callback) => {
    subscribers.current = subscribers.current.filter((subscriber) => subscriber !== callback);
  }, []);

  const reconnect = useCallback(() => {
    // Close the existing WebSocket connection
    if (socket) {
      socket.close();
    }

    // Reinitialize WebSocket with a new connection
    console.log("socket connecting again");
    initializeWebSocket(socketUrl);
  }, [socket, userId, token, initializeWebSocket]);
  useEffect(() => {

    handleMessage= e => {
      const data = JSON.parse(e.data)

      if (data.type == "UserStatus" ) {
if(data.status==="online")
dispatch(addUser(data.id))
else
dispatch(removeUser(data.id))
 
        
      }
    }

  
      if (socket) subscribe(handleMessage);
  
      return () => {
        unsubscribe(handleMessage);
      };
    }, [socket, subscribe, unsubscribe]);
  return (
    <SocketContext.Provider value={{ socket, isConnected, subscribe, unsubscribe, reconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };