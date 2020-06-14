/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Modal from "../Modal";
import CardForm from "./CardForm";

const EditModal = () => {
  const { editModalOpen, setEditModalOpen, editingWord } = React.useContext(
    VocabularyContext
  );
  return (
    <Modal
      visible={editModalOpen}
      setVisible={setEditModalOpen}
      title={editingWord ? "Edit word" : "Add word"}
      sx={{ maxWidth: [null, 400] }}
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
