import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import TemplateSample from '../assets/images/template-sample.jpg';
import "../styles/carousel.scss";
import { TbEdit } from "react-icons/tb";

const Carousel = (props) => {
    const { btnTitle, templates, handleClick } = props;
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={45}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="mySwiper"
        >
            {templates.length > 0 && templates.map(item => (
                <SwiperSlide key={item._id}>
                    <div className='group relative flex flex-col gap-2 rounded-md border border-slate-900/10 dark:border-slate-50/[0.06] p-4'>
                        <img className='h-full rounded-lg' src={TemplateSample} />
                        <div id="active-text" className="flex flex-col h-full w-full">
                            <h1 className='font-caviar tracking-wide font-bold text-2xl text-gray-700 dark:text-gray-300'>{item.template_name}</h1>
                            <h2 className='font-caviar tracking-wide text-sm text-neutral-800 dark:text-gray-300'>Minimalistic, dynamic and made from the lightest components.</h2>
                        </div>
                        <div className='hidden group-hover:block absolute inset-0 content-center text-center backdrop-brightness-50 bg-slate-300/75 dark:bg-neutral-900/75 rounded-md'>
                            <button onClick={() => handleClick(item._id)} className='m-auto w-fit rounded-full p-4 shadow-lg dark:shadow-black/25 bg-slate-200 dark:bg-neutral-900'>
                                <TbEdit className='h-6 w-6 m-auto text-blue-600' />
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Carousel;