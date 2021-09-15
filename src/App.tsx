import Graph from 'Graph/Graph'
import GraphView from 'Graph/GraphView'
import GraphNode from 'GraphNode/GraphNode'
import { ObservableLinkedList } from 'LinkedList'

const graph: Graph = new ObservableLinkedList()
const makeNode = (data: string): GraphNode => ({
    data,
    edges: new ObservableLinkedList(),
})

const nodes = [makeNode('a'), makeNode('b'), makeNode('c'), makeNode('d')]

nodes[0].edges.add(nodes[1])
nodes[0].edges.add(nodes[2])
nodes[1].edges.add(nodes[2])
nodes[3].edges.add(nodes[0])
nodes[3].edges.add(nodes[1])
nodes.forEach(n => graph.add(n))

const App = (): JSX.Element => (
    <div className="App">
        <GraphView graph={graph} />
    </div>
)

export default App
