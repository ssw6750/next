export default function Navbar() {
    return (
        <nav className="bg-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">My Project</div>
                <ul className="flex space-x-4">
                    <li><a href="/" className="text-white hover:text-blue-200">Home</a></li>
                    <li><a href="/about" className="text-white hover:text-blue-200">About</a></li>
                    <li><a href="/contact" className="text-white hover:text-blue-200">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}
