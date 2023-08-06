import { useState } from "react";

const Editor = () => {
    // const [draftView, setDraftView] = useState('normal');
    const [pageWidth, setPageWidth] = useState(52);

    return (
        <div className="border-4 border-neutral-700 p-2 rounded-md">
            <div
                style={{ height: 'calc(100vh - 4.75rem)' }}
                className="scrollbar flex overflow-auto justify-center"
            >
                <div
                    style={{
                        width: pageWidth + "em",
                        height: (pageWidth * 1.414) + "em"
                    }}
                    className="relative bg-white p-4 grid grid-cols-3 gap-4"
                >
                    <input className="border-2 border-gray-700 px-2 rounded" name="fullname" type="text" placeholder="fullname" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="role" type="text" placeholder="role" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_phonecode" type="text" placeholder="socials_phonecode" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_phonenumber" type="text" placeholder="socials_phonenumber" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_address" type="text" placeholder="socials_address" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_email" type="text" placeholder="socials_email" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_portfolio_label" type="text" placeholder="socials_portfolio_label" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_portfolio_value" type="text" placeholder="socials_portfolio_value" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_linkedin_label" type="text" placeholder="socials_linkedin_label" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_linkedin_value" type="text" placeholder="socials_linkedin_value" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_github_label" type="text" placeholder="socials_github_label" />
                    <input className="border-2 border-gray-700 px-2 rounded" name="socials_github_value" type="text" placeholder="socials_github_value" />
                </div>
            </div>
        </div>
    )
}

export default Editor;