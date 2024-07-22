import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { create_user_draft, fetch_user_drafts } from '../utils/api';
import { SET_USER_DRAFTS } from '../store/reducers/draft.reducers';

import Carousel from '../components/Carousel';

const Templates = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pageRef = useRef(null);
    const [slideSpace, setSlideSpace] = useState(window.innerWidth <= 768 ? 10 : window.innerWidth <= 1020 ? 25 : 45);
    const [slideCount, setSlideCount] = useState(window.innerWidth <= 768 ? 2 : window.innerWidth <= 1020 ? 3 : 4);

    const common = useSelector(state => state.common);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            const val = Math.round(entries[0].contentRect.width);
            console.log("Test", val);

            if (val <= 768) {
                setSlideSpace(10);
                setSlideCount(2);
            } else if (val <= 1020) {
                setSlideSpace(25);
                setSlideCount(3);
            } else {
                setSlideSpace(45)
                setSlideCount(4);
            }
        });
        observer.observe(pageRef.current);
        return () => pageRef.current && observer.unobserve(pageRef.current)
    }, [])

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
        <div ref={pageRef} className='relative flex flex-col space-y-4 w-full'>
            <div className='flex flex-col space-y-2'>
                <h1 className='font-caviar font-bold text-5xl text-gray-700 dark:text-gray-300'>Templates</h1>
                <div className='flex flex-row space-x-4 lg:space-x-8 font-caviar tracking-wide py-2 text-gray-700 dark:text-gray-300'>
                    <span className='text-lg tracking-wide leading-5'><span className='font-bold'>Fuel Your Career Path:</span> Choose from our captivating resume templates, meticulously designed to catch the eye of both recruiters and Applicant Tracking Systems (ATS).</span>
                    <span className='text-lg tracking-wide leading-5'><span className='font-bold'>Stand Out Effectively:</span> Let your skills and experience shine through a format optimized for ATS compatibility, ensuring your resume doesn't get lost in the digital shuffle.</span>
                    <span className='text-lg tracking-wide leading-5'><span className='font-bold'>Impress with Style:</span> Elevate your application with visually appealing layouts that make a lasting impression on employers, increasing your chances of landing your dream job.</span>
                    <span className='text-lg tracking-wide leading-5'><span className='font-bold'>Your Success, Our Priority:</span> We're dedicated to helping you succeed. With our ATS-friendly templates, you're one step closer to unlocking new opportunities and reaching your career goals.</span>
                </div>
            </div>
            {/* <div className='flex flex-row gap-4 overflow-x-auto'>
                {common.templates.map(item => {
                    return (
                        <div className='group relative flex flex-col gap-2 min-w-[22rem] rounded-md border border-slate-900/10 dark:border-slate-50/[0.06] p-4'>
                            <img className='h-full rounded-lg' src={TemplateSample} />
                            <div id="active-text" className="flex flex-col h-full w-full">
                                <div className='flex flex-row justify-between'>
                                    <h1 className='font-caviar tracking-wide font-bold text-2xl text-gray-700 dark:text-gray-300'>{item.template_name}</h1>
                                </div>
                                <h2 className='font-caviar tracking-wide text-md text-neutral-800 dark:text-gray-300'>Minimalistic, dynamic and made from the lightest components.</h2>
                            </div>
                            <div className='hidden group-hover:block absolute inset-0 content-center text-center backdrop-brightness-50 bg-slate-300/75 dark:bg-neutral-900/75 rounded-md'>
                                <button onClick={() => handleCreateDraft(item._id)} className='m-auto w-fit rounded-full p-4 shadow-lg dark:shadow-black/25 bg-slate-200 dark:bg-neutral-900'>
                                    <TbEdit className='h-6 w-6 m-auto text-blue-600' />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div> */}
            <Carousel slideSpace={slideSpace} slideCount={slideCount} btnTitle="Create Draft" templates={common.templates} handleClick={handleCreateDraft} />
        </div >
    )
}

export default Templates;