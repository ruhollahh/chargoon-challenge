import { Input, Tree } from "antd";
import React, { useRef, useState } from "react";
import { useAppContext } from "../../appContext";
import { NodeType } from "../../types";
import Node from "./node";
import SearchResult from "./searchResult";
import { searchTree } from "../../Store/helpers";

const { Search } = Input;

const TreeExtended = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const searchedKeyword = useRef<string>("");
  const [searchResultVisible, setSearchResultVisible] = useState(true);
  const { treeData, editNode } = useAppContext();
  const [searchResult, setSearchResult] = useState<NodeType[]>([]);

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchedKeyword.current = e.target.value;
  };

  const handlePressEnter = () => {
    setSearchResult(searchTree(treeData.entities, searchedKeyword.current));
    setSearchResultVisible(true);
  };

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} />;
  };

  return (
    <div className="tree-wrap">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
      />
      <Tree
        onSelect={(_, { node }) => editNode(node)}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData.entities}
        titleRender={titleRenderer}
      />
      {searchResultVisible && <SearchResult items={searchResult} />}
    </div>
  );
};

export default TreeExtended;
