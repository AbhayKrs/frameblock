import { useState } from "react";
import { MdClose, MdOutlineAddToPhotos } from 'react-icons/md';
import { IoFilter } from 'react-icons/io5';

const Dashboard = () => {
    // const [draftView, setDraftView] = useState('normal');
    const [pageWidth, setPageWidth] = useState(52);

    return (
        <div className="flex flex-col space-y-10 items-center text-center">
            <h2 className="font-caviar text-2xl text-gray-700 dark:text-gray-300">Hey Abhay Kumar, Welcome to your central command for control and insights. Let's start building!</h2>
            <div className="flex flex-row space-x-5 w-full justify-between">
                <div className="flex flex-row space-x-2 py-2 px-4 items-center border-2 border-neutral-700 w-full rounded-lg">
                    <IoFilter className="h-6 w-6 text-gray-700 dark:text-gray-300 cursor-pointer" />
                    <div className="flex flex-row space-x-2 items-center py-1 px-2 rounded-md border-2 border-gray-400">
                        <span className="font-caviar font-semibold text-gray-700 dark:text-gray-400">test1</span>
                        <MdClose className="text-gray-700 dark:text-gray-400" />
                    </div>
                </div>
                <button className="flex flex-row space-x-2 items-center bg-gray-300 rounded-lg py-2 px-4">
                    <MdOutlineAddToPhotos className="h-6 w-6" />
                    <span className="font-bold font-caviar text-lg whitespace-nowrap tracking-wide text-gray-300 dark:text-gray-700">Create Draft</span>
                </button>
            </div>
        </div>
    )
}

export default Dashboard;