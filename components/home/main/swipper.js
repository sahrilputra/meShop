/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainSwipper() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay= {{
                    delay:2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mainSwipper"
            >

                {[...Array(10).keys()].map((i) => (
                    <SwiperSlide>
                      <img src={`../../../image/swipper/${i + 1}.jpg`} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
