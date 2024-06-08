import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import img2 from '../assets/slider-resources/andy-holmes-XaQ-aaMJKgc-unsplash.jpg'
// import img4 from '../assets/slider-resources/handriyanto-setiadi-Kd9zljneM1A-unsplash.jpg'

const Slider = () => {
    return (
        <div className="max-h-screen">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src='https://i.ibb.co/zRWqKkD/beautiful-bride-with-her-husband-park-1157-19036.jpg' alt="" className='w-full h-screen' />
                    <div className='absolute text-2xl lg:text-7xl font-bold font-serif top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-[#FFC436] opacity-50'>
                        <h1 className='text-center'>Welcome To <br />"MEMORY" Family<br /> With Millions Of Joys</h1>
                    </div>
                    <div class="absolute z-10 inset-0 bg-black opacity-70"></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://img.freepik.com/free-photo/human-resources-concept-with-hand_23-2150389095.jpg?w=996&t=st=1707426103~exp=1707426703~hmac=4312f831857d3d5cd5ce19fdcad5ce24a0946e2d2f558b3838d6833e959218f3' alt="" className='w-full h-screen' />
                    <div className='absolute text-2xl lg:text-7xl font-bold font-serif top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-[#FFC436] opacity-50'>
                        <h1 className='text-center'>"ForeverTies <br /> Building Memories,<br /> One Union at a Time"</h1>
                    </div>
                    <div class="absolute z-10 inset-0 bg-black opacity-70"></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://img.freepik.com/free-photo/human-resources-concept-with-hand_23-2150389095.jpg?w=996&t=st=1707426103~exp=1707426703~hmac=4312f831857d3d5cd5ce19fdcad5ce24a0946e2d2f558b3838d6833e959218f3' alt="" className='w-full h-screen' />
                    <div className='absolute text-2xl lg:text-7xl font-bold font-serif top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-[#FFC436] opacity-50'>
                        <h1 className='text-center'>"Timeless Love <br /> Creating Beautiful <br /> Memories"</h1>
                    </div>
                    <div class="absolute z-10 inset-0 bg-black opacity-70"></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='https://img.freepik.com/premium-photo/man-holding-phone-with-online-shopping-icon-screen_218381-7023.jpg?w=996' alt="" className='w-full h-screen' />
                    <div className='absolute text-2xl lg:text-7xl font-bold font-serif top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-[#FFC436] opacity-50'>
                        <h1 className='text-center'>"Create A Memory <br /> to Last a Lifetime <br /> With "MEMORY"</h1>
                    </div>
                    <div class="absolute z-10 inset-0 bg-black opacity-70"></div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider