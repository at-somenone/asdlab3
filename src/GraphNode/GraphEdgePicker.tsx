import Graph from 'Graph/Graph'
import GraphNode from './GraphNode'
import styles from './GraphNode.module.css'

type Props = {
    graph: Graph
    ofNode: GraphNode
    onClose: () => void
    onSelect: (selected: GraphNode) => void
}

const GraphEdgePicker = ({
    graph,
    ofNode,
    onClose,
    onSelect,
}: Props): JSX.Element => (
    <div>
        <div className={styles.screenCover} onClick={onClose} />
        <div className={styles.edgePicker}>
            <div className={styles.addButton}>+</div>
            {graph.map(
                node =>
                    node.item !== ofNode && (
                        <div
                            className={styles.nodeEdge}
                            onClick={() => {
                                onSelect(node.item)
                                onClose()
                            }}
                            key={node.item.data}
                        >
                            {node.item.data}
                        </div>
                    )
            )}
        </div>
    </div>
)

export default GraphEdgePicker
