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
          height: show ? height : 0,
          transition: "0.5s",
        }}
      >
        <div
          ref={panelRef}
          sx={{
            position: "relative",
            top: show ? 0 : -height,
            transition: "0.5s",
          }}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};
export default TogglePanel;
