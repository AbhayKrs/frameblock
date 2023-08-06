import React, { useState } from 'react';

const ThemeToggle = ({ toggle }) => {

    return (
        <div className='relative'>
            <button className='box-content block z-2 relative w-6 h-6 m-0 p-0 outline-none bg-none border-2 border-solid border-neutral-800 dark:border-neutral-200 rounded-full transition-all cursor-pointer' onClick={toggle}>
                <svg width="0" height="0" stroke="none">
                    <defs>
                        <clipPath id="myLightCurve" clipPathUnits="objectBoundingBox">
                            <path d="m 0 1 V 0.5 Q 0.5 0.25 1 0.5 V 1 z" />
                        </clipPath>
                        <clipPath id="myDarkCurve" clipPathUnits="objectBoundingBox">
                            <path d="m 0 1 V 0.5 Q 0.5 0.25 1 0.5 V 1 z" />
                        </clipPath>
                    </defs>
                </svg>
                <div style={{ clipPath: "url(#myDarkCurve)" }} className='absolute top-0 left-0 w-5 h-5 m-0.5 bg-neutral-800 dark:bg-neutral-200 rounded-full transition-all' />
            </button>
        </div>
    );
};

export default ThemeToggle;
