/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import React, { useRef, useState } from "react";
import { offersAarray } from '../../../data/home';
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination, Navigation } from "swiper";

export default function OffersComponent() {
    return (
        <div className={styles.offers}>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="offers_swiper"
            >
                {offersAarray.map((product) => (
                    <>
                        <SwiperSlide>
                            <Link href="">
                                <img src={product.image} alt="" />
                            </Link>
                            <span>Rp.{product.price}</span>
                            <span>{product.discount}%</span>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </div>
    );
}
