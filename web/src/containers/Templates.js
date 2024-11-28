import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { create_user_draft, fetch_user_drafts } from '../utils/api';
import { SET_USER_DRAFTS } from '../store/reducers/draft.reducers';

import templates from '../assets/images/templates';
import { TbEdit } from "react-icons/tb";

const Templates = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { tmp1, tmp2, tmp3, tmp4 } = templates;

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

    const fetchTmpImage = (name) => {
        switch (name) {
            case "t'Elegance": return tmp1;
            case "t'Simplicity": return tmp2;
            case "t'Shadow": return tmp3;
            case "t'Serenity": return tmp4;
            default: return tmp1;
        }
    }

    return (
        <div ref={pageRef} className='relative flex flex-row gap-4 w-full'>
            <div className='basis-1/4 flex flex-col space-y-4 font-nunito tracking-wide text-gray-700 dark:text-gray-300'>
                <h1 className='font-nunito font-bold text-3xl text-gray-700 dark:text-gray-300'>Templates</h1>
                <span className='text-base tracking-wide leading-5'><span className='font-bold'>Fuel Your Career Path:</span> Choose from our captivating resume templates, meticulously designed to catch the eye of both recruiters and Applicant Tracking Systems (ATS).</span>
                <span className='text-base tracking-wide leading-5'><span className='font-bold'>Stand Out Effectively:</span> Let your skills and experience shine through a format optimized for ATS compatibility, ensuring your resume doesn't get lost in the digital shuffle.</span>
                <span className='text-base tracking-wide leading-5'><span className='font-bold'>Impress with Style:</span> Elevate your application with visually appealing layouts that make a lasting impression on employers, increasing your chances of landing your dream job.</span>
                <span className='text-base tracking-wide leading-5'><span className='font-bold'>Your Success, Our Priority:</span> We're dedicated to helping you succeed. With our ATS-friendly templates, you're one step closer to unlocking new opportunities and reaching your career goals.</span>
            </div>
            <div className='basis-3/4 grid grid-cols-3 gap-4 overflow-auto scrollbar px-2' style={{ maxHeight: "calc(100vh - 125px)" }}>
                {common.templates.length > 0 && common.templates.map((item, index) => (
                    <div className='group relative flex flex-col gap-2 rounded-md border border-slate-900/10 dark:border-slate-50/[0.06] p-4'>
                        <img className='h-full rounded-lg' src={fetchTmpImage(item.template_name)} />
                        <div id="active-text" className="flex flex-col h-full w-full">
                            <h1 className='font-nunito tracking-wide font-bold text-2xl text-gray-700 dark:text-gray-300'>{item.template_name}</h1>
                            <h2 className='font-nunito tracking-wide text-sm text-neutral-800 dark:text-gray-300'>Minimalistic, dynamic and made from the lightest components.</h2>
                        </div>
                        <div className='hidden group-hover:block absolute inset-0 content-center text-center backdrop-brightness-50 bg-slate-300/75 dark:bg-neutral-900/75 rounded-md'>
                            <button onClick={() => handleCreateDraft(item._id)} className='m-auto w-fit rounded-full p-4 shadow-lg dark:shadow-black/25 bg-slate-200 dark:bg-neutral-900'>
                                <TbEdit className='h-6 w-6 m-auto text-indigo-500' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Templates;