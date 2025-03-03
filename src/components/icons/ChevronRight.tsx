import * as React from 'react';

export interface LucideProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

const ChevronRight: React.FC<LucideProps> = ({ size = 24, ...props }) => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default ChevronRight;