import { LinkedList } from 'LinkedList'

type GraphNode = {
    data: string
    edges: LinkedList<GraphNode>
}

export default GraphNode
