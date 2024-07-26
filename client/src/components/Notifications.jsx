import { Button } from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../SocketContext";

export default function Notifications() {
  const { answercall, call, callAccepted } = useContext(SocketContext);

  return (
    <div>
      {call.isReceivedCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling you</h1>
          <Button variant="contained" color="primary" onClick={answercall}>
            Answer
          </Button>
        </div>
      )}
    </div>
  );
}
