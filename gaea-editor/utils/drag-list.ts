import * as React from 'react'
import * as Sortable from 'sortablejs'
import Viewport from '../store/viewport'

export default class DragList {
    // 保存上一次拖拽的位置
    private lastDragStartIndex: number

    constructor(element: Element, viewport: Viewport) {
        Sortable.create(element, {
            animation: 150,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: 'gaea-layout',
                pull: 'clone',
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event: any) => {
                this.lastDragStartIndex = event.oldIndex as number
                viewport.startDragging('', 'source', true, null, event.oldIndex as number, event.item.dataset.source)
            },
            onEnd: (event: any) => {
                viewport.endDragging()
                // 因为是 clone 方式, 拖拽成功的话元素会重复, 没成功拖拽会被添加到末尾
                // 所以先移除 clone 的元素（吐槽下, 拖走的才是真的, 留下的才是 clone 的）
                // 有 parentNode, 说明拖拽完毕还是没有被清除, 说明被拖走了, 因为如果没真正拖动成功, clone 元素会被删除
                if (event.clone.parentNode) {
                    // 有 clone, 说明已经真正拖走了
                    element.removeChild(event.clone)
                    // 再把真正移过去的弄回来
                    if (this.lastDragStartIndex === element.childNodes.length) {
                        // 如果拖拽的是最后一个
                        element.appendChild(event.item)
                    } else {
                        // 拖拽的不是最后一个
                        element.insertBefore(event.item, element.childNodes[this.lastDragStartIndex])
                    }
                } else {
                    // 没拖走, 只是晃了一下, 不用管了
                }
            }
        })
    }
}