import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import TemplateSample from '../assets/images/template-sample.jpg';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import "../styles/Carousel.css";
import { useNavigate } from 'react-router-dom';

const TemplateSlide = ({ children }) => {
    const navigate = useNavigate();
    return (
        <>
            <div id="active-text" class="hidden flex-row items-center p-2 w-full">
                <div>
                    <h1 className='font-caviar font-bold text-2xl text-gray-700 dark:text-gray-100'>The Eager</h1>
                    <h2 className='font-sourcesans font-semibold text-xs text-gray-500 dark:text-gray-300'>Minimalistic, dynamic and made from the lightest components.</h2>
                </div>
                <FaChevronRight onClick={() => navigate('/editor')} className="h-10 w-10 text-gray-700 dark:text-gray-300 cursor-pointer" />
            </div>
            <img className='brightness-75 h-fit w-10/12 rounded-lg' src={TemplateSample} />
        </>
    )
}

const SlideNextButton = () => {
    const swiper = useSwiper();

    return (
        <button className='absolute inset-y-0 right-0 z-50' onClick={() => swiper.slideNext()}>
            <FaChevronRight className='h-14 w-14 text-neutral-800 hover:text-neutral-900' />
        </button>
    );
}

const SlidePrevButton = () => {
    const swiper = useSwiper();

    return (
        <button className='absolute inset-y-0 left-0 z-50' onClick={() => swiper.slidePrev()}>
            <FaChevronLeft className='h-14 w-14 text-neutral-800 hover:text-neutral-900' />
        </button>
    );
}


const Carousel = () => {
    return (
        <>
            <Swiper
                initialSlide={6}
                slidesPerView={4}
                spaceBetween={0}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="w-full h-fit px-5 relative"
            >
                <SlideNextButton />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map(item => (
                    <SwiperSlide className='flex place-content-center items-center'>
                        <TemplateSlide>{item}</TemplateSlide>
                    </SwiperSlide>
                ))}
                <SlidePrevButton />
            </Swiper >
        </>
    )
}

export default Carousel;