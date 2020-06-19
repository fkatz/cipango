/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Modal from "../Modal";
import { ReactComponent as PencilIcon } from "../../images/pencil.svg";
import { ReactComponent as TrashIcon } from "../../images/trash.svg";

const CarDetailModal = () => {
  const {
    detailModalOpen,
    setDetailModalOpen,
    setDeleteModalOpen,
    setEditModalOpen,
    selectedWord,
  } = React.useContext(VocabularyContext);
  const Row = ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div sx={{ borderBottom: "1px solid #ccc", width: "100%", py: "15px" }}>
      <span sx={{ fontWeight: 700 }}>{title}: </span>
      {children}
    </div>
  );
  return (
    <Modal
      visible={detailModalOpen}
      setVisible={setDetailModalOpen}
      title={
        selectedWord && (
          <React.Fragment>
            {selectedWord.word}{" "}
            <span sx={{ fontWeight: 400, fontFamily: "arial, sans-serif" }}>
              ( {selectedWord.hiragana} )
            </span>
          </React.Fragment>
        )
      }
      icons={
        <React.Fragment>
          <span onClick={() => setDeleteModalOpen(true)}>
            <TrashIcon sx={{ width: "20px", height: "20px", mr: "9px" }} />
          </span>
          <span onClick={() => setEditModalOpen(true)}>
            <PencilIcon sx={{ width: "20px", height: "20px", mr: "6px" }} />
          </span>
        </React.Fragment>
      }
      sx={{ maxWidth: [null, 500], minHeight: [null, 300] }}
    >
      {selectedWord && (
        <React.Fragment>
          <Row title="Romaji">{selectedWord.romaji}</Row>
          <Row title="Meaning">{selectedWord.meaning.join(", ")}</Row>
          <Row title="Type">{selectedWord.type.join(", ")}</Row>
          {selectedWord.tags && selectedWord.tags.length > 0 && (
            <Row title="Tags">{selectedWord.tags.join(", ")}</Row>
          )}
          {selectedWord.notes && <Row title="Notes">{selectedWord.notes}</Row>}
        </React.Fragment>
      )}
    </Modal>
  );
};
export default CarDetailModal;
