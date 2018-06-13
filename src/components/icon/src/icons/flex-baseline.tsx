import * as React from 'react';

export default (size: number) => (
  <svg viewBox="0 0 64 64" width={size} height={size}>
    <path
      className="path1"
      fill="#b1b2b3"
      d="M51.2 34.133v14.933c0 1.178-0.955 2.133-2.133 2.133h-12.8c-1.178 0-2.133-0.955-2.133-2.133v-14.933c0-1.178 0.955-2.133 2.133-2.133h12.8c1.178 0 2.133 0.955 2.133 2.133z"
    />
    <path
      className="path2"
      fill="#656566"
      d="M29.867 34.133v12.8c0 1.178-0.955 2.133-2.133 2.133h-12.8c-1.178 0-2.133-0.955-2.133-2.133v-12.8c0-1.178 0.955-2.133 2.133-2.133h12.8c1.178 0 2.133 0.955 2.133 2.133z"
    />
    <path
      className="path3"
      fill="none"
      stroke="#656566"
      strokeWidth="2.1333"
      strokeMiterlimit="4"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      d="M12.8 29.867v-12.8c0-1.178 0.955-2.133 2.133-2.133h12.8c1.178 0 2.133 0.955 2.133 2.133v12.8c0 1.178-0.955 2.133-2.133 2.133h-12.8c-1.178 0-2.133-0.955-2.133-2.133z"
    />
    <path
      className="path4"
      fill="none"
      stroke="#656566"
      strokeWidth="2.1333"
      strokeMiterlimit="4"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      d="M34.133 29.867v-10.667c0-1.178 0.955-2.133 2.133-2.133h12.8c1.178 0 2.133 0.955 2.133 2.133v10.667c0 1.178-0.955 2.133-2.133 2.133h-12.8c-1.178 0-2.133-0.955-2.133-2.133z"
    />
    <path className="path5" fill="#656566" d="M0 33.067v-2.133h64v2.133h-64z" />
  </svg>
);
