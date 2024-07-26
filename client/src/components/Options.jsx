import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { SocketContext } from "../SocketContext";
import { useContext, useState } from "react";

export default function Options({ children }) {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Your Details
              </Typography>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="idToCall"
                label="ID to Call"
                variant="outlined"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => callUser(idToCall)}
                disabled={callAccepted || callEnded}
                fullWidth
              >
                Call
              </Button>
              {callAccepted && !callEnded && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={leaveCall}
                  fullWidth
                  startIcon={<PhoneDisabled fontSize="large" />}
                >
                  Hang Up
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}
