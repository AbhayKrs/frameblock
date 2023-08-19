import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

import { Pagination, Mousewheel, Keyboard, EffectCards } from 'swiper/modules';

import TemplateSample from '../assets/images/template-sample.jpg';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import "../styles/Carousel.css";


const TemplateSlide = ({ children }) => {
    const navigate = useNavigate();
    return (
        <div className='relative'>
            <img className='h-full rounded-lg' src={TemplateSample} />
            <div id="active-text" class="absolute flex inset-0 m-auto h-fit flex-row items-center p-2 w-full bg-slate-300 dark:bg-neutral-800">
                <div>
                    <h1 className='font-caviar font-bold text-2xl text-gray-700 dark:text-gray-100'>The Eager</h1>
                    <h2 className='font-sourcesans font-semibold text-xs text-gray-500 dark:text-gray-300'>Minimalistic, dynamic and made from the lightest components.</h2>
                </div>
                <FaChevronRight onClick={() => navigate('/editor')} className="h-10 w-10 text-gray-700 dark:text-gray-300 cursor-pointer" />
            </div>
        </div>
    )
}

const Carousel = () => {
    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                mousewheel={true}
                keyboard={true}
                modules={[EffectCards, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(item => (
                    <SwiperSlide>
                        <TemplateSlide>{item}</TemplateSlide>
                        {/* <img className='h-full w-full rounded-lg' src={TemplateSample} /> */}
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}

export default Carousel;