/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Modal from "../Modal";

const CarDetailModal = () => {
  const {
    detailModalOpen,
    setDetailModalOpen,
    selectedWord,
  } = React.useContext(VocabularyContext);
  return (
    <Modal
      visible={detailModalOpen}
      setVisible={setDetailModalOpen}
      title={
        selectedWord ? (
          <React.Fragment>
            {selectedWord.word}{" "}
            <span sx={{ fontWeight: 400 }}>( {selectedWord.hiragana} )</span>
          </React.Fragment>
        ) : (
          ""
        )
      }
      sx={{ maxWidth: [null, 500] }}
    >
      {selectedWord && <span>({selectedWord.hiragana})</span>}
    </Modal>
  );
};
export default CarDetailModal;
