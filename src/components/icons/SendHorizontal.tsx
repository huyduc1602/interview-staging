import * as React from 'react';

export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
}

const SendHorizontal: React.FC<LucideProps> = ({ size = 24, ...props }) => (
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
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

export default SendHorizontal;