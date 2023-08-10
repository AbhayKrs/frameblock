import Carousel from '../components/Carousel';

const Templates = () => {
    return (
        <div className='relative flex flex-col space-y-2 w-full items-center'>
            <h1 className='font-caviar font-bold text-5xl text-gray-700 dark:text-gray-300'>Templates</h1>
            <div className='flex flex-row space-x-4 font-caviar tracking-wide py-2 text-gray-700 dark:text-gray-300'>
                <span className='leading-5'><span className='font-bold'>Fuel Your Career Path:</span> Choose from our captivating resume templates, meticulously designed to catch the eye of both recruiters and Applicant Tracking Systems (ATS).</span>
                <span className='leading-5'><span className='font-bold'>Stand Out Effectively:</span> Let your skills and experience shine through a format optimized for ATS compatibility, ensuring your resume doesn't get lost in the digital shuffle.</span>
                <span className='leading-5'><span className='font-bold'>Impress with Style:</span> Elevate your application with visually appealing layouts that make a lasting impression on employers, increasing your chances of landing your dream job.</span>
                <span className='leading-5'><span className='font-bold'>Your Success, Our Priority:</span> We're dedicated to helping you succeed. With our ATS-friendly templates, you're one step closer to unlocking new opportunities and reaching your career goals.</span>
            </div >
            <Carousel />
        </div >
    )
}

export default Templates;