import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

import { Mousewheel, Keyboard, EffectCards } from 'swiper/modules';

import TemplateSample from '../assets/images/template-sample.jpg';
import "../styles/Carousel.css";

const Carousel = (props) => {
    const { btnTitle, templates, handleClick } = props;
    return (
        <Swiper
            effect={'cards'}
            grabCursor={true}
            mousewheel={true}
            keyboard={true}
            modules={[EffectCards, Mousewheel, Keyboard]}
            className="mySwiper"
        >
            {templates.length > 0 && templates.map(item => (
                <SwiperSlide key={item._id}>
                    <div className='relative'>
                        <img className='h-full rounded-lg' src={TemplateSample} />
                        <div id="active-text" className="absolute flex flex-col space-y-1 inset-0 m-auto h-fit flex-row items-center p-2 w-full bg-slate-300 dark:bg-neutral-800">
                            <h1 className='font-caviar font-bold text-2xl text-gray-700 dark:text-gray-100'>{item.template_name}</h1>
                            <h2 className='font-sourcesans font-semibold text-xs text-gray-500 dark:text-gray-300'>Minimalistic, dynamic and made from the lightest components.</h2>
                            <button onClick={() => handleClick(item._id)} className='font-caviar text-sm py-1 px-3 rounded-lg dark:text-gray-700 bg-gray-700 dark:bg-gray-100'>{btnTitle}</button>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Carousel;