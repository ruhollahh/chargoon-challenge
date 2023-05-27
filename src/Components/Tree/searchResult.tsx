import { useMemo, useState } from "react";
import { NodeType } from "../../types";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import { Button, Popover } from "antd";
import OrgchartIcon from "../SvgIcons/orgchart";
import { ParentTreeType, getParentTree } from "../../Store/helpers";
import { useAppContext } from "../../appContext";
interface Props {
  items: (NodeType & { hierarchy: string[] })[];
}

const Branch = ({ parentTree }: { parentTree: ParentTreeType }) => {
  if (!parentTree.node) {
    return null
  }

  return (
    <div className="parent-tree__branch">
      <p>{parentTree.node.title}</p>
      {parentTree.child && <Branch parentTree={parentTree.child} />}
    </div>
  );
};

const ParentTree = ({ item }: { item: NodeType }) => {
  const { treeData } = useAppContext();
  const parentTree = useMemo(
    () => getParentTree(treeData.entities, item),
    [treeData, item]
  );
  return (
    <div className="parent-tree">
      <Branch parentTree={parentTree} />
    </div>
  );
};

function SearchResult({ items }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="search-result">
      <div className="search-icon-wrapper">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          shape="circle"
          icon={isOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
        />
      </div>
      <div
        className="search-items"
        style={{ height: isOpen ? 200 : 0, overflow: "auto" }}
      >
        {items.map((item) => (
          <div key={item.key} className="search-item">
            <div key={item.key}>{item.title}</div>
            <div className="search-icon-wrapper">
              <Popover
                placement="leftBottom"
                content={<ParentTree item={item} />}
                trigger="click"
              >
                <Button shape="circle" icon={<OrgchartIcon />} />
              </Popover>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchResult;
