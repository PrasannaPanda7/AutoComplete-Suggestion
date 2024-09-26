import { useRef } from "react";

const useCachedata = () => {
  let hashMap = useRef({});
  const addToCache = (key, value) => {
    hashMap.current[key] = value;
  };

  return { hashMap: hashMap.current, addToCache };
};

export default useCachedata;
