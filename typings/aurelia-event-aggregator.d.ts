declare module 'aurelia-event-aggregator' {
  import * as LogManager from 'aurelia-logging';
  export class EventAggregator {
    private eventLookup;
    private messageHandlers;
    publish<T>(event: T): void;
    publish(event: string, data?: any): void;
    subscribe<T>(event: Constructor<T>, callback: (message: T) => void): () => void;
    subscribe(event: string, callback: (message: any, event?: string) => void): () => void;
    subscribeOnce<T>(event: Constructor<T>, callback: (message: T) => void): () => void;
    subscribeOnce(event: string, callback: (message: any, event?: string) => void): () => void;
  }
  export function includeEventsIn(obj: any): EventAggregator;
  export function configure(config: any): void;
}
