import * as React from 'react';
import { StoreProps } from '../stores';

export class PureComponent<T = {}, P = {}> extends React.PureComponent<StoreProps & T, P> {}
