import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HeaderLogo } from '../assets/icons/header-logo.svg';
import { RiHomeLine } from 'react-icons/ri';
import { HiOutlineTemplate } from 'react-icons/hi';
import { TbSettings, TbEditCircle } from 'react-icons/tb';
import ThemeToggle from "../components/ThemeToggle";

import { switchTheme } from "../store/reducers/common.reducers";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector(state => state.common.theme);

    const handleColorChange = () => {
        const themeSwitch = theme === 'light' ? 'dark' : 'light';
        dispatch(switchTheme(themeSwitch));
    };

    return (
        <>
            <nav id="sidebar" className='fixed inset-y-2 left-2 rounded-lg pt-4 w-14 flex flex-col space-y-6 items-center bg-indigo-500 dark:bg-indigo-700 shadow-[3px_4px_3px_rgba(175,175,175,0.55),_3px_2px_2px_rgba(175,175,175,0.5)] dark:shadow-[3px_4px_3px_rgba(10,10,10,0.55),_3px_2px_2px_rgba(10,10,10,0.5)]'>
                <HeaderLogo fill={theme === 'light' ? '#262626' : 'white'} className="h-10 w-auto" />
                <button onClick={() => navigate('/')} className="cursor-pointer">
                    <RiHomeLine className="h-7 w-7 text-neutral-800 dark:text-neutral-200" />
                </button>
                <button onClick={() => navigate('/templates')} className="cursor-pointer">
                    <HiOutlineTemplate className="h-7 w-7 text-neutral-800 dark:text-neutral-200" />
                </button>
                <button onClick={() => navigate('/editor')} className="cursor-pointer">
                    <TbEditCircle className="h-7 w-7 text-neutral-800 dark:text-neutral-200" />
                </button>
                <button onClick={() => navigate('/settings')} className="cursor-pointer">
                    <TbSettings className="h-7 w-7 text-neutral-800 dark:text-neutral-200" />
                </button>

                <ThemeToggle toggle={handleColorChange} />
            </nav>
        </>
    )
}

export default Header;