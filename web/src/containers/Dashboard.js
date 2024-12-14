import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { create_user_draft, fetch_user_drafts, delete_user_draft, duplicate_user_draft, edit_user_draft } from "../utils/api";
import { SET_USER_DRAFTS, SET_EDITOR_DATA } from "../store/reducers/draft.reducers";
import { TemplateModal } from "../components/Modal";

import { MdClose, MdAdd } from "react-icons/md";
import { IoFilter, IoClose, IoInformationCircleOutline } from "react-icons/io5";
import { IoIosTimer } from 'react-icons/io';
import { TbEdit } from 'react-icons/tb';
import { BiSearchAlt, BiCheck, BiCopy } from "react-icons/bi";
import { RxDownload } from 'react-icons/rx';
import { RiDeleteBin5Line } from 'react-icons/ri';

const useTimeMenuOut = (ref, active, setActive) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert('You clicked outside');
                setActive(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [ref]);
}

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [draftSearch, setDraftSearch] = useState('');
    const [draft_name, setDraftName] = useState('');
    const [templateModal, setTemplateModal] = useState(false);
    const [timeFilter, setTimeFilter] = useState('');
    const [timeMenu, setTimeMenu] = useState(false);

    const user = useSelector(state => state.user);
    const draft = useSelector(state => state.draft);

    const timeMenuRef = useRef(null);
    useTimeMenuOut(timeMenuRef, timeMenu, setTimeMenu);

    useEffect(() => {
        user.id.length > 0 && fetch_user_drafts(user.id).then(res => {
            dispatch(SET_USER_DRAFTS(res));
        })
    }, [user])

    useEffect(() => {
        if (draftSearch.length === 0) {
            user.id.length > 0 && fetch_user_drafts(user.id).then(res => {
                dispatch(SET_USER_DRAFTS(res));
            })
        } else {
            let drafts = draft?.userDrafts;
            if (drafts.length > 0) {
                drafts = drafts.filter(item => item.draft_name.toLowerCase().includes(draftSearch))
                dispatch(SET_USER_DRAFTS(drafts));
            }
        }
    }, [draftSearch])

    const createDraft = (templateID) => {
        const payload = {
            templateID: templateID,
            userID: user.id,
        }
        create_user_draft(payload).then(() => {
            fetch_user_drafts(user.id).then(res => {
                dispatch(SET_USER_DRAFTS(res));
            })
        })
        setTemplateModal(false);
    }

    const deleteDraft = (draftID) => {
        delete_user_draft(draftID).then(() => {
            fetch_user_drafts(user.id).then(res => {
                console.log('test', res)
                dispatch(SET_USER_DRAFTS(res));
            })
        })
    }

    const duplicateDraft = (draftID) => {
        const payload = {
            draftID: draftID
        }

        duplicate_user_draft(payload).then(() => {
            fetch_user_drafts(user.id).then(res => {
                dispatch(SET_USER_DRAFTS(res));
            })
        })
    }

    const updateDraftName = (draft) => {
        const payload = {
            templateID: draft.template_id,
            template_name: draft.template_name,
            draft_name: draft_name,
            type: 'primary'
        }

        edit_user_draft(draft._id, payload).then(() => {
            fetch_user_drafts(user.id).then(res => {
                dispatch(SET_USER_DRAFTS(res));
            })
        })
    }

    const handleEditClick = (item) => {
        navigate(`/editor?draftid=${item._id}&tid=${item.template_id}`)
    }

    const selectTimeFilter = async (option) => {
        setTimeFilter(option);
        setTimeMenu(false);

        let drafts = [];
        await fetch_user_drafts(user.id).then(res => {
            drafts = [...res];
        })

        switch (option) {
            case 'hour': {
                drafts = drafts.filter(item => {
                    const today = new Date();
                    const created = new Date(item.created_on);
                    const past_hour = new Date(today.getTime() - (1000 * 60 * 60));
                    console.log('cond', (today - created) < Math.abs(today - past_hour))
                    if ((today - created) < Math.abs(today - past_hour)) return item;
                })
                dispatch(SET_USER_DRAFTS(drafts));
                break;
            }
            case 'week': {
                drafts = drafts.filter(item => {
                    const today = new Date();
                    const created = new Date(item.created_on);
                    const past_week = new Date(today.getTime() - (1000 * 60 * 60 * 24 * 7));
                    console.log('cond', (today - created) < Math.abs(today - past_week))

                    if ((today - created) < Math.abs(today - past_week)) return item;
                })
                dispatch(SET_USER_DRAFTS(drafts));
                break;
            }
            case 'month': {
                drafts = drafts.filter(item => {
                    const today = new Date();
                    const created = new Date(item.created_on);
                    const past_month = new Date(today.getTime() - (1000 * 60 * 60 * 24 * 30));
                    console.log('cond', (today - created) < Math.abs(today - past_month))

                    if ((today - created) < Math.abs(today - past_month)) return item;

                })
                dispatch(SET_USER_DRAFTS(drafts));
                break;
            }
            case 'year': {
                drafts = drafts.filter(item => {
                    const today = new Date();
                    const created = new Date(item.created_on);
                    const past_year = new Date(today.getTime() - (1000 * 60 * 60 * 24 * 365));
                    console.log('cond', (today - created) < Math.abs(today - past_year))

                    if ((today - created) < Math.abs(today - past_year)) return item;
                })
                dispatch(SET_USER_DRAFTS(drafts));
                break;
            }
            default: {
                dispatch(SET_USER_DRAFTS(drafts));
                break;
            }
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="font-nunito text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">Hey Abhay Kumar, Welcome to your command center. Let's start building!</h2>
            <div className="flex flex-row space-x-5 w-full items-center justify-between mb-4">
                <div className="flex flex-col md:flex-row gap-2 justify-between py-2 px-3 border-2 border-neutral-400 dark:border-neutral-400 w-full rounded-lg">
                    <div className="flex flex-row gap-3 w-full justify-between items-center">
                        <div ref={timeMenuRef} className={`flex ${timeFilter.length > 0 ? 'items-baseline' : 'items-center'} relative`}>
                            <button onClick={() => setTimeMenu(true)} className={`rounded-full ${timeMenu && 'p-1 bg-slate-100 dark:bg-neutral-700'}`}>
                                <IoIosTimer className="h-7 w-7 dark:text-gray-300" />
                            </button>
                            {timeFilter.length > 0 && <span className="font-nunito text-xs dark:text-gray-300">{timeFilter.toUpperCase()}</span>}
                            {timeMenu && <div id="dropdownDots" className="absolute top-10 left-0 z-10 flex flex-col rounded-lg shadow w-32 bg-slate-100 dark:bg-neutral-700">
                                <ul className="p-1 font-nunito font-semibold text-sm text-neutral-800 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                    <li onClick={() => selectTimeFilter('')} className="block text-start px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 dark:hover:text-white cursor-pointer">Clear</li>
                                    <li onClick={() => selectTimeFilter('hour')} className="block text-start px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 dark:hover:text-white cursor-pointer">Past Hour</li>
                                    <li onClick={() => selectTimeFilter('week')} className="block text-start px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 dark:hover:text-white cursor-pointer">Past Week</li>
                                    <li onClick={() => selectTimeFilter('month')} className="block text-start px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 dark:hover:text-white cursor-pointer">Past Month</li>
                                    <li onClick={() => selectTimeFilter('year')} className="block text-start px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 dark:hover:text-white cursor-pointer">Past Year</li>
                                </ul>
                            </div>}
                        </div>
                        <div className="relative flex items-center">
                            <input className="font-nunito font-bold tracking-wide bg-transparent border-2 border-neutral-500 dark:border-gray-300 text-gray-700 dark:text-gray-300 placeholder:text-gray-600 dark:placeholder:text-neutral-300 rounded-lg pl-8 pr-4 py-1" value={draftSearch} type="text" placeholder="Search" onChange={(ev) => setDraftSearch(ev.target.value)} />
                            <BiSearchAlt className="h-5 w-5 absolute text-neutral-600 dark:text-gray-300 left-2" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <button onClick={() => setTemplateModal(true)} className="flex flex-row space-x-1 h-fit items-center bg-neutral-800 dark:bg-gray-300 rounded-lg p-1">
                        <MdAdd className="h-8 w-8 text-gray-300 dark:text-gray-700" />
                    </button>
                </div>
            </div >
            <div className="flex flex-col space-y-3 justify-between items-center w-full rounded-lg">
                {draft?.userDrafts.map((item, index) => (
                    <div className="flex flex-row space-x-2 w-full items-center justify-between py-2 px-4 rounded-md border-2 border-slate-900/10 dark:border-slate-50/10">
                        <div className="flex flex-col gap-1">
                            <p className="bg-transparent text-lg w-fit font-nunito dark:text-gray-300 font-bold focus:outline-none">{item.draft_name}</p>
                            <p className="text-start text-xs font-semibold tracking-wider font-nunito dark:text-gray-300">TEMPLATE: {item.template_name}</p>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <div className="flex flex-row space-x-4">
                                <TbEdit onClick={() => handleEditClick(item)} className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                                <BiCopy onClick={() => duplicateDraft(item._id)} className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                                <RxDownload className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                                <RiDeleteBin5Line onClick={() => deleteDraft(item._id)} className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-0 md:gap-2 items-end text-end">
                                <p className="text-xs font-semibold tracking-wider font-nunito dark:text-gray-300">Created On: {moment(item.created_on).format('DD/MM/YYYY, h:mm a')}</p>
                                <span className="hidden md:block text-xs font-semibold tracking-wider font-nunito dark:text-gray-300">&#9679;</span>
                                <p className="text-xs font-semibold tracking-wider font-nunito dark:text-gray-300">Last Modified: {moment(item.last_modified).format('DD/MM/YYYY, h:mm a')}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <TemplateModal
                open={templateModal}
                onClose={() => setTemplateModal(false)}
                createDraft={(tempID) => createDraft(tempID)}
            />
        </div >
    )
}

export default Dashboard;