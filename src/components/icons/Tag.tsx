import * as React from 'react';

export interface LucideProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

const Tag: React.FC<LucideProps> = ({ size = 24, ...props }) => (
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
    <path d="M20.59 13.41L12 21.99 3.41 13.41 12 4.83l8.59 8.58z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default Tag;