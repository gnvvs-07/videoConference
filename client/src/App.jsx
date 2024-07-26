import React from "react";
import { Typography, AppBar, Toolbar } from "@mui/material";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Video
          </Typography>
        </Toolbar>
      </AppBar>
      {/* video player */}
      <VideoPlayer />
      {/* options */}
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}
