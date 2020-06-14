/** @jsx jsx */
import { jsx } from "theme-ui";
import { ReactComponent as EnterIcon } from "../../images/enter.svg";
import Word from "../../models/word";
import React from "react";
import { useStore } from "react-redux";
import Actions from "../../store/actions";

const UploadButton = ({ words }: { words: Word[] }) => {
  const store = useStore();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        try {
          if (fileReader.result) {
            const words = JSON.parse(fileReader.result as string);
            store.dispatch(Actions.importWords(words));
          } else throw new Error();
        } catch {
          console.error("Invalid file");
        }
        fileInputRef.current!.value = "";
      };
      fileReader.readAsText(file);
    }
  };
  const handleClick = () => fileInputRef.current?.click();
  const fileInputRef = React.useRef(null as null | HTMLInputElement);
  return (
    <div onClick={handleClick}>
      <input
        ref={fileInputRef}
        onChange={handleFile}
        type="file"
        sx={{ display: "none" }}
      />
      <EnterIcon
        sx={{
          height: "25px",
          width: "25px",
          mr: "15px",
          transition: "0.2s",
          opacity: 0.6,

          ":hover": { opacity: 1 },
        }}
      />
    </div>
  );
};

export default UploadButton;
