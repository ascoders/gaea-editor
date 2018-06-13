import * as React from 'react';

export default (size: number) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size}>
    <path
      className="path1"
      fill="#d8d8d8"
      stroke="#656566"
      strokeWidth="4.2667"
      strokeMiterlimit="4"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      d="M0 29.867h4.267v4.267h-4.267v-4.267z"
    />
    <path
      className="path2"
      fill="#d8d8d8"
      stroke="#656566"
      strokeWidth="4.2667"
      strokeMiterlimit="4"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      d="M29.867 29.867h4.267v4.267h-4.267v-4.267z"
    />
    <path
      className="path3"
      fill="#d8d8d8"
      stroke="#656566"
      strokeWidth="4.2667"
      strokeMiterlimit="4"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      d="M59.733 29.867h4.267v4.267h-4.267v-4.267z"
    />
  </svg>
);
