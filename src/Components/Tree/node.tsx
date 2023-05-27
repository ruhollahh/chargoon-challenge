import { useAppContext } from "../../appContext";
import { NodeType } from "../../types";
import {
  ContextMenuTriggerEx,
  ContextMenuItemEx,
  ContextMenuEx,
} from "../ContextMenu";

interface Props {
  node: NodeType;
}

function Node({ node }: Props) {
  const { removeTreeNode, addToClipboard, pasteFromClipboard, startAddNode } = useAppContext();
  const hasChildren = node.children.length > 0;
  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <ContextMenuTriggerEx id={node.key} title={node.title} />

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx handleClick={() => startAddNode(node)} title={"افزودن زیرشاخه"} />
        <ContextMenuItemEx
          disabled={hasChildren}
          handleClick={() => addToClipboard(node)}
          title={"برش"}
        />
        <ContextMenuItemEx handleClick={() => pasteFromClipboard(node)} title={"چسباندن"} />
        <ContextMenuItemEx
          handleClick={() => !hasChildren && removeTreeNode(node)}
          title={"حذف"}
        />
      </ContextMenuEx>
    </div>
  );
}
export default Node;
