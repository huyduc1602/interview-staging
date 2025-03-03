import * as React from 'react';

export interface LucideProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

const RefreshCw: React.FC<LucideProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.36-3.36L23 10M1 14a9 9 0 0 0 14.36 3.36L23 14" />
  </svg>
);

export default RefreshCw;