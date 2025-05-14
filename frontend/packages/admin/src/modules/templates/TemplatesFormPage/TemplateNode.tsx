import { observer } from "mobx-react-lite";
import type { TreeNode } from "primereact/treenode";

type Props = {
    node: TreeNode;
}

export const TemplatesNode = observer(({ node }:  Props) => {
    if (node.data.type === 'text')  {
        return node.data.text;
    }

    const Tag = node.data.type;

    return (
        <Tag className={node.data.className}>
            {node.children?.map((childNode) => <TemplatesNode key={childNode.key} node={childNode} />)}
        </Tag>
    )
});