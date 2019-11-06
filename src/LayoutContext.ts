import * as React from 'react';

export const LayoutContext = React.createContext<{ defaultViewMode: ViewMode }>({
  defaultViewMode: 'PC',
});

export default LayoutContext;
