import * as React from 'react';

export default (size: number) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size}>
    <path className="path1" fill="#656566" d="M0 0h64v2.133h-64v-2.133z" />
    <path className="path2" fill="#656566" d="M0 10.667h64v2.133h-64v-2.133z" />
    <path className="path3" fill="#656566" d="M0 21.333h64v2.133h-64v-2.133z" />
    <path className="path4" fill="#656566" d="M0 32h51.2v2.133h-51.2v-2.133z" />
  </svg>
);
