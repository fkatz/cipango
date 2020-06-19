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

const VocabularyBar = () => {
  const words = useSelector((state: RootState) => state.words);
  const [showFilters, setShowFilters] = React.useState({
    init: false,
    show: false,
  });
  const [height, setHeight] = React.useState(0);
  const filtersRef = React.useRef(null as null | HTMLDivElement);
  const updateHeight = () =>
    filtersRef.current && setHeight(filtersRef.current.clientHeight);
  React.useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  const { filters, setFilters } = React.useContext(VocabularyContext);
  React.useEffect(() => {
    updateHeight();
  }, [filtersRef, filters, words]);
  const renderIcon = (
    Icon: React.FunctionComponent,
    action: () => any,
    style?: any
  ) => {
    return (
      <div onClick={action}>
        <Icon
          sx={{
            height: "25px",
            width: "25px",
            mr: "15px",
            transition: "0.2s",
            opacity: 0.6,

            ":hover": { opacity: 1 },
            ...style,
          }}
        />
      </div>
    );
  };
  const buttons: [React.FunctionComponent, () => any, any?][] = [
    [
      FilterIcon,
      () => {
        setShowFilters((showFilters) => {
          if (showFilters.show) setFilters({ tags: [], types: [] });
          return { init: true, show: !showFilters.show };
        });
      },
      {
        path: {
          fill: showFilters.show ? "active" : "primary",
          transition: "0.2s",
        },
      },
    ],
  ];
  React.useEffect(() => {
    if (
      (filters.tags && filters.tags.length > 0) ||
      (filters.types && filters.types.length > 0)
    ) {
      setShowFilters((filters) => ({ init: true, show: true }));
    }
  }, [filters]);
  return (
    <React.Fragment>
      <Toolbar>
        <div sx={{ display: "flex" }}>
          {buttons.map((button, index) => (
            <React.Fragment key={index}>{renderIcon(...button)}</React.Fragment>
          ))}
          <DownloadButton words={words} />
          <UploadButton words={words} />
        </div>
      </Toolbar>
      <div
        ref={filtersRef}
        sx={{
          mt: showFilters.show ? 0 : -height,
          display: showFilters.init ? "block" : "none",
          /*...(showFilters.show
            ? {
                transition: "1s",
              }
            : { animation: "1s closeFilters" }),
          "@keyframes closeFilters": {
            from: { mt: 0 },
            to: { mt: -height },
          },*/
        }}
      >
        <Filters
          filters={filters}
          setFilters={setFilters}
          sx={{
            borderBottom: "1px solid #ccc",
            px: ["10px", "10px", "30px"],
            py: ["20px", "20px", "30px"],
          }}
        />
      </div>
    </React.Fragment>
  );
};
export default VocabularyBar;
