import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import RequestInfo from "./RequestInfo";
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const WEBSOCKET_SERVER_URL = "ws://localhost:7071";

const CartPage = () => {
  const [requests, setRequests] = useState([]);
  const [cartInfo, setCartInfo] = useState({active: true});
  const location = useLocation()
  const binId = location.pathname.split("/")[2]
  const endPoint = `http://localhost:4568/req/${binId}`
  
  useEffect(() => {
    const websocket = new WebSocket(WEBSOCKET_SERVER_URL);
    const setUpWebsocket = () => {
      
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (websocket.readyState === 1) {
            clearInterval(interval);
            websocket.send(JSON.stringify({ type: 'new_subscriber', publicId: binId }));
            websocket.onmessage = async () => {
              const result = await axios.get(`http://localhost:4568/bin/${binId}`)
              setRequests(result.data.requests || []);
            };
            resolve(websocket);
          }
        }, 10);
      });
    }

    setUpWebsocket()
    const closeSocket = () => {
      websocket.close()
    }
    return closeSocket
  }, [binId])

  useEffect(() => {
    const getRequests = async () => {
      try{
        const result = await axios.get(`http://localhost:4568/bin/${binId}`)
        setCartInfo(result.data.binInfo);
        setRequests(result.data.requests || []);
      } catch (err) {
        console.log(err)
      }
    };

    getRequests();
  }, [binId]);

  const handleRefreshClick = async () => {
    try{
      const result = await axios.get(`http://localhost:4568/bin/${binId}`)
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
        Your Bin
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
