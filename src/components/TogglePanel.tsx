/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

const TogglePanel = ({
  children,
  show,
  dependencies,
}: {
  children: React.ReactNode;
  show: boolean;
  dependencies: any[];
}) => {
  const [height, setHeight] = React.useState(10000);
  const panelRef = React.useRef(null as null | HTMLDivElement);
  const updateHeight = () =>
    panelRef.current && setHeight(panelRef.current.clientHeight);
  React.useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  React.useEffect(() => {
    updateHeight();
  }, [panelRef, dependencies]);
  return (
    <React.Fragment>
      <div
        sx={{
          position: "relative",
          zIndex: -1,
          width: "100%",
        }}
      >
        <div
          sx={{
            position: "absolute",
            width: "100%",
            zIndex: -2,
            pointerEvents: show ? "all" : "none",
            top: show ? 0 : "-100px",
            opacity: show ? 1 : 0,
            transition: "0.5s",
            borderBottom: "1px solid #ccc",
            background: "white",
          }}
          ref={panelRef}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};
export default TogglePanel;
