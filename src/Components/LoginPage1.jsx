import React from 'react';
import Quote from './Quote';
import { useState } from 'react';

const LoginPage1 = () => {
    const handleAuth = (provider) => {
        console.log(`Authenticating with ${provider}`);
        // Implement actual authentication logic here
    };

    const [credentials, setCredentials] = useState({
        fullName: '',
        email: '',
        organization: '',
        designation: '',
        password: '',
        confirmPassword: ''
    });
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="flex-1 flex items-center justify-center p-8 "  style={{ backgroundColor: '#0F172A' }}>
                <div className="w-full max-w-md space-y-6" >
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>Create your Hybrid ETL/ELT account</h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
                            <span className="flex items-center"><i className="bi bi-check-circle-fill text-blue-500 mr-2"></i>No credit card required</span>
                            <span className="flex items-center"><i className="bi bi-check-circle-fill text-blue-500 mr-2"></i>Instant setup</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full p-3 rounded-lg flex items-center justify-center gap-3 text-white bg-blue-500 hover:bg-blue-600" onClick={() => handleAuth('Google')}>
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>
                        <button className="w-full p-3 rounded-lg flex items-center justify-center gap-3 text-white bg-gray-800 hover:bg-gray-900" onClick={() => handleAuth('GitHub')}>
                            <i className="bi bi-github text-xl"></i>
                            Continue with GitHub
                        </button>
                        <button className="w-full p-3 rounded-lg flex items-center justify-center gap-3 text-white bg-green-500 hover:bg-green-600" onClick={() => handleAuth('SSO')}>
                            <i className="bi bi-shield-lock text-xl"></i>
                            Continue with SSO
                        </button>
                        <button className="w-full p-3 rounded-lg flex items-center justify-center gap-3 text-white bg-red-500 hover:bg-red-600" onClick={() => handleAuth('email')}>
                            <i className="bi bi-envelope text-xl"></i>
                            Sign up using email
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                        <p>By signing up and continuing, you agree to our 
                            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and 
                            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                        </p>
                    </div>

                    <div className="text-center text-sm">
                        <p className="text-gray-400">Already have an account? 
                            <a href="#" className="text-blue-500 hover:underline">Log in</a>
                        </p>
                    </div>
                </div>
            </div>
            <Quote />
        </div>
    );
};

export default LoginPage1;
