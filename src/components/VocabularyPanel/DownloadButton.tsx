/** @jsx jsx */
import { jsx } from "theme-ui";
import { ReactComponent as ExitIcon } from "../../images/exit.svg";
import Word from "../../models/word";

const DownloadButton = ({ words }: { words: Word[] }) => {
  const downloadJSON = () => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    var file = new Blob([JSON.stringify(words)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "cipango.json";
    a.click();
  };
  return (
    <div onClick={downloadJSON}>
      <ExitIcon
        sx={{
          height: "25px",
          width: "25px",
          mr: "9.5px",
          transition: "0.2s",
          opacity: 0.6,

          ":hover": { opacity: 1 },
        }}
      />
    </div>
  );
};

export default DownloadButton;
