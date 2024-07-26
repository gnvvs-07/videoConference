import { Grid, Typography, Paper, Box } from "@mui/material";
import { SocketContext } from "../SocketContext";
import { useContext, useEffect } from "react";

export default function VideoPlayer() {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  useEffect(() => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (userVideo.current && callAccepted && call.signal) {
      userVideo.current.srcObject = call.stream; // Ensure this is correct
    }
  }, [callAccepted, call]);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      {stream && (
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {name || "Your Video"}
            </Typography>
            <Box
              component="video"
              playsInline
              muted
              ref={myVideo}
              autoPlay
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                border: "2px solid #1976d2",
              }}
            />
          </Paper>
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {call.name || "Call Video"}
            </Typography>
            <Box
              component="video"
              playsInline
              ref={userVideo}
              autoPlay
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                border: "2px solid #1976d2",
              }}
            />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
