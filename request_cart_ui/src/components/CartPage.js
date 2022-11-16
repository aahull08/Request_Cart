import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import RequestInfo from "./RequestInfo";
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const WEBSOCKET_SERVER_URL = "wss://requestbin.ahullstackdeveloper.com/wsapp";
const endpoint = "https://requestbin.ahullstackdeveloper.com/req"

const CartPage = () => {
  const [requests, setRequests] = useState([]);
  const [cartInfo, setCartInfo] = useState({active: true});
  const location = useLocation()
  const cartId = location.pathname.split("/")[2]
  const endPoint = `${endpoint}/${cartId}`
  
  // useEffect(() => {
  //   let websocket;
  //   const setUpWebsocket = async () => {
  //     websocket = new WebSocket(WEBSOCKET_SERVER_URL);
  //     return new Promise((resolve, reject) => {
  //       const interval = setInterval(() => {
  //         if (websocket.readyState === 1) {
  //           clearInterval(interval);
  //           websocket.send(JSON.stringify({ type: 'new_subscriber', publicId: cartId }));
  //           websocket.onmessage = async () => {
  //             const result = await axios.get(`/carts/${cartId}`)
  //             setRequests(result.data.requests || []);
  //           };
  //           resolve(websocket);
  //         }
  //       }, 10);
  //     });
  //   }
    
  //   setUpWebsocket()
  //   const closeSocket = () => {
  //     websocket.close()
  //   }
  //   return closeSocket
  // }, [cartId])

    useEffect(() => {
    let websocket;
    const setUpWebsocket = async () => {
      const setUp = () => {
        websocket = new WebSocket(WEBSOCKET_SERVER_URL);
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (websocket.readyState === 1) {
              clearInterval(interval);
              websocket.send(JSON.stringify({ type: 'new_subscriber', publicId: cartId }));
              websocket.onmessage = async () => {
                const result = await axios.get(`/carts/${cartId}`)
                setRequests(result.data.requests || []);
              };
              resolve(websocket);
            }
          }, 10);
        });
      }
      await setUp()
    }
    
    setUpWebsocket()
    const closeSocket = () => {
      websocket.close()
    }
    return closeSocket
  }, [cartId])

  useEffect(() => {
    const getRequests = async () => {
      try{
        const result = await axios.get(`/carts/${cartId}`)
        setCartInfo(result.data.binInfo);
        setRequests(result.data.requests || []);
      } catch (err) {
        console.log(err)
      }
    };

    getRequests();
  }, [cartId]);

  const handleRefreshClick = async () => {
    try{
      const result = await axios.get(`/carts/${cartId}`)
      setRequests(result.data.requests || []);
    } catch (err) {
      console.log(err)
    }
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(endPoint)
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={7}>
      <Typography variant="h3" sx={{ color: "white", pt: 5, pl: 10, pr: 5, }}>
        Your Cart
      </Typography>
      <Typography
        variant="h6"
        align="left"
        sx={{ color: "white", pl: 25, pt: 2, pr: 5, mb: 15, width: "100%" }}>
        Your Endpoint: {endPoint} <ContentCopyIcon onClick={handleCopyClick}/>
        <br />
        Created: {cartInfo.time_created}
        <br />
        Active: {cartInfo.active.toString() || "true"}
        <br />
        <RefreshIcon onClick={handleRefreshClick}/>
      </Typography>
      
      {requests.map((request) => (
        <RequestInfo key={request._id} request={request} />
      ))}
    </Stack>
  );
};

export default CartPage;
