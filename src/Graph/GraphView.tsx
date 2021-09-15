import Graph from './Graph'
import GraphNodeView from 'GraphNode/GraphNodeView'
type Props = {
    graph: Graph
}

const GraphView = ({ graph }: Props): JSX.Element => (
    <div>
        {graph.map(n => (
            <GraphNodeView node={n.item} graph={graph} key={n.item.data} />
        ))}
    </div>
)

export default GraphView
