/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

const NavbarIcon = ({
  iconFunction,
  title,
  view,
  activeView,
  setActiveView,
}: {
  iconFunction: React.FunctionComponent;
  title: string;
  view: string;
  activeView?: string;
  setActiveView: React.Dispatch<string>;
}) => {
  const IconFunction = iconFunction;
  return (
    <div
      onClick={() => setActiveView(view)}
      sx={{
        userSelect: "none",
        width: ["80px", "80px", "50px"],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: view === activeView ? "active" : "muted",
        transition: "0.2s",
        ":hover": {
          color: view === activeView ? "active" : "primary",
        },
        borderRight: ["1px solid #ccc", "1px solid #ccc", 0],
        borderBottom: [0, 0, "1px solid #ccc"],
        m: ["10px", "10px", 0],
        mr: 0,
        p: [0, 0, "10px"],
        py: [0, 0, "20px"],
        pr: ["10px"],
        ":last-of-type": {
          borderRight: 0,
          borderBottom: 0,
        },
      }}
    >
      <IconFunction
        sx={{
          height: "20px",
          width: "20px",
          path: {
            fill: view === activeView ? "active" : "muted",
            transition: "0.2s",
          },
          "*:hover>&": {
            path: {
              fill: view === activeView ? "active" : "primary",
            },
          },
        }}
      />
      <div sx={{ mt: 2, fontSize: "12px" }}>{title}</div>
    </div>
  );
};

export default NavbarIcon;
