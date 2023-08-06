import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as FI1 } from '../assets/icons/feature-item1.svg';
import { ReactComponent as FI2 } from '../assets/icons/feature-item2.svg';
import { ReactComponent as FI3 } from '../assets/icons/feature-item3.svg';
import { ReactComponent as FI4 } from '../assets/icons/feature-item4.svg';
import { ReactComponent as FI5 } from '../assets/icons/feature-item5.svg';
import { ReactComponent as FI6 } from '../assets/icons/feature-item6.svg';

import { PiFileLockThin } from 'react-icons/pi'

const Home = () => {
    const navigate = useNavigate();
    const theme = useSelector(state => state.common.theme);

    return (
        <div className="flex flex-col gap-8 items-center font-caviar text-center text-gray-700 dark:text-gray-300 p-2">
            <div className='flex flex-col gap-1'>
                <h1 className="text-5xl font-bold">Be job ready in just minutes!</h1>
                <h2 className="text-3xl font-bold"> Build a professional and personal resume out of the many unique templates. </h2>
            </div>
            <div className="flex flex-col items-center gap-2 bg-indigo-500 dark:bg-indigo-700 rounded-lg p-4 w-10/12">
                <h3 className="text-xl font-bold">Your resume says a lot about you, trust in BuildBlock to ease the process of creating one that defines you! </h3>
                <button className="text-gray-300 bg-neutral-800 text-lg font-semibold p-4 w-fit rounded-md" onClick={() => navigate('/dashboard')}>Start building now </button>
            </div>
            <div className="grid grid-cols-3 gap-8 px-[7.5rem] items-center text-start">
                <div className="flex flex-row gap-3">
                    <FI1 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className='flex flex-col'>
                        <h2 className="text-2xl font-bold">Build Ease</h2>
                        <p className=""> Click, Update and Build your perfect Resumes! </p>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <FI2 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Fully Customizable</h2>
                        <p className=""> Automated tools to design as per you preference. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <FI3 stroke={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-auto w-40' />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Personal Assistant</h2>
                        <p className=""> The BuildBlock assistant offers various features to help select and write your resume. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <FI4 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-auto w-40' />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">ATS-Friendly</h2>
                        <p className=""> Certified Automated Tracking System (ATS) friendly resumes to prevent any filter rejections. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <FI5 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-auto w-40' />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Multilungual Support</h2>
                        <p className=""> With over 5+ language supports switch between : English, Spanish, Japanese, French and Chinese. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <FI6 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-auto w-56 text-gray-300' />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Secure</h2>
                        <p className="">A resume contains various personal details. Be assured that all your data is protected and secured against any harm. </p>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Home;