import React from "react";
import AutoComplete from "./components/AutoComplete";
import useCachedata from "./hooks/useCachedata";

const staticData = [
  {
    id: 1,
    name: "apple",
  },
  {
    id: 2,
    name: "banana",
  },
  {
    id: 3,
    name: "orange",
  },
  {
    id: 4,
    name: "pineapple",
  },
  {
    id: 5,
    name: "grapes",
  },
  {
    id: 6,
    name: "mango",
  },
  {
    id: 7,
    name: "papaya",
  },
  {
    id: 8,
    name: "watermelon",
  },
];

function App() {
  const { hashMap, addToCache } = useCachedata();

  const fetchSuggestions = async (query) => {
    if (hashMap[query]) {
      return hashMap[query];
    }
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if (!data.ok) {
      throw new Error(data.statusText, "Network response was not ok");
    }
    const json = await data.json();
    const result = json.recipes.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log(result);
    addToCache(query, result);
    return result;
  };

  return (
    <div className="pt-4 flex justify-center flex-col gap-3 items-center">
      <h1 className="text-3xl font-bold">Autocomplete / Typeahead</h1>
      <AutoComplete
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        placeHolder="Enter Recipe"
        onChange={(input) => {}}
        onSelect={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        customStyle={{}}
        dataKey="name"
        customLoading={<>Loading Recipes...</>}
      />
    </div>
  );
}

export default App;
