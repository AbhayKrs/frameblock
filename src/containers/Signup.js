import { useState } from 'react';

import { IoCloseSharp, IoCloseCircle } from 'react-icons/io5';
import { FaUser, FaLock } from 'react-icons/fa';

const Signup = (props) => {
    const { open, title, banner, error, onClose, openRegister, handleSignIn, setAuthError } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setLoggedIn] = useState(false);

    const handleStayLoggedin = (event) => {
        setLoggedIn(event.target.checked);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        error.login && setAuthError()
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        error.login && setAuthError()
    }

    const onSubmitClick = () => {
        const signinInput = {
            username: username,
            password: password,
        }
        handleSignIn(stayLoggedIn, signinInput);
        setUsername('');
        setPassword('');
    }
    return (
        <div className="relative m-auto bg-slate-100 dark:bg-neutral-800 lg:w-6/12 sm:w-11/12 xs:w-11/12 rounded-xl z-50 overflow-y-auto">
            <div className='grid sm:grid-cols-2 grid-cols-1'>
                <div className='p-8 pt-4 flex flex-col space-y-3'>
                    <IoCloseSharp onClick={() => { onClose(); props.setAuthError() }} className='w-7 h-7 absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-gray-400' />
                    <h1 className='text-violet-500 dark:text-violet-500 text-5xl font-semibold tracking-widest font-antipasto mt-10'>{title}</h1>
                    <p className='text-black dark:text-white text-md font-josefinlight'>Become an Artyst Member <button type='button' onClick={() => { onClose(); openRegister() }} className='text-sm font-bold text-violet-400'>JOIN</button></p>
                    <a href="#" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2 px-3 border rounded-lg border-gray-700 dark:border-gray-400 flex items-center w-full mt-10">
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                            <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                            <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                            <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                        </svg>
                        <p className="text-base font-medium ml-4 text-gray-800 dark:text-gray-400">Continue with Google</p>
                    </a>
                    <div className='flex items-center justify-between'>
                        <hr className="w-full border-1 border-gray-600 dark:border-gray-400" />
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-600 dark:text-gray-400">OR</p>
                        <hr className="w-full border-1 border-gray-600 dark:border-gray-400" />
                    </div>
                    <div className="flex items-center">
                        <div className='px-3 py-2.5 bg-gray-300 rounded-l'>
                            <FaUser className="h-5 w-5 text-violet-500" />
                        </div>
                        <input
                            name="username"
                            value={username}
                            className="rounded-r p-2 w-full focus:outline-none"
                            type="text"
                            placeholder="Username"
                            onChange={handleUsernameChange}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    onSubmitClick()
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className='px-3 py-2.5 bg-gray-300 rounded-l'>
                            <FaLock className="h-5 w-5 text-violet-500" />
                        </div>
                        <input
                            name="password"
                            value={password}
                            className="rounded-r p-2 w-full focus:outline-none"
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    onSubmitClick()
                                }
                            }}
                        />
                    </div>
                    <label className="flex items-center cursor-pointer space-x-1">
                        <input type="checkbox" checked={stayLoggedIn} onChange={handleStayLoggedin} className="form-checkbox h-4 w-4 rounded bg-slate-300 text-violet-500 accent-violet-500 cursor-pointer mr-1" />
                        <p className='font-caviar text-sm text-gray-900 dark:text-gray-300'>Keep me logged in</p>
                    </label>
                    {error?.login && !username && !password ?
                        <div className='flex p-2 border-2 border-red-500 rounded-lg space-x-2'>
                            <IoCloseCircle className='h-5 w-5 text-red-500' />
                            <p className='font-semibold text-sm text-red-500'>{error.message}</p>
                        </div> :
                        null
                    }
                    <button onClick={onSubmitClick} className='w-20 bg-violet-500 text-gray-900 dark:text-gray-200 hover:bg-violet-500 dark:hover:bg-violet-500 px-4 py-2 rounded-md text-lg font-caviar font-bold dark:font-normal'>Login</button>
                    <p className='text-gray-700 dark:text-gray-500 text-sm'>By clicking Sign In, I confirm that I have read and agree to the Artyst <button type='button' className='text-sm font-bold text-violet-500'>Terms of Service</button> and <button type='button' className='text-sm font-bold text-violet-500'>Privacy Policy</button>.</p>
                </div>
            </div>
        </div>
    )
}

export default Signup;