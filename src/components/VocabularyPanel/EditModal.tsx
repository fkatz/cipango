/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Modal from "../Modal";
import CardForm from "./CardForm";

const EditModal = () => {
  const { editModalOpen, setEditModalOpen, selectedWord } = React.useContext(
    VocabularyContext
  );
  return (
    <Modal
      visible={editModalOpen}
      setVisible={setEditModalOpen}
      title={selectedWord ? "Edit word" : "Add word"}
      sx={{ maxWidth: [null, 500] }}
    >
      <CardForm
        onSave={() => {
          setEditModalOpen(false);
        }}
      />
    </Modal>
  );
};
export default EditModal;
