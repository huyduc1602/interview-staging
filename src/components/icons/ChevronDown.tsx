import * as React from 'react';

export interface LucideProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

const ChevronDown: React.FC<LucideProps> = ({ size = 24, ...props }) => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default ChevronDown;