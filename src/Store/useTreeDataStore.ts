import { useCallback, useMemo, useReducer } from "react";
import { NodeType } from "../types";
import { addNewNode, pasteToNode, removeTreeNode } from "./helpers";

type SetInitialDataAction = {
  type: "SET_INITIAL_DATA";
  payload: {
    initialData: NodeType[];
  };
};

type RemoveNodeAction = {
  type: "REMOVE_NODE";
  payload: {
    node: NodeType;
  };
};

type StartAddNodeAction = {
  type: "START_ADD_NODE";
  payload: {
    parentNode: NodeType;
  };
};

type FinishAddNodeAction = {
  type: "FINISH_ADD_NODE";
  payload: {
    draftNode: Partial<NodeType>
  }
};

type EditNode = {
  type: "EDIT_NODE",
  payload: {
    node: NodeType
  }
}

type AddToClipboardAction = {
  type: "ADD_TO_CLIPBOARD";
  payload: {
    node: NodeType;
  };
};

type PasteFromClipboardAction = {
  type: "PASTE_FROM_CLIPBOARD";
  payload: {
    node: NodeType;
  };
};

type TreeDataActions =
  | SetInitialDataAction
  | RemoveNodeAction
  | AddToClipboardAction
  | PasteFromClipboardAction
  | StartAddNodeAction
  | FinishAddNodeAction
  | EditNode;

type TreeDataState = {
  entities: NodeType[];
  nodeInClipboard: NodeType | null;
  form: {
    mode: "add" | "edit"
    parentNode: NodeType | null;
    selectedNode: NodeType | null;
  }
};

export const initialTreeDataState: TreeDataState = {
  entities: [],
  nodeInClipboard: null,
  form: {
    mode: "edit",
    parentNode: null,
    selectedNode: null
  }
};

const treeDataReducer = (
  state: TreeDataState,
  action: TreeDataActions
): TreeDataState => {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return {
        ...initialTreeDataState,
        entities: action.payload.initialData,
      };
    case "REMOVE_NODE":
      return {
        ...state,
        entities: removeTreeNode(state.entities, action.payload.node),
      };
    case "START_ADD_NODE": 
      return {
        ...state,
        form: {
          mode: "add",
          parentNode: action.payload.parentNode,
          selectedNode: null
        }
      }
    case "FINISH_ADD_NODE":
      return {
        ...state,
        entities: addNewNode(state.entities, action.payload.draftNode, state.form.parentNode),
        form: {
          mode: "edit",
          parentNode: null,
          selectedNode: null,
        },
      }
    case "EDIT_NODE":
      return {
        ...state,
        form: {
          mode: "edit",
          selectedNode: action.payload.node,
          parentNode: null
        }
      }
    case "ADD_TO_CLIPBOARD":
      return {
        ...state,
        nodeInClipboard: action.payload.node,
      };
    case "PASTE_FROM_CLIPBOARD":
      if (state.nodeInClipboard) {
        const filteredTree = removeTreeNode(
          state.entities,
          state.nodeInClipboard
        );
        const newTree = pasteToNode(
          filteredTree,
          state.nodeInClipboard,
          action.payload.node
        );
        return {
          ...state,
          entities: newTree,
          nodeInClipboard: null,
        };
      }
      return state;
    default:
      return state;
  }
};

export const useTreeDataStore = () => {
  const [treeData, dispatch] = useReducer(
    treeDataReducer,
    initialTreeDataState
  );

  const setInitialData = useCallback((initialData: NodeType[]) => {
    dispatch({ type: "SET_INITIAL_DATA", payload: { initialData } });
  }, []);

  const removeTreeNode = useCallback((node: NodeType) => {
    dispatch({ type: "REMOVE_NODE", payload: { node } });
  }, []);

  const addToClipboard = useCallback((node: NodeType) => {
    dispatch({ type: "ADD_TO_CLIPBOARD", payload: { node } });
  }, []);

  const pasteFromClipboard = useCallback((node: NodeType) => {
    dispatch({ type: "PASTE_FROM_CLIPBOARD", payload: { node } });
  }, []);

  const startAddNode = useCallback((parentNode: NodeType) => {
    dispatch({ type: "START_ADD_NODE", payload: { parentNode } });
  }, []);

  const finishAddNode = useCallback((draftNode: Partial<NodeType>) => {
    dispatch({ type: "FINISH_ADD_NODE", payload: { draftNode } });
  }, []);

  const editNode = useCallback((node: NodeType) => {
    dispatch({ type: "EDIT_NODE", payload: { node } });
  }, []);

  const store = useMemo(() => {
    return {
      treeData,
      setInitialData,
      removeTreeNode,
      startAddNode,
      finishAddNode,
      addToClipboard,
      pasteFromClipboard,
      editNode
    };
  }, [
    treeData,
    setInitialData,
    removeTreeNode,
    startAddNode,
    finishAddNode,
    addToClipboard,
    pasteFromClipboard,
    editNode
  ]);

  return store;
};

export type TreeDataStoreType = ReturnType<typeof useTreeDataStore>;
