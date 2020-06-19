/** @jsx jsx */
import { jsx } from "theme-ui";
import { ReactComponent as ExitIcon } from "../../images/exit.svg";
import Word from "../../models/word";
import Icon from "../Icon";

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
    <Icon
      iconComponent={ExitIcon}
      onClick={downloadJSON}
      sx={{ mr: "9.5px" }}
    />
  );
};

export default DownloadButton;
