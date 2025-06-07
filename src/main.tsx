import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        primaryColor: "grape",
        defaultRadius: "md",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BrowserRouter>
        <Notifications
          position="top-right"
          zIndex={2077}
          limit={3}
          styles={{
            root: { maxWidth: 400, width: 400, fontSize: 14, padding: 20 },
            notification: {
              minHeight: 36,
              padding: "20px 12px",
              paddingLeft: 32,
            },
          }}
        />
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
