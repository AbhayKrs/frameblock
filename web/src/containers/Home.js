import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as FI1 } from '../assets/icons/feature-item1.svg';
import { ReactComponent as FI2 } from '../assets/icons/feature-item2.svg';
import { ReactComponent as FI3 } from '../assets/icons/feature-item3.svg';
import { ReactComponent as FI4 } from '../assets/icons/feature-item4.svg';
import { ReactComponent as FI5 } from '../assets/icons/feature-item5.svg';
import { ReactComponent as FI6 } from '../assets/icons/feature-item6.svg';

const Home = () => {
    const navigate = useNavigate();
    const theme = useSelector(state => state.common.theme);

    return (
        <div className="flex flex-col space-y-10 items-center font-caviar text-center">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-5xl font-bold text-gray-700 dark:text-gray-300">Be job ready in just minutes!</h1>
                <h2 className="text-2xl font-bold tracking-wide text-gray-700 dark:text-gray-400">Construct an impactful resume that seamlessly blends your professional prowess and personal attributes, utilizing a diverse array of exclusive templates.</h2>
            </div>
            <div className="flex flex-col items-center space-y-4 bg-indigo-500 dark:bg-indigo-500 rounded-lg py-6 px-4 w-full lg:w-10/12">
                <div className='flex flex-col items-center space-y-1'>
                    <h3 className="text-lg lg:text-xl tracking-wide font-bold text-gray-800 dark:text-gray-300">Empower your personal brand with a resume that speaks volumes about you. </h3>
                    <h3 className="text-lg lg:text-xl tracking-wide font-bold text-gray-800 dark:text-gray-300">Rely on BuildBlock to effortlessly guide you in crafting a defining representation of yourself!</h3>
                </div>
                <button className="font-bold w-fit py-2 px-4 bg-neutral-800 dark:bg-gray-300 text-gray-300 dark:text-gray-800 shadow-md text-lg tracking-wider rounded-md" onClick={() => navigate('/dashboard')}>Start Building</button>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-2 lg:px-[7.5rem] items-center text-start">
                <div className="flex flex-row gap-5">
                    <FI1 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className='flex flex-col w-9/12 space-y-1'>
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 ">Build Ease</h2>
                        <p className="text-gray-700 dark:text-gray-300">Click, Update and Build your perfect Resumes! </p>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <FI2 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className="flex flex-col w-9/12 space-y-1">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Fully Customizable</h2>
                        <p className="text-gray-700 dark:text-gray-300">Automated tools to design as per you preference. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <FI3 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className="flex flex-col w-9/12 space-y-1">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Personal Assistant</h2>
                        <p className="text-gray-700 dark:text-gray-300">The BuildBlock assistant offers various features to help select and write your resume. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <FI4 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className="flex flex-col w-9/12 space-y-1">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">ATS-Friendly</h2>
                        <p className="text-gray-700 dark:text-gray-300">Certified Automated Tracking System (ATS) friendly resumes to prevent any filter rejections. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <FI5 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className="flex flex-col w-9/12 space-y-1">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Multilungual Support</h2>
                        <p className="text-gray-700 dark:text-gray-300">With over 5+ language supports switch between : English, Spanish, Japanese, French and Chinese. </p>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <FI6 fill={theme === 'dark' ? '#d1d5db' : '#374151'} className='h-20 w-20' />
                    <div className="flex flex-col w-9/12 space-y-1">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Secure</h2>
                        <p className="text-gray-700 dark:text-gray-300">A resume contains various personal details. Be assured that all your data is protected and secured against any harm. </p>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Home;