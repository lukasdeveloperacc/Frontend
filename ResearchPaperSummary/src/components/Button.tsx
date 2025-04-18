import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string; // 추가적인 클래스명 전달 가능
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`} // 기본 스타일 + 추가 클래스명
        >
            {children}
        </button>
    );
};

export { Button };
