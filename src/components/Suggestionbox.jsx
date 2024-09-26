import React from "react";

const Suggestionbox = (props) => {
  const {
    suggestions = [],
    onSuggestionSelect = () => {},
    highlightText,
    dataKey,
  } = props;

  const getHighlightText = (suggestion, highlightText) => {
    const parts = suggestion.split(new RegExp(`(${highlightText})`, "gi"));
    return (
      <>
        {parts.map((part, index) => {
          if (part.toLowerCase() === highlightText.toLowerCase())
            return <mark key={index}>{part}</mark>;
          return part;
        })}
      </>
    );
  };
  return (
    <ul className="border border-gray-900 bg-white w-full border-t-0 h-64 overflow-y-scroll">
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            onClick={() => onSuggestionSelect(suggestion)}
            className="py-2 px-4 hover:bg-slate-300 hover:cursor-pointer"
          >
            {getHighlightText(currSuggestion, highlightText)}
          </li>
        );
      })}
    </ul>
  );
};

export default Suggestionbox;
