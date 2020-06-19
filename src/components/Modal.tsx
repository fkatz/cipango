/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as CrossIcon } from "../images/cross.svg";

const Modal = ({
  title,
  children,
  visible,
  setVisible,
  icons,
  ...restProps
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  icons?: React.ReactNode;
}) => {
  return ReactDOM.createPortal(
    <div
      sx={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        p: [0, "10px"],
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition: visible ? "0.5s" : "0.3s ease-out",
      }}
    >
      <div
        sx={{
          width: "100%",
          height: ["100%", "auto"],
          maxHeight: "100%",
          p: "20px",
          background: "#fff",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.43)",
          transform: `scale(${visible ? 1 : 0.8})`,
          transition: visible ? "0.5s" : "0.3s ease-out",
          borderRadius: "2px",
          display: "flex",
          flexDirection: "column",
        }}
        {...restProps}
      >
        <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: "20px",
            py: "15px",
            mb: "0px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h3 sx={{ my: 0 }}>{title || ""}</h3>
          <span
            sx={{
              span: { opacity: 0.6, transition: "0.5s" },
              "span:hover": { opacity: 1 },
            }}
          >
            {icons}
            <span
              {...(visible && {
                onClick: () => {
                  setVisible(false);
                },
              })}
            >
              <CrossIcon sx={{ width: "25px", height: "25px" }} />
            </span>
          </span>
        </div>

        <div
          sx={{
            width: "100%",
            overflowY: "auto",
            px: "20px",
            flexGrow: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
