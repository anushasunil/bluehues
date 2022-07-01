import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "../src/contexts/login-context"
import { SignupContextProvider } from "../src/contexts/signup-context"

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <SignupContextProvider>
          <App/>
        </SignupContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);