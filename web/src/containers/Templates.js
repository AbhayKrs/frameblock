import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { create_user_draft, fetch_user_drafts } from '../utils/api';
import { SET_USER_DRAFTS } from '../store/reducers/draft.reducers';

import Carousel from '../components/Carousel';
import TemplateSample from '../assets/images/template-sample.jpg';
import { TbHammer } from "react-icons/tb";


const Templates = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const common = useSelector(state => state.common);
    const user = useSelector(state => state.user);

    const handleCreateDraft = (templateID) => {
        const payload = {
            templateID: templateID,
            userID: user.id,
        }
        create_user_draft(payload).then(() => {
            fetch_user_drafts(user.id).then(res => {
                dispatch(SET_USER_DRAFTS(res));
            })
        })
        navigate('/dashboard');
    }

    return (
        <div className='relative flex flex-col space-y-2 w-full items-center'>
            <h1 className='font-caviar font-bold text-5xl text-gray-700 dark:text-gray-300'>Templates</h1>
            <div className='flex flex-row space-x-4 font-caviar tracking-wide py-2 text-gray-700 dark:text-gray-300'>
                <span className='leading-5'><span className='font-bold'>Fuel Your Career Path:</span> Choose from our captivating resume templates, meticulously designed to catch the eye of both recruiters and Applicant Tracking Systems (ATS).</span>
                <span className='leading-5'><span className='font-bold'>Stand Out Effectively:</span> Let your skills and experience shine through a format optimized for ATS compatibility, ensuring your resume doesn't get lost in the digital shuffle.</span>
                <span className='leading-5'><span className='font-bold'>Impress with Style:</span> Elevate your application with visually appealing layouts that make a lasting impression on employers, increasing your chances of landing your dream job.</span>
                <span className='leading-5'><span className='font-bold'>Your Success, Our Priority:</span> We're dedicated to helping you succeed. With our ATS-friendly templates, you're one step closer to unlocking new opportunities and reaching your career goals.</span>
            </div>
            <div className='grid grid-cols-3 gap-4 md:gap-10 w-full md:w-10/12'>
                {common.templates.map(item => {
                    return (
                        <div className='relative flex flex-col gap-2 rounded-md bg-slate-300 dark:bg-neutral-900 p-2'>
                            <img className='h-full rounded-lg' src={TemplateSample} />
                            <button onClick={() => handleCreateDraft(item._id)} className='absolute top-1 right-1 p-2 rounded-bl-md bg-slate-300 dark:bg-neutral-900'>
                                <TbHammer className='h-6 w-6 text-neutral-800 dark:text-gray-100' />
                            </button>
                            <div id="active-text" className="flex flex-col h-full w-full">
                                <h1 className='font-caviar font-bold text-2xl text-gray-700 dark:text-gray-200'>{item.template_name}</h1>
                                <h2 className='font-sourcesans font-semibold text-sm text-neutral-800 dark:text-gray-300'>Minimalistic, dynamic and made from the lightest components.</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <Carousel btnTitle="Create Draft" templates={common.templates} handleClick={handleCreateDraft} /> */}
        </div >
    )
}

export default Templates;