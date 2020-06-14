/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import EditModal from "./EditModal";
import VocabularyBar from "./VocabularyBar";
import CardList from "./CardList";

const VocabularyPanel = () => {
  return (
    <React.Fragment>
      <EditModal />
      <VocabularyBar />
      <CardList />
    </React.Fragment>
  );
};
export default VocabularyPanel;
