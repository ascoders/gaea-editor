import { Action } from "dob"

export declare type EventType = number | string

/**
 * 事件
 */
export interface IEvent {
  callback: (eventContext?: any, context?: any) => void
  context: any
}

export type ICallback = (eventContext?: any, context?: any) => void

export default class EventAction {
  // 所有事件
  private events: Map<EventType, IEvent[]> = new Map()

  /**
   * 订阅事件
   */
  @Action public on(eventType: EventType, callback: ICallback, context?: any) {
    const event: IEvent = {
      callback,
      context
    }

    if (this.events.get(eventType)) {
      // 存在, push 一个事件监听
      this.events.get(eventType).push(event)
    } else {
      // 不存在, 赋值
      this.events.set(eventType, [event])
    }
  }

  /**
   * 取消订阅
   */
  @Action public off(eventType: EventType, callback: ICallback) {
    if (!this.events.get(eventType)) {
      return false
    }

    const events = this.events.get(eventType).filter(event => {
      return event.callback !== callback
    })

    this.events.set(eventType, events)

    return true
  }

  /**
   * 广播事件
   */
  @Action public emit(eventType: EventType, context?: any) {
    if (!eventType || !this.events.get(eventType)) {
      return false
    }

    this.events.get(eventType).forEach(event => {
      event.callback(event.context, context)
    })
  }
}
