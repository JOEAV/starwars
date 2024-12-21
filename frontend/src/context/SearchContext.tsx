import React, { createContext, useState, useContext } from "react";
import {Person} from '../utils/PersonValidation.ts'
interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  searchResults: SearchResults;
  setSearchResults:   React.Dispatch<React.SetStateAction<SearchResults>>;
}
interface SearchResults {
  people: Person[];
}
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default function SearchProvider({ children} : { children: React.ReactNode }){
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    people: [],
  });
  return (
    <SearchContext.Provider value={{ query, setQuery, searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
