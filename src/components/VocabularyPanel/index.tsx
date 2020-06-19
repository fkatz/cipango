/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import EditModal from "./EditModal";
import VocabularyBar from "./VocabularyBar";
import CardList from "./CardList";
import CarDetailModal from "./CardDetailModal";

const VocabularyPanel = () => {
  return (
    <React.Fragment>
      <EditModal />
      <CarDetailModal />
      <VocabularyBar />
      <CardList />
    </React.Fragment>
  );
};
export default VocabularyPanel;
