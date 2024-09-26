import React, { useEffect, useState } from "react";
import Suggestionbox from "./Suggestionbox";

const AutoComplete = (props) => {
  const {
    staticData,
    fetchSuggestions,
    placeHolder = "",
    onChange = () => {},
    onSelect = () => {},
    onBlur = () => {},
    onFocus = () => {},
    customStyle = {},
    dataKey = "",
    customLoading = <>Loading...</>,
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setIsLoading(true);
    try {
      let resultData = [];
      if (staticData) {
        resultData = staticData.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
      } else if (typeof fetchSuggestions === "function") {
        resultData = await fetchSuggestions(query);
      }
      setSuggestions(resultData);
    } catch (err) {
      setError("Failed to get the suggestions");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    let timeoutId;
    if (inputValue) {
      timeoutId = setTimeout(() => {
        getSuggestions(inputValue);
      }, 300);
    } else {
      setSuggestions([]);
    }
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div>
      <input
        className="w-full p-4 border border-gray-300 rounded-md"
        type="text"
        placeholder={placeHolder}
        style={customStyle}
        onBlur={onBlur}
        onFocus={onFocus}
        value={inputValue}
        onChange={handleInputChange}
      />
      {isLoading && (
        <div className="text-left text-gray-700 text-sm">{customLoading}</div>
      )}
      {error && <div className="text-left text-red-700 text-sm">{error}</div>}
      {suggestions.length > 0 && (
        <Suggestionbox
          dataKey={dataKey}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          highlightText={inputValue}
        />
      )}
    </div>
  );
};

export default AutoComplete;
