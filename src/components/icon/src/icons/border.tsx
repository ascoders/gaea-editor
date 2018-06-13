import * as React from 'react';

export default (size: number) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size}>
    <path className="path1" fill="#f8f9fa" d="M0 0h64v8.533h-64v-8.533z" />
    <path className="path2" fill="#b1b2b3" d="M0 8.533h64v55.467h-64v-55.467z" />
    <path className="path3" fill="#656566" d="M0 10.667h64v-2.133h-64v2.133z" />
  </svg>
);
