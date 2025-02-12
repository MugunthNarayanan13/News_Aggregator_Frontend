import React, { ReactNode } from 'react';

interface MainProps {
    children: ReactNode;
}

export default function Main({ children }: MainProps) {
    return (
        <main className="w-screen h-screen flex-col">
            {children}
        </main>
    );
}
