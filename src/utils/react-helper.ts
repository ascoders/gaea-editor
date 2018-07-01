import * as React from 'react';
import { StoreProps } from '../stores';

type Partial<T> = { [P in keyof T]?: T[P] };

export class PureComponent<T = {}, P = {}> extends React.PureComponent<StoreProps & T, P> {}
