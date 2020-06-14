/** @jsx jsx */
import { jsx } from "theme-ui";

const ProgressBar = ({
  good,
  bad,
  total,
  ...restProps
}: {
  good: number;
  bad: number;
  total: number;
}) => {
  return (
    <div
      sx={{
        padding: "2px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
      {...restProps}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "20px",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          sx={{
            backgroundColor: "error",
            width: `${(bad / total) * 100}%`,
            height: "100%",
            transition: "0.5s",
          }}
        ></div>
        <div
          sx={{
            backgroundColor: "success",
            width: `${(good / total) * 100}%`,
            height: "100%",
            transition: "0.5s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
