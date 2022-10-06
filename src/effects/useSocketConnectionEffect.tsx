import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

const sockets = {};
const socket = io('http://localhost:3000/dm');
const useSocketConnectionEffect = () => {
  const [socket, setSocket] = useState<any>();
  useEffect(() => {}, [socket]);
};
