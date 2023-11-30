import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

export const useWatchContext = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    console.log('ERROR IN CONTEXT USE');
  }
  return context;
};
