/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: ["row", "row", "column"],
        justifyContent: ["center", "center", "flex-start"],
        px: [0, 0, "20px"],
        borderTop: ["1px solid #ccc", "1px solid #ccc", 0],
        borderRight: [0, 0, "1px solid #ccc"],
      }}
    >
      {children}
    </div>
  );
};

export default Navbar;
