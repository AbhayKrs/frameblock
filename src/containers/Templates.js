import TemplateSample from '../assets/images/template-sample.jpg'
import Carousel from '../components/Carousel';

const Templates = () => {
    return (
        <div
        //  className='relative flex flex-col w-full items-center'
        >
            <h1 className='font-caviar text-5xl dark:text-gray-300'>Templates</h1>
            <ul className='font-caviar tracking-wide py-2 pl-12 text-gray-700 dark:text-gray-300'>
                <li>
                    <span className='font-semibold'>Fuel Your Career Path:</span> Choose from our captivating resume templates, meticulously designed to catch the eye of both recruiters and Applicant Tracking Systems (ATS).
                </li>
                <li>
                    <span className='font-semibold'>Stand Out Effectively:</span> Let your skills and experience shine through a format optimized for ATS compatibility, ensuring your resume doesn't get lost in the digital shuffle.
                </li>
                <li>
                    <span className='font-semibold'>Impress with Style:</span> Elevate your application with visually appealing layouts that make a lasting impression on employers, increasing your chances of landing your dream job.
                </li>
                <li>
                    <span className='font-semibold'>Your Success, Our Priority:</span> We're dedicated to helping you succeed. With our ATS-friendly templates, you're one step closer to unlocking new opportunities and reaching your career goals.
                </li >
            </ul >
            <Carousel />
        </div >
    )
}

export default Templates;