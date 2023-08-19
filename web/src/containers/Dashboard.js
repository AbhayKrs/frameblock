import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdClose, MdAdd } from "react-icons/md";
import { IoFilter, IoInformationCircleOutline } from "react-icons/io5";
import { TbEdit } from 'react-icons/tb';
import { BiSearchAlt, BiCopy } from "react-icons/bi";
import { RxDownload } from 'react-icons/rx';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Dashboard = () => {
    const navigate = useNavigate();
    const [draftSearch, setDraftSearch] = useState('');
    const [draft_title_edit, setDraftTitleEdit] = useState(true);
    const [draft_title, setDraftTitle] = useState('draft1');
    const [selectedTemplate, setSelectedTemplate] = useState('');

    return (
        <div className="flex flex-col items-center text-center">
            <h2 className="font-caviar text-3xl text-gray-700 dark:text-gray-300 mb-10">Hey Abhay Kumar, Welcome to your command center. Let's start building!</h2>
            <div className="flex flex-row space-x-5 w-full items-center justify-between mb-4">
                <div className="flex flex-row justify-between py-2 px-3 items-center border-2 border-neutral-400 dark:border-neutral-700 w-full rounded-lg">
                    <div className="flex flex-row space-x-3 items-center">
                        <IoFilter className="h-8 w-8 text-neutral-500 dark:text-neutral-300 cursor-pointer" />
                        <div className="flex flex-row space-x-2 items-center py-1 px-2 rounded-md border-2 border-neutral-500 dark:border-neutral-500">
                            <span className="font-caviar font-semibold text-gray-700 dark:text-neutral-300">test1</span>
                            <MdClose className="h-5 w-5 text-gray-700 dark:text-neutral-300" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <select id="template_options" value={selectedTemplate} class="w-full font-caviar bg-gray-50 dark:bg-neutral-700 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-700 dark:placeholder-gray-300 rounded-lg focus:outline-none px-3" onChange={(ev) => setSelectedTemplate(ev.target.value)}>
                            <option value="">Choose a template</option>
                            <option value="temp_1">temp_1</option>
                            <option value="temp_2">temp_2</option>
                            <option value="temp_3">temp_3</option>
                            <option value="temp_4">temp_4</option>
                        </select>
                        <div className="relative flex items-center">
                            <input className="font-caviar font-bold tracking-wide bg-transparent border-2 border-neutral-500 text-gray-700 dark:text-gray-300 placeholder:text-gray-600 dark:placeholder:text-neutral-400 rounded-lg pl-8 pr-4 py-1" value={draftSearch} type="text" placeholder="Search" onChange={(ev) => setDraftSearch(ev.target.value)} />
                            <BiSearchAlt className="h-5 w-5 absolute text-neutral-600 dark:text-neutral-400 left-2" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <button disabled={selectedTemplate.length == 0} className="flex flex-row space-x-1 h-fit items-center bg-gray-700 dark:bg-gray-300 rounded-lg py-1.5 px-3">
                        <MdAdd className="h-6 w-6 text-gray-300 dark:text-gray-700" />
                        <h2 className="font-black font-caviar text-lg whitespace-nowrap tracking-wide text-gray-300 dark:text-gray-700">Create Draft</h2>
                    </button>
                    <IoInformationCircleOutline data-tooltip-target="create-draft-info" className="h-6 w-6 text-gray-700 dark:text-gray-400" />
                    <div id="create-draft-info" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Tooltip content
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div >
            <div className="flex flex-col space-y-3 justify-between items-center w-full rounded-lg">
                {[0, 1, 2, 3].map(item => (
                    <div className="flex flex-row space-x-2 w-full bg-slate-300 dark:bg-neutral-900 items-center justify-between py-2 px-4 rounded-md shadow-lg">
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                maxLength={10}
                                disabled={draft_title_edit}
                                value={draft_title}
                                onChange={(ev) => setDraftTitle(ev.target.value)}
                                className="bg-transparent text-xl font-caviar dark:text-gray-300 font-bold focus:outline-none"
                                style={{
                                    width: draft_title + 'ch'
                                }}
                            />
                            <p className="text-start text-xs font-semibold tracking-wider font-caviar dark:text-gray-300">TEMPLATE: temp_1</p>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <div className="flex flex-row space-x-4">
                                <TbEdit onClick={() => navigate('/editor')} className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                                <BiCopy className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                                <RxDownload className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                                <RiDeleteBin5Line className="h-6 w-6 dark:text-gray-300 cursor-pointer" />
                            </div>
                            <p className="text-start text-xs font-semibold tracking-wider font-caviar dark:text-gray-300">Last Modified: 69 days ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Dashboard;