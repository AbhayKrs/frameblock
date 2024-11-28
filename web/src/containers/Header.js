import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from 'jwt-decode';

import ThemeToggle from "../components/ThemeToggle";
import { switchTheme } from "../store/reducers/common.reducers";

import { ReactComponent as HeaderLogo } from '../assets/icons/header-logo.svg';
import { PiUserCircleFill, PiCompassToolBold } from 'react-icons/pi';
import { RiHomeLine, RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { HiOutlineTerminal } from 'react-icons/hi';
import { TbSettings, TbEditCircle } from 'react-icons/tb';

import { HANDLE_SIGNOUT } from '../store/reducers/user.reducers';
import { handle_user_signOut } from '../utils/api';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const common = useSelector(state => state.common);
    const user = useSelector(state => state.user);

    const [activeRoute, setActiveRoute] = useState('');

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, [location.pathname])


    const handleColorChange = () => {
        const themeSwitch = common?.theme === 'light' ? 'dark' : 'light';
        dispatch(switchTheme(themeSwitch));
    };

    const handleSignout = () => {
        dispatch(HANDLE_SIGNOUT());
        handle_user_signOut();
    }

    return (
        <nav id="sidebar" className='sticky top-0 z-40 px-6 py-2 flex flex-row justify-between w-full items-center bg-slate-200 dark:bg-neutral-800 border-b border-slate-900/10 dark:border-slate-50/[0.06]'>
            <HeaderLogo fill="#6366f1" className="h-8 w-auto" />
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={() => navigate('/')} className="cursor-pointer">
                    <RiHomeLine className={`h-7 w-7 ${activeRoute === '/' ? 'text-[#6366f1]' : 'text-neutral-700 dark:text-neutral-100'}`} />
                </button>
                <button onClick={() => navigate('/templates')} className="cursor-pointer">
                    <PiCompassToolBold className={`h-7 w-7 ${activeRoute.includes('/templates') ? 'text-[#6366f1]' : 'text-neutral-700 dark:text-neutral-100'}`} />
                </button>
                <button onClick={() => navigate('/dashboard')} className="cursor-pointer">
                    <HiOutlineTerminal className={`h-7 w-7 ${activeRoute === '/dashboard' ? 'text-[#6366f1]' : 'text-neutral-700 dark:text-neutral-100'}`} />
                </button>
                {activeRoute.includes('/editor') && <button onClick={() => navigate('/editor')} className="cursor-pointer">
                    <TbEditCircle className='h-7 w-7 text-[#6366f1]' />
                </button>}
                <div className='flex flex-row space-x-4 items-center ml-4 pl-4 border-l-2 border-slate-900/10 dark:border-slate-50/[0.1]'>
                    <button onClick={() => navigate('/settings')} className="cursor-pointer">
                        <TbSettings className={`h-7 w-7 ${activeRoute.includes('/settings') ? 'text-[#6366f1]' : 'text-neutral-700 dark:text-neutral-100'}`} />
                    </button>
                    {user?.isSignedIn ?
                        <>
                            <button onClick={handleSignout} className="cursor-pointer">
                                <BiLogOutCircle className='h-7 w-7 text-neutral-700 dark:text-neutral-100' />
                            </button>
                        </>
                        :
                        <button onClick={() => navigate('/signin')} className="cursor-pointer">
                            <BiLogInCircle className={`h-7 w-7 ${activeRoute.includes('/signin') || activeRoute.includes('/signup') ? 'text-[#6366f1]' : 'text-neutral-700 dark:text-neutral-100'}`} />
                        </button>
                    }
                </div>
                <ThemeToggle toggle={handleColorChange} />
            </div>
        </nav>
    )
}

export default Header;