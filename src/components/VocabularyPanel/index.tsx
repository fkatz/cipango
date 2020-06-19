/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import EditModal from "./EditModal";
import VocabularyBar from "./VocabularyBar";
import CardList from "./CardList";
import CardDetailModal from "./CardDetailModal";
import DeleteModal from "./DeleteModal";

const VocabularyPanel = () => {
  return (
    <React.Fragment>
      <CardDetailModal />
      <EditModal />
      <DeleteModal />
      <VocabularyBar />
      <CardList />
    </React.Fragment>
  );
};
export default VocabularyPanel;
