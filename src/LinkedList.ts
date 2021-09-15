import { IAtom, createAtom } from 'mobx'

interface IListNode<T> {
    readonly item: T
    readonly prev?: IListNode<T>
    readonly next?: IListNode<T>
}

class ListNode<T> implements IListNode<T> {
    prev?: ListNode<T>
    next?: ListNode<T>

    constructor(readonly item: T) {}
}

class LinkedList<T> {
    private firstNode?: ListNode<T>
    private lastNode?: ListNode<T>

    first(): IListNode<T> | undefined {
        return this.firstNode
    }

    last(): IListNode<T> | undefined {
        return this.lastNode
    }

    add(item: T): void {
        const newNode = new ListNode(item)
        if (!this.firstNode) {
            this.firstNode = newNode
            this.lastNode = newNode
        } else if (this.lastNode) {
            this.lastNode.next = newNode
            newNode.prev = this.lastNode
            this.lastNode = newNode
        }
    }

    remove(removedNode: IListNode<T>): void {
        const mutNode = removedNode as ListNode<T>
        const prev = mutNode.prev
        const next = mutNode.next
        if (this.lastNode === removedNode) this.lastNode = prev
        if (this.firstNode === removedNode) this.firstNode = next
        if (prev) prev.next = next
        if (next) next.prev = prev
    }

    forEach(func: (node: IListNode<T>, index: number) => void): void {
        let currentNode = this.firstNode
        let i = 0
        while (currentNode) {
            func(currentNode, i)
            i += 1
            currentNode = currentNode.next
        }
    }

    map<TResult>(
        func: (node: IListNode<T>, index: number) => TResult
    ): TResult[] {
        const arr: TResult[] = []
        this.forEach((n, i) => arr.push(func(n, i)))
        return arr
    }
}

class ObservableLinkedList<T> extends LinkedList<T> {
    private readonly atom: IAtom

    constructor() {
        super()
        this.atom = createAtom('ObservableSublist')
    }

    first(): IListNode<T> | undefined {
        this.atom.reportObserved()
        return super.first()
    }

    last(): IListNode<T> | undefined {
        this.atom.reportObserved()
        return super.last()
    }

    add(item: T): void {
        this.atom.reportChanged()
        super.add(item)
    }

    remove(removedNode: IListNode<T>): void {
        this.atom.reportChanged()
        super.remove(removedNode)
    }

    forEach(func: (node: IListNode<T>, index: number) => void): void {
        this.atom.reportObserved()
        super.forEach(func)
    }

    map<TResult>(
        func: (node: IListNode<T>, index: number) => TResult
    ): TResult[] {
        this.atom.reportObserved()
        return super.map(func)
    }
}
export { LinkedList, ObservableLinkedList }
export type { IListNode }
