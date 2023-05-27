import React, { useContext } from "react";
import { NodeType } from "./types";
import {
  TreeDataStoreType,
  initialTreeDataState,
} from "./Store/useTreeDataStore";

type AppContextType = TreeDataStoreType;

const defaultAppContext: AppContextType = undefined;

const AppContext = React.createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      `useAppContext must be used within the AppContext.Provider`
    );
  }
  return context;
};

export default AppContext;
