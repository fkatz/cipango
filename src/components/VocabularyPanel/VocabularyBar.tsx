/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { VocabularyContext } from "../../contexts/VocabularyContext";
import Toolbar from "../Toolbar";
import { ReactComponent as FilterIcon } from "../../images/funnel.svg";
import Filters from "../Filters";
import { useSelector } from "react-redux";
import { RootState } from "../../store/actions";
import DownloadButton from "./DownloadButton";
import UploadButton from "./UploadButton";
import Icon from "../Icon";
import TogglePanel from "../TogglePanel";

const VocabularyBar = () => {
  const words = useSelector((state: RootState) => state.words);
  const [showFilters, setShowFilters] = React.useState(false);
  const { filters, setFilters } = React.useContext(VocabularyContext);
  return (
    <React.Fragment>
      <Toolbar>
        <div sx={{ display: "flex" }}>
          <Icon
            onClick={() => setShowFilters((showFilters) => !showFilters)}
            iconComponent={FilterIcon}
            active={showFilters}
          />
          <DownloadButton words={words} />
          <UploadButton words={words} />
        </div>
      </Toolbar>
      <TogglePanel show={showFilters} dependencies={[words, filters]}>
        <Filters
          filters={filters}
          setFilters={setFilters}
          sx={{
            borderBottom: "1px solid #ccc",
            px: ["10px", "10px", "30px"],
            py: ["20px", "20px", "30px"],
          }}
        />
      </TogglePanel>
    </React.Fragment>
  );
};
export default VocabularyBar;
