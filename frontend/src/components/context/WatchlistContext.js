import { createContext, useReducer } from "react";

export const WatchlistContext = createContext();

export const watchReducer = (state, action) => {
    console.log(action.type);
    console.log("state:",state.watch.map((e)=>{console.log(e.id===action.payload.id)}))
  switch (action.type) {
    case "SET_WATCH":
      return {
        watch: action.payload,
      };
    case "ADD_WATCH":
      return {
        
        watch: [action.payload, ...state.watch],
      };
    case "REMOVIE_WATCH":
      return  {
        watch: state.watch.filter(w=> w.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const WatchlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchReducer, {
    watch: [],
  });
  return <WatchlistContext.Provider value={{...state,dispatch}}>{children}</WatchlistContext.Provider>;
};
