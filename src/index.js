import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "../src/contexts/login/login-context"
import { SignupContextProvider } from "../src/contexts/signup/signup-context"
import { NoteContextProvider } from "./contexts/note/note-context"

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <LoginContextProvider>
          <SignupContextProvider>
          <NoteContextProvider>
            <App/>
            </NoteContextProvider>
          </SignupContextProvider>
        </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);