/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { ReactComponent as Logo } from "../images/logo.svg";

const Toolbar = ({
  children,
  panels,
}: {
  children?: React.ReactNode;
  panels?: React.ReactNode;
}) => {
  return (
    <div sx={{ position: "sticky", top: 0, zIndex: 1 }}>
      <div
        sx={{
          position: "relative",
          zIndex: 2,
          borderBottom: "1px solid #ccc",
          px: "10px",
          py: "20px",
          display: "grid",
          gridTemplateColumns: ["1fr 1fr", "1fr 1fr 1fr"],
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          minHeight: "72px",
        }}
      >
        <div sx={{ display: ["none", "block"] }}></div>
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: ["flex-start", "center"],
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
            mr: ["0px", "10px"],
          }}
        >
          {children}
        </div>
      </div>
      <div>{panels}</div>
    </div>
  );
};
export default Toolbar;
