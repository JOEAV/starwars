import React from "react";
import { ComboboxItem, ComboboxLikeRenderOptionInput } from "@mantine/core";
import classes from "./mainPage.module.css";

interface SearchResultItemProps {
  item: ComboboxLikeRenderOptionInput<ComboboxItem>; // Adjust type to match Mantine
}

//Todo: suppport category prop so we can inject icons per category
// const categoryIcons: Record<string, string> = {
//   people: "👤",
//   planets: "🪐",
//   films: "🎥",
//   species: "🐾",
//   vehicles: "🚗",
//   starships: "🚀",
// };

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  const isViewAll = item.option.value.startsWith("viewAll-");

  return (
    <div className={classes.optionWrapper}>
      {
        //TODO: when icon is supported uncomment this
        /* {!isViewAll && (
        <span className={classes.avatar}>
            
        </span>
      )} */
      }
      <span style={{ color: isViewAll ? "blue" : "inherit" }}>
        {item.option.label}
      </span>
    </div>
  );
};

export default SearchResultItem;
