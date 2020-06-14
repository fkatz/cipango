/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { wordTypes } from "../models/word";
import { useSelector } from "react-redux";
import { RootState } from "../store/actions";

const Filters = ({
  filters,
  setFilters,
  ...restProps
}: {
  filters: { types?: string[]; tags?: string[] };
  setFilters: React.Dispatch<
    React.SetStateAction<{ types?: string[]; tags?: string[] }>
  >;
}) => {
  const words = useSelector((state: RootState) => state.words);

  let tags = {} as { [key: string]: boolean };
  words.forEach(
    (word) => word.tags && word.tags.forEach((tag) => (tags[tag] = true))
  );
  const toggleFilter = (element: string, key: "types" | "tags") => {
    setFilters((filters) => {
      let elements = filters[key];
      if (!filters[key]) {
        elements = [element];
      } else if (!filters[key]!.includes(element)) {
        elements = [...filters[key]!, element];
      } else {
        elements = filters[key]!.filter(
          (elementInside) => elementInside !== element
        );
      }
      return { ...filters, [key]: elements };
    });
  };
  const resetFilterTags = () => {
    setFilters((filters) => ({ ...filters, tags: [] }));
  };
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: ["1fr", "max-content auto"],
        gridTemplateRows: ["1fr", "1fr 1fr"],
        alignItems: "center",
        columnGap: "20px",
        rowGap: "10px",
      }}
      {...restProps}
    >
      <span>Filter by word type</span>
      <div>
        {wordTypes.map((type) => (
          <button
            key={type}
            sx={{
              py: "12px",
              mr: "10px",
              mb: "5px",
              backgroundColor:
                filters.types && filters.types.includes(type)
                  ? "active"
                  : "muted",
            }}
            onClick={() => toggleFilter(type, "types")}
          >
            {type}
          </button>
        ))}
      </div>
      <span>Filter by tags</span>
      <div>
        {Object.keys(tags).length === 0 && (
          <span sx={{ fontStyle: "italic", color: "muted" }}>
            Add tags to your words to use them as filters
          </span>
        )}
        {Object.keys(tags)
          .sort((a, b) => a.localeCompare(b))
          .map((tag) => (
            <button
              key={tag}
              sx={{
                py: "12px",
                mr: "10px",
                mb: "5px",
                backgroundColor:
                  filters.tags && filters.tags.includes(tag)
                    ? "active"
                    : "muted",
              }}
              onClick={() => toggleFilter(tag, "tags")}
            >
              {tag}
            </button>
          ))}
        {filters.tags && filters.tags.length > 0 && (
          <button
            sx={{
              py: "12px",
              mr: "10px",
              mb: "5px",
              backgroundColor: "primary",
            }}
            onClick={() => resetFilterTags()}
          >
            Clear Tags
          </button>
        )}
      </div>
    </div>
  );
};
export default Filters;
