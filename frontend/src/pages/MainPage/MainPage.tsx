import React, { useState, useEffect, useMemo } from "react";
import { Select, Loader, Text, Stack, Title, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSearchAutocomplete } from "../../hooks/useSearchAutocomplete.ts";
import { useSearchContext } from "../../context/SearchContext.tsx";
import classes from "./mainPage.module.css";
import SearchResultItem from "./SearchResultItem.tsx";
interface GroupedData {
  group: string;
  items: { value: string; label: string }[];
}

function useDebounce<T>(value: T, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedVal;
}

export default function SearchPage() {
  const { query, setQuery } = useSearchContext();
  const debouncedQuery = useDebounce(query, 300);
  const maxResultsPerCategory = 3;

  const {
    data: categoriesData = [],
    loading,
    error,
    emptyResults = false,
  } = useSearchAutocomplete(debouncedQuery, maxResultsPerCategory);

  const navigate = useNavigate();

  const updatedGroupedData: GroupedData[] = useMemo(() => {
    if (!categoriesData.length) {
      return [];
    }
    return categoriesData.map(({ categoryName, results, hasMore }) => {
      const items = results.map((itemName) => ({
        value: itemName,
        label: itemName,
      }));
      if (hasMore) {
        items.push({
          value: `viewAll-${categoryName}`,
          label: `View all ${categoryName}`,
        });
      }

      return {
        group: categoryName,
        items,
      };
    });
  }, [categoriesData]);

  const handleChange = (value: string | null) => {
    if (!value) return;
    if (value.startsWith("viewAll-")) {
      const categoryName = value.replace("viewAll-", "");
      navigate(`/${categoryName}`);
    } else {
      console.log("Selected item:", value);
    }
  };

  return (
    <Paper className={classes["page-wrapper"]} p="xl">
      <Stack gap="md" className={classes["search-wrapper"]}>
        <div>
          <Title order={2}>
            <strong>Star Wars</strong> Wikipedia
          </Title>
          <Text>The ultimate star wars search engine</Text>
        </div>

        <div>
          <Select
            comboboxProps={{ shadow: "md" }}
            label="May The Force be with you 🪐"
            variant="default"
            placeholder="Type something to start searching..."
            searchable
            onSearchChange={(value) => setQuery(value.trim())}
            onChange={handleChange}
            data={updatedGroupedData}
            nothingFoundMessage={
              loading
                ? "Loading results..."
                : error
                  ? `${error}`
                  : query && emptyResults
                    ? "No results found"
                    : ""
            }
            rightSection={loading ? <Loader size="xs" /> : null}
            maxDropdownHeight={300}
            clearable
            renderOption={(item) => <SearchResultItem item={item} />}
          />
        </div>
      </Stack>
    </Paper>
  );
}
