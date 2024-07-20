import { BsGithub } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="flex flex-row justify-between items-center w-full mt-auto pt-8 pb-2 bg-slate-200 dark:bg-neutral-800">
            <div className="flex flex-row items-center space-x-0.5">
                <h2 className="text-lg font-sourcesans font-bold text-neutral-700 dark:text-gray-300">©</h2>
                <h2 className="font-caviar font-bold text-neutral-700 dark:text-gray-300">2024 frameblock</h2>
            </div>
            <div className="flex flex-row items-center space-x-8">
                <h2 className="font-caviar font-bold text-neutral-700 dark:text-gray-300 cursor-pointer	hover:text-blue-600">privacy and terms</h2>
                <h2 className="font-caviar font-bold text-neutral-700 dark:text-gray-300 cursor-pointer	hover:text-blue-600">compliance</h2>
                <BsGithub className="w-6 h-6 cursor-pointer text-neutral-700 dark:text-gray-200" />
            </div>
        </div>
    )
}

export default Footer;