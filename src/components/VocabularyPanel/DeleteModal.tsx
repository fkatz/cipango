/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Modal from "../Modal";
import { useStore } from "react-redux";
import Action from "../../store/actions";

const DeleteModal = () => {
  const {
    deleteModalOpen,
    setDeleteModalOpen,
    setDetailModalOpen,
    setEditModalOpen,
    selectedWord,
  } = React.useContext(VocabularyContext);
  const store = useStore();
  const deleteWord = () => {
    if (selectedWord) store.dispatch(Action.removeWord(selectedWord));
  };
  return (
    <Modal
      visible={deleteModalOpen}
      setVisible={setDeleteModalOpen}
      title={"Delete word"}
      sx={{ maxWidth: [null, 500] }}
    >
      {selectedWord && (
        <div sx={{ my: "15px" }}>
          Are you sure you want to delete the word "{selectedWord.word}"?
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              mt: "15px",
            }}
          >
            <button
              onClick={() => {
                deleteWord();
                setDeleteModalOpen(false);
                setDetailModalOpen(false);
                setEditModalOpen(false);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              sx={{ ml: "10px" }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default DeleteModal;
