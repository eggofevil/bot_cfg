import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Main from "./Main";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
