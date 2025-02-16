// import React, { useState } from 'react';
// import Quote from './Quote';
// import { Link, useNavigate } from 'react-router-dom';
// import { backend_API, localHost } from '../Endpoint';

// const SignUp = () => {
//     const navigate = useNavigate();  // Correct instantiation of useNavigate

//     const [credentials, setCredentials] = useState({
//         // firstName: '',
//         // lastName: '',
//         username: 'username',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         clientId: 1,
//         roleId: 3

//     });

//     const [passwordError, setPasswordError] = useState(false);

//     const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//         if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
//             setPasswordError(false);  // Reset password error when user modifies either field
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (credentials.password !== credentials.confirmPassword) {
//             setPasswordError(true);
//             return;
//         }

//         try {
//             const response = await fetch(`${backend_API }/api/Auth/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     username: credentials.username,
//                     email: credentials.email,
//                     password: credentials.password,
//                     clientId: credentials.clientId,
//                     roleId: credentials.roleId
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log('Registration successful', data);
//             navigate('/Login'); // Redirect to login page or dashboard as needed
//         } catch (error) {
//             console.error('Network error:', error);
//         }
//     };





//     return (
//         <div className="min-h-screen flex flex-col lg:flex-row">
//             <div className="flex-1 flex items-center justify-center p-8" style={{ backgroundColor: '#0F172A' }}>
//                 <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full">
//                     <div className="grid md:grid-cols-2 md:gap-6">
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input type="text" name="firstName" id="floating_first_name"
//                                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                                 placeholder=" " required onChange={onChange} />
//                             <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
//                         </div>
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input type="text" name="lastName" id="floating_last_name"
//                                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                                 placeholder=" " required onChange={onChange} />
//                             <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
//                         </div>
//                     </div>
//                     <div className="relative z-0 w-full mb-5 group">
//                         <input type="email" name="email" id="floating_email"
//                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                             placeholder=" " required onChange={onChange} />
//                         <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
//                     </div>
//                     <div className="relative z-0 w-full mb-5 group">
//                         <input type="password" name="password" id="floating_password"
//                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                             placeholder=" " required onChange={onChange} />
//                         <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
//                     </div>
//                     <div className="relative z-0 w-full mb-5 group">
//                         <input type="password" name="confirmPassword" id="floating_repeat_password"
//                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                             placeholder=" " required onChange={onChange} />
//                         <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
//                         {passwordError && <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>}
//                     </div>
//                     <div className="grid md:grid-cols-2 md:gap-6">
//                         {/* <div className="relative z-0 w-full mb-5 group">
//                             <input
//                                 type="text"
//                                 name="floating_role"
//                                 id="floating_role"
//                                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                                 placeholder=" "
//                                 required
//                                 pattern=".*\S+.*" // Pattern to ensure that the input is not just whitespace
//                                 title="Role cannot be empty"
//                             />
//                             <label htmlFor="floating_role" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//                                 Role (e.g., Software Engineer)
//                             </label>
//                         </div> */}

//                         {/* <div className="relative z-0 w-full mb-5 group">
//                             <input type="text" name="floating_client" id="floating_client" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//                             <label for="floating_client" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Client (Ex. Google)</label>
//                         </div> */}
//                     </div>
//                     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//                     <Link to='/Login' className="text-blue-500 m-3">Already have an account? <span className='hover:underline' >Log in </span></Link>
//                 </form>
//             </div>
//             <Quote />
//         </div>
//     );
// };

// export default SignUp;
import React, { useState } from 'react';
import Quote from './Quote';
import { Link, useNavigate } from 'react-router-dom';
import { backend_API } from '../Endpoint';

const SignUp = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 3,   // Default value (e.g., viewer)
    clientId: 1  // Fixed value
  });

  const [passwordError, setPasswordError] = useState(false);
  const [apiError, setApiError] = useState(null);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
        setPasswordError(true);
        return;
    }

    try {
        const response = await fetch(`${backend_API}/api/Auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                confirmPassword: credentials.confirmPassword, // Include confirmPassword
                clientId: credentials.clientId,
                roleId: credentials.roleId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log('Registration successful', data);
        navigate('/Login'); // Redirect to login page or dashboard as needed
    } catch (error) {
        console.error('Network error:', error);
    }
};


  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-8" style={{ backgroundColor: '#0F172A' }}>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              name="username" 
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " 
              required 
              onChange={onChange} 
              value={credentials.username}
            />
            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="email" 
              name="email" 
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " 
              required 
              onChange={onChange} 
              value={credentials.email}
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="password" 
              name="password" 
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " 
              required 
              onChange={onChange} 
              value={credentials.password}
            />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="password" 
              name="confirmPassword" 
              id="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " 
              required 
              onChange={onChange} 
              value={credentials.confirmPassword}
            />
            <label htmlFor="confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm Password
            </label>
            {passwordError && <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="roleId" className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select 
              name="roleId" 
              id="roleId" 
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              onChange={onChange} 
              value={credentials.roleId}
              required
            >
              <option value="1">Role 1</option>
              <option value="2">Role 2</option>
              <option value="3">Role 3</option>
            </select>
          </div>

          {/* Client ID is fixed to 1, so you can include it as a hidden field */}
          <input 
            type="hidden" 
            name="clientId" 
            value={credentials.clientId} 
          />

          {apiError && <p className="text-red-500 text-sm mb-3">{apiError}</p>}

          <button type="submit" className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Submit
          </button>
          <Link to='/Login' className="text-blue-500 m-3">
            Already have an account? <span className='hover:underline'>Log in</span>
          </Link>
        </form>
      </div>
      <Quote />
    </div>
  );
};

export default SignUp;

