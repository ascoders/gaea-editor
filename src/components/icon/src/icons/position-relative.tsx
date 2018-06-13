import * as React from 'react';

export default (size: number) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size}>
    <path
      className="path1"
      fill="#cacbcc"
      stroke="#656566"
      strokeWidth="2.1333"
      strokeMiterlimit="4"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      d="M2.133 17.067h34.133c1.178 0 2.133 0.955 2.133 2.133v14.933c0 1.178-0.955 2.133-2.133 2.133h-34.133c-1.178 0-2.133-0.955-2.133-2.133v-14.933c0-1.178 0.955-2.133 2.133-2.133z"
    />
    <path
      className="path2"
      fill="#656566"
      d="M27.733 27.733h34.133c1.178 0 2.133 0.955 2.133 2.133v14.933c0 1.178-0.955 2.133-2.133 2.133h-34.133c-1.178 0-2.133-0.955-2.133-2.133v-14.933c0-1.178 0.955-2.133 2.133-2.133z"
    />
  </svg>
);
