import React from 'react';
import "./buttons.scss"

const Button = ({children, ...props}: {
    children: React.ReactNode,
    [x: string]: unknown
}) => {
    return (
        <button {...props}>
            {children}
        </button>
    );
}

export default Button;