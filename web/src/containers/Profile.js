import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UPDATE_USERDETAILS } from '../store/reducers/user.reducers';
import { update_user_info, fetch_user_info } from '../utils/api';

import { FaCheck } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';

const Profile = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [enableNameEdit, setEnableNameEdit] = useState(false);
    const [enableEmailEdit, setEnableEmailEdit] = useState(false);
    const [enablePassEdit, setEnablePassEdit] = useState(false);

    const [editName, setEditName] = useState(null);
    const [editEmail, setEditEmail] = useState(null);
    const [editPass, setEditPass] = useState(null);

    const handleUpdateUserDetails = () => {
        const updateData = {
            name: editName,
            email: editEmail,
            pass: editPass
        }

        update_user_info(user.id, updateData).then(res1 => {
            fetch_user_info(user.id, user.isLoggedIn).then(res2 => {
                dispatch(UPDATE_USERDETAILS(res2));
            })
        })

        setEnableNameEdit(false);
        setEnableEmailEdit(false);
        setEnablePassEdit(false);
    }

    useEffect(() => {
        setEditName(user.info.name);
        setEditEmail(user.info.email);
    }, [user])

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl m-auto rounded-lg md:p-10">
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <h1 className="font-caviar text-4xl font-bold text-gray-700 dark:text-gray-200">Profile Details</h1>
                    <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-400">If you want, you can enter your preferences below to get job offers based on your requirements.</p>
                </div>
                <div className='flex flex-col gap-2 rounded-md p-4 border border-slate-900/10 dark:border-slate-50/[0.06]'>
                    <h1 className="font-caviar text-2xl font-bold text-gray-700 dark:text-gray-200 ">Your Details</h1>
                    <div className='flex flex-col gap-0.5 px-4'>
                        <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-300">Username</p>
                        <input disabled className="font-caviar w-full text-sm font-bold tracking-wide rounded-md p-2 bg-transparent text-gray-700 dark:text-gray-300 disabled:text-gray-400 disabled:dark:text-neutral-500 border-2 border-slate-400 dark:border-neutral-600" value={user.info.username} />
                    </div>
                    <div className='flex flex-col gap-0.5 px-4'>
                        <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-300">Name</p>
                        <div className='flex flex-row items-center gap-2'>
                            <input disabled={!enableNameEdit} type="text" className="font-caviar w-full text-sm font-bold tracking-wide rounded-md p-2 bg-transparent text-gray-700 dark:text-gray-300 disabled:text-gray-400 disabled:dark:text-neutral-500 border-2 border-slate-400 dark:border-neutral-600" value={editName} onChange={(ev) => setEditName(ev.target.value)} />
                            {enableNameEdit ?
                                <>
                                    <FaCheck onClick={() => handleUpdateUserDetails()} className="h-5 w-5 text-emerald-400 cursor-pointer" />
                                    <MdClose onClick={() => setEnableNameEdit(false)} className="h-7 w-7 text-gray-400 cursor-pointer" />
                                </>
                                :
                                <FiEdit3 onClick={() => setEnableNameEdit(true)} className="h-5 w-5 text-blue-600 cursor-pointer" />
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-0.5 px-4'>
                        <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-300">Email</p>
                        <div className='flex flex-row items-center gap-2'>
                            <input disabled={!enableEmailEdit} type="email" className="font-caviar w-full text-sm font-bold tracking-wide rounded-md p-2 bg-transparent text-gray-700 dark:text-gray-300 disabled:text-gray-400 disabled:dark:text-neutral-500 border-2 border-slate-400 dark:border-neutral-600" value={editEmail} onChange={(ev) => setEditEmail(ev.target.value)} />
                            {enableEmailEdit ?
                                <>
                                    <FaCheck onClick={() => handleUpdateUserDetails()} className="h-5 w-5 text-emerald-400 cursor-pointer" />
                                    <MdClose onClick={() => setEnableEmailEdit(false)} className="h-7 w-7 text-gray-400 cursor-pointer" />
                                </>
                                :
                                <FiEdit3 onClick={() => setEnableEmailEdit(true)} className="h-5 w-5 text-blue-600 cursor-pointer" />
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-0.5 px-4'>
                        <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-300">Password</p>
                        <div className='flex flex-row items-center gap-2'>
                            <input disabled={!enablePassEdit} type="password" className="font-caviar w-full text-sm font-bold tracking-wide rounded-md p-2 bg-transparent text-gray-700 dark:text-gray-300 disabled:text-gray-400 disabled:dark:text-neutral-500 border-2 border-slate-400 dark:border-neutral-600" value={editPass} defaultValue="12345678" onChange={(ev) => setEditPass(ev.target.value)} />
                            {enablePassEdit ?
                                <>
                                    <FaCheck onClick={() => handleUpdateUserDetails()} className="h-5 w-5 text-emerald-400 cursor-pointer" />
                                    <MdClose onClick={() => setEnablePassEdit(false)} className="h-7 w-7 text-gray-400 cursor-pointer" />
                                </>
                                :
                                <FiEdit3 onClick={() => setEnablePassEdit(true)} className="h-5 w-5 text-blue-600 cursor-pointer" />
                            }
                        </div>
                    </div>
                    <h1 className="font-caviar text-2xl font-bold text-gray-700 dark:text-gray-200 ">Additional Details</h1>
                    <div className='flex flex-col gap-0.5 px-4'>
                        <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-300">Current Role</p>
                        <input type="text" className="font-caviar w-full text-sm font-bold tracking-wide rounded-md p-2 bg-transparent text-gray-700 dark:text-gray-300 border-2 border-slate-400 dark:border-neutral-600" value={user.additional_info.role} />
                    </div>
                    <div className='flex flex-col gap-0.5 px-4'>
                        <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-300">Contact</p>
                        <input type="tel" className="font-caviar w-full text-sm font-bold tracking-wide rounded-md p-2 bg-transparent text-gray-700 dark:text-gray-300 border-2 border-slate-400 dark:border-neutral-600" value={user.additional_info.contact} />
                    </div>
                    <div className='flex flex-col gap-0.5 px-4'>
                        <p className="font-caviar text-sm font-bold tracking-wide text-gray-700 dark:text-neutral-300">Primary Skills</p>
                        <input type="text" className="font-caviar w-full text-sm font-bold tracking-wide rounded-md p-2 bg-transparent text-gray-700 dark:text-gray-300 border-2 border-slate-400 dark:border-neutral-600" value={user.additional_info.p_skills} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;