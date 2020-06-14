/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { ReactComponent as Logo } from "../images/logo.svg";

const Toolbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div
        sx={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          borderBottom: "1px solid #ccc",
          px: "10px",
          py: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          minHeight: "72px",
        }}
      >
        <div></div>
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "25px",
          }}
        >
          <Logo sx={{ height: "20px" }} />
        </div>
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Toolbar;
