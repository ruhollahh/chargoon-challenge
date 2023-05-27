import { NodeType } from "../types";

const deepCopySerializableObject = <T extends object>(object: T): T => {
  return JSON.parse(JSON.stringify(object));
};

const getNodeOrigin = (nodes: NodeType[], node: NodeType) => {
  const hierarchy = node.hierarchy;
  let currentNodeList = nodes;
  for (let i = 0; i < hierarchy.length - 1; ++i) {
    const parentKey = hierarchy[i];
    const parentIndex = currentNodeList.findIndex((n) => n.key === parentKey);
    if (parentIndex !== -1) {
      currentNodeList = currentNodeList[parentIndex].children;
    }
  }
  return currentNodeList;
};

const getNode = (nodes: NodeType[], node: NodeType) => {
  const origin = getNodeOrigin(nodes, node);
  const nodeIndex = origin.findIndex((n) => n.key === node.key);
  return origin[nodeIndex];
};

export const removeTreeNode = (nodes: NodeType[], node: NodeType) => {
  const newTree = deepCopySerializableObject(nodes);
  const origin = getNodeOrigin(newTree, node);
  const nodeIndex = origin.findIndex((n) => n.key === node.key);
  if (nodeIndex !== -1) {
    origin.splice(nodeIndex, 1);
  }
  return newTree;
};

export const pasteToNode = (
  nodes: NodeType[],
  srcNode: NodeType,
  distNode: NodeType
) => {
  const newTree = deepCopySerializableObject(nodes);
  const newSrcNode = deepCopySerializableObject(srcNode);
  let newSrcNodeHierarchy;
  if (distNode.hierarchy.length === 0) {
    newSrcNodeHierarchy = [distNode.key, newSrcNode.key];
  } else {
    newSrcNodeHierarchy = [...distNode.hierarchy, newSrcNode.key];
  }
  newSrcNode.hierarchy = newSrcNodeHierarchy;
  const distNodeFromTree = getNode(newTree, distNode);
  distNodeFromTree.children.push(newSrcNode);
  return newTree;
};

export const addNewNode = (
  nodes: NodeType[],
  draftNode: Partial<NodeType>,
  parentNode: NodeType
) => {
  const newTree = deepCopySerializableObject(nodes);
  let newNodeHierarchy;
  if (parentNode.hierarchy.length === 0) {
    newNodeHierarchy = [parentNode.key, draftNode.key];
  } else {
    newNodeHierarchy = [...parentNode.hierarchy, draftNode.key];
  }
  const newNode = {
    ...draftNode,
    hierarchy: newNodeHierarchy,
    parentKey: parentNode.key,
    children: [],
  } as NodeType;
  const parentNodeFromTree = getNode(newTree, parentNode);
  parentNodeFromTree.children.push(newNode);
  return newTree;
};

export type ParentTreeType = {
  node: NodeType;
  child?: ParentTreeType;
};

export const getParentTree = (
  nodes: NodeType[],
  node: NodeType
): ParentTreeType => {
  if (node.hierarchy.length === 0) {
    return { node };
  }
  let parentTree: ParentTreeType = { node: null };
  let currentBranch = parentTree;
  let currentNodeList = nodes;
  for (let i = 0; i < node.hierarchy.length; ++i) {
    const parentKey = node.hierarchy[i];
    const parentIndex = currentNodeList.findIndex((n) => n.key === parentKey);
    if (parentIndex !== -1) {
      currentBranch.node = currentNodeList[parentIndex];
      if (i < node.hierarchy.length - 1) {
        currentBranch.child = { node: null };
        currentBranch = currentBranch.child;
      }
      currentNodeList = currentNodeList[parentIndex].children;
    }
  }
  return parentTree;
};

export const searchTree = (
  nodes: NodeType[],
  nodeTitle: NodeType["title"],
  matches: NodeType[] = []
) => {
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (node.title.includes(nodeTitle)) {
      matches.push(node);
    }
    if (node.children.length === 0) {
      continue;
    } else {
      searchTree(node.children, nodeTitle, matches);
    }
  }
  return matches;
};
