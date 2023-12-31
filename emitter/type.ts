export const EVENT_NAME = {
  DEMO: 'DEMO',
} as const;

export type EventParamsList = {
  [EVENT_NAME.DEMO]: undefined;
};

export type EventKeyName = keyof EventParamsList;

export type ListenerCallback<T> = (data: T) => void;

export type Listeners = Array<{
  uuid: string;
  eventKey: EventKeyName | string;
  listener: ListenerCallback<any>;
}>;
