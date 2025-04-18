import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string; // 추가적인 클래스명을 전달할 수 있도록
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`border rounded-lg shadow-md p-6 ${className}`}>
            {children}
        </div>
    );
};

interface CardContentProps {
    children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
    return <div className="mt-2">{children}</div>;
};

export { Card, CardContent };
