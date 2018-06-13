import * as React from 'react';

export default (size: number) => (
  <svg viewBox="0 0 64 64" width={size} height={size}>
    <path className="path1" fill="#656566" d="M2.133 64h-2.133v-64h2.133v64z" />
    <path className="path2" fill="#656566" d="M64 64h-2.133v-64h2.133v64z" />
    <path
      className="path3"
      fill="#b1b2b3"
      d="M57.6 10.667v42.667c0 1.178-0.955 2.133-2.133 2.133h-12.8c-1.178 0-2.133-0.955-2.133-2.133v-42.667c0-1.178 0.955-2.133 2.133-2.133h12.8c1.178 0 2.133 0.955 2.133 2.133z"
    />
    <path
      className="path4"
      fill="#656566"
      d="M23.467 10.667v42.667c0 1.178-0.955 2.133-2.133 2.133h-12.8c-1.178 0-2.133-0.955-2.133-2.133v-42.667c0-1.178 0.955-2.133 2.133-2.133h12.8c1.178 0 2.133 0.955 2.133 2.133z"
    />
  </svg>
);
