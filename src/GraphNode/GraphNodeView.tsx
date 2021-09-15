import Graph from 'Graph/Graph'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import GraphEdgePicker from './GraphEdgePicker'
import GraphNode from './GraphNode'
import styles from './GraphNode.module.css'
type Props = {
    graph: Graph
    node: GraphNode
}
const GraphNodeView = ({ node, graph }: Props): JSX.Element => {
    const [isPickerOpen, setIsPickerOpen] = useState(false)
    return (
        <div className={styles.graphNodeContainer}>
            <div className={styles.graphNode}>
                <div className={styles.nodeData}>
                    <span>{node.data}</span>
                </div>
                {node.edges.map((edge, i) => (
                    <div
                        className={styles.nodeEdge}
                        key={i + edge.item.data}
                        onClick={action(() => node.edges.remove(edge))}
                    >
                        {edge.item.data}
                    </div>
                ))}
            </div>
            {isPickerOpen ? (
                <GraphEdgePicker
                    graph={graph}
                    ofNode={node}
                    onClose={() => setIsPickerOpen(false)}
                    onSelect={edge => node.edges.add(edge)}
                />
            ) : (
                <div
                    className={styles.addButton}
                    onClick={() => setIsPickerOpen(true)}
                >
                    +
                </div>
            )}
        </div>
    )
}

export default observer(GraphNodeView)
