import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto text-center py-20">
                <h1 className="text-4xl font-bold text-blue-600">Welcome to OurApp</h1>
                <p className="mt-4 text-lg text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam, magna a convallis iaculis, sem ex dapibus arcu, imperdiet fermentum neque arcu in est.
                </p>
            </div>
        </div>
    );
};

export default Home;