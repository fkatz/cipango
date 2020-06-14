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
  ...restProps
}: {
  title: string;
  children?: React.ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
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
          overflowY: "auto",
          borderRadius: "2px",
        }}
        {...restProps}
      >
        <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "20px",
            py: "15px",
            mb: "0px",
          }}
        >
          <h3 sx={{ my: 0 }}>{title || ""}</h3>
          <span
            sx={{
              opacity: 0.6,
              transition: "0.5s",
              ":hover": { opacity: 1 },
            }}
            {...(visible && {
              onClick: () => {
                setVisible(false);
              },
            })}
          >
            <CrossIcon
              sx={{
                path: {
                  fill: "#000",
                  stroke: "#000",
                  strokeWidth: "1px",
                },
              }}
            />
          </span>
        </div>

        <div
          sx={{
            width: "100%",
            overflow: "auto",
            px: "20px",
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