/** @jsx jsx */
import { jsx } from "theme-ui";
import { VocabularyContextProvider } from "../contexts/VocabularyContext";
import { StoreProvider } from "../store/StoreProvider";
import VocabularyPanel from "../components/VocabularyPanel";

const VocabularyView = () => {
  return (
    <VocabularyContextProvider>
      <StoreProvider>
        <VocabularyPanel />
      </StoreProvider>
    </VocabularyContextProvider>
  );
};

export default VocabularyView;
