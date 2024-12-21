import { useState, useEffect } from "react";
import { useSearchContext } from "../context/SearchContext.tsx";
interface SwapiTechItem {
  uid: string;
  properties: Record<string, any>;
  description: string;
}

interface SwapiTechResponse {
  message: string;
  result: SwapiTechItem[];
}

interface CategorySuggestion {
  categoryName: string;
  results: string[];
  hasMore: boolean; //if there is more then limit results
}
const BASE_URL = "https://swapi.tech/api";
const categories = [
  "people",
  "planets",
  "films",
  "species",
  "vehicles",
  "starships",
];


export function useSearchAutocomplete(query: string, limit: number) {
  const [autoCompletedata, setAutoCompleteData] = useState<CategorySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const {setSearchResults} = useSearchContext()

  //this should avoid the ui from showing
  //no results if the loading state is not synced
  const [emptyResults, setEmptyResults] = useState(false);
  const [error, setError] = useState<string | null>(null);


  async function fetchCategory(
    category: string,
    query: string,
  ): Promise<string[]> {
    if (!query) return [];
  
    // Adjust query parameter based on category
    const queryParam = category === "films" ? "title" : "name";
    const url = `${BASE_URL}/${category}?${queryParam}=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        // Throw an error if the response is not OK
        throw new Error(`Failed to fetch ${category}: ${response.statusText}`);
      }
  
      const data: SwapiTechResponse = await response.json();
  
      if (data.message !== "ok" || !data.result) {
        // Throw an error if the API response is invalid
        throw new Error(`Invalid response for ${category}`);
      }
  
      //currently we only save in context People search results
      if(category === 'people'){
        console.log(data.result)
        const peopleData = data.result.map(res=>({
            id:res.uid,
            name:res.properties.name,
            height:res.properties.height,
            mass:res.properties.mass,
            hair_color:res.properties.hair_color,
            skin_color:res.properties.skin_color,
            eye_color:res.properties.eye_color,
            gender:res.properties.gender,
            birth_year:res.properties.birth_year,
        }))
          setSearchResults({
            people:peopleData
          })
      }
      return data.result
        .map((item) => {
          const name = item.properties.name || item.properties.title;
          return name ?? null;
        })
        .filter((item): item is string => Boolean(item));
    } catch (error) {
      throw new Error(`Error fetching one or more categories : ${error.message}`);
    }
  }

  useEffect(() => {
    let active = true;

    async function fetchData() {
      if (!query) {
        setEmptyResults(false)
        setAutoCompleteData([]);
        setSearchResults({
            people: [],
        });
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const promises = categories.map((cat) => fetchCategory(cat, query));
        const results = await Promise.all(promises);

        if (!results.some((res) => res.length > 0)) {
          setEmptyResults(true);
        }
        const categoryData = categories.map((category, index) => ({
          categoryName: category,
          results: results[index]?.slice(0, limit) || [],
          hasMore: results[index]?.length > limit,
        }));

        if (active) {
            setAutoCompleteData(categoryData);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, [query, limit]);

  return { data:autoCompletedata, loading, emptyResults, error };
}
