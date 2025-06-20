import React, { useState } from 'react';

import { IoCloseSharp } from 'react-icons/io5';
import { FaLock } from "react-icons/fa";

import Carousel from './Carousel';
import { useSelector } from 'react-redux';

export const TemplateModal = (props) => {
    const { open, onClose, createDraft } = props;
    const common = useSelector(state => state.common);
    const [selected, setSelected] = useState(null);

    return (
        <div className={`${open ? 'flex' : 'hidden'} fixed w-full inset-0 z-50 overflow-hidden justify-center items-center animated fadeIn faster`} style={{ background: 'rgba(0, 0, 0, .7)' }}>
            <div className="relative flex flex-col gap-4 items-baseline p-5 m-auto bg-slate-100 dark:bg-neutral-800 lg:w-6/12 sm:w-11/12 xs:w-11/12 rounded-xl z-50">
                <IoCloseSharp onClick={onClose} className='w-8 h-8 absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-gray-400' />
                <h1 className='text-neutral-700 dark:text-gray-300 text-3xl font-semibold font-nunito'>Select a Template</h1>
                <div className='flex flex-row gap-2'>
                    <div className='grid grid-cols-5 grid-flow-row gap-4 self-center'>
                        {common.templates.map((tmp, index) => {
                            return (
                                <div key={index} className='flex items-center gap-2 py-1 px-2 rounded-md'>
                                    {/* <input id="template" name="template" type="radio" onClick={() => setSelected(tmp._id)} /> */}
                                    {tmp.isLocked ?
                                        <FaLock className="h-3 w-3 text-neutral-600 dark:text-neutral-500 cursor-pointer" />
                                        :
                                        <input id="template" name="template" type="radio" onChange={() => setSelected(tmp)}
                                            style={{
                                                "WebkitAppearance": 'none',
                                            }}
                                            className="h-4 w-4 appearance-none align-middle rounded-md outline-none bg-slate-300 dark:bg-neutral-700 checked:bg-indigo-500 dark:checked:bg-indigo-500 cursor-pointer"
                                        />
                                    }
                                    <label htmlFor="template" className={tmp.isLocked ? 'font-nunito text-base text-neutral-600 dark:text-neutral-500' : 'font-nunito text-base tracking-wide text-neutral-600 dark:text-gray-300'}>{tmp.template_name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button className='ml-auto rounded-md py-1 px-3 text-slate-100 bg-neutral-700 dark:text-neutral-700 dark:bg-slate-100' onClick={() => createDraft(selected._id)}>Go</button>
            </div>
        </div>
    )
}