import Navbar from './Navbar';

export default function Layout({ children: any }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto p-4">
                {children}
            </main>
            <footer className="bg-gray-800 p-4 text-center text-white">
                © 2024 My Project. All rights reserved.
            </footer>
        </div>
    );
}
