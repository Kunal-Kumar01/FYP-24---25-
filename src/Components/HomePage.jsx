import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function HomePage() {
    const [currentMode, setCurrentMode] = useState('Light Mode');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [headColor, setHeadColor] = useState('#000000');

    const location = useLocation();
    const userEmail = location.state?.email;

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setCurrentMode(isDarkMode ? 'Dark Mode' : 'Light Mode');
        setHeadColor(isDarkMode ? '#000000' : '#FFFFFF');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log('Searching for:', event.target.value);
    };

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-f8fafc'}`}>
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-4">
                <div className="mb-8">
                    <h1 className="text-xl font-bold mb-4">ETL Pipeline</h1>
                    <div className="text-sm text-gray-400 mb-4">{userEmail || 'user@email.com'}</div>
                </div>
                <nav>
                    <a href="#" className="sidebar-item flex items-center p-2 rounded-lg mb-2 bg-gray-800">
                        <i className="bi bi-database-fill mr-3"></i>
                        Sources
                    </a>

                    {/* Additional links */}
                    <a href="#" className="sidebar-item flex items-center p-2 rounded-lg mb-2">
                        <i className="bi bi-arrow-down-circle-fill mr-3"></i>
                        Destinations
                    </a>
                    <a href="#" className="sidebar-item flex items-center p-2 rounded-lg mb-2">
                        <i className="bi bi-tools mr-3"></i>
                        Builder
                    </a>
                    <a href="#" className="sidebar-item flex items-center p-2 rounded-lg mb-2">
                        <i className="bi bi-gear-fill mr-3"></i>
                        Settings
                    </a>
                    <a href="#" className="sidebar-item flex items-center p-2 rounded-lg mb-2">
                        <i className="bi bi-question-circle-fill mr-3"></i>
                        Help
                    </a>
                    <a href="#" className="sidebar-item flex items-center p-2 rounded-lg">
                        <i className="bi bi-person-fill mr-3"></i>
                        Profile
                    </a>
                </nav>
                <div className="mt-auto pt-8">
                    <button onClick={toggleDarkMode} className="sidebar-item flex items-center p-2 rounded-lg mb-2">
                        <i className="bi bi-moon-fill mr-3"></i>
                        {currentMode}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 " style={{ color: headColor }}>Set up a new source</h2>
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <i className="bi bi-search absolute left-3 top-3 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search Pipeline Connectors..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {/* Connector Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a href="#" className="source-card p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center">
                                <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="Postgres" className="w-8 h-8 mr-3" />
                                <span>Postgres</span>
                            </div>
                        </a>
                        <a href="#" className="source-card p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Office-Excel_%282013%E2%80%932019%29.svg/1024px-Office-Excel_%282013%E2%80%932019%29.svg.png" alt="MS Excel" className="w-8 h-8 mr-3" />
                                <span>MS Excel</span>
                            </div>
                        </a>
                        <a href="#" className="source-card p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center">
                                <img src="https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" alt="MySQL Server" className="w-8 h-8 mr-3" />
                                <span>MySQL Server</span>
                            </div>
                        </a>
                        {/* Additional cards */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;
