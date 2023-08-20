import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { IoCloseSharp } from 'react-icons/io5';

import Carousel from './Carousel';
import { useSelector } from 'react-redux';

export const TemplateModal = (props) => {
    const { open, onClose, createDraft } = props;
    const common = useSelector(state => state.common);

    return (
        <div className={`${open ? 'flex' : 'hidden'} fixed w-full inset-0 z-50 overflow-hidden justify-center items-center animated fadeIn faster`} style={{ background: 'rgba(0, 0, 0, .7)' }}>
            <div className="relative flex flex-col gap-4 items-baseline p-5 m-auto bg-slate-100 dark:bg-neutral-800 lg:w-6/12 sm:w-11/12 xs:w-11/12 rounded-xl z-50">
                <IoCloseSharp onClick={onClose} className='w-8 h-8 absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-gray-400' />
                <h1 className='text-neutral-700 dark:text-gray-300 text-3xl font-semibold font-caviar'>Select a Template</h1>
                {open && <Carousel btnTitle="Use" templates={common.templates} handleClick={createDraft} />}
            </div>
        </div>
    )
}