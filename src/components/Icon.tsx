/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
const Icon = ({
  children,
  iconComponent,
  onClick,
  active,
  ...restProps
}: {
  children?: React.ReactNode;
  iconComponent: React.FunctionComponent;
  onClick: () => any;
  active?: boolean;
}) => {
  const IconComponent = iconComponent;
  return (
    <div
      onClick={onClick}
      sx={{ mr: "15px", ":last-of-type": { mr: "0px" } }}
      {...restProps}
    >
      <IconComponent
        sx={{
          height: "25px",
          width: "25px",
          path: {
            fill: active ? "active" : "primary",
            opacity: 0.6,
            transition: "0.2s",
          },
          ":hover path": {
            opacity: 1,
          },
        }}
      />
      {children}
    </div>
  );
};

export default Icon;
