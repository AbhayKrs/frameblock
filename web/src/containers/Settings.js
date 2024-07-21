import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CLEAR_USER_STATE, UPDATE_USERDETAILS } from '../store/reducers/user.reducers';
import { update_user_info, fetch_user_info, delete_user } from '../utils/api';

import { FaCheck } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';

const Settings = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleDeleteUser = () => {
        delete_user(user.id).then(res => {
            dispatch(CLEAR_USER_STATE());
        })
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl m-auto rounded-lg p-4 md:p-10">
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-1'>
                    <h1 className="font-caviar text-4xl font-bold text-gray-700 dark:text-gray-300">Settings</h1>
                    <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-400">If you want, you can enter your preferences below to get job offers based on your requirements.</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className="font-caviar text-xl font-semibold text-gray-700 dark:text-gray-200 ">Your Account</h1>
                    <div className='flex flex-col gap-2'>
                        <p className="font-caviar font-bold text-sm tracking-wide text-gray-700 dark:text-red-500">Are you sure you want to delete your account? There is no going back if done.</p>
                        <button onClick={() => handleDeleteUser()} className='font-caviar font-bold text-md w-fit rounded-lg py-2 px-4 bg-red-500 dark:text-white'>Delete My Account</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Settings;