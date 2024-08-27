// import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ImageCarousel.scss";
import {ClickableImage} from "../ClickableImage/ClickableImage.tsx";

export const ImageCarousel = ({images}: { images: string[] }) => {
    const settings = {
        customPaging: function (i: number) {
            return (
                <a href="#" className="thumbnail">
                    <img src={images[i]} alt="carousel"/>
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        initialSlide: 0,
        // autoplay: true,
        // autoplaySpeed: 5000,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((item, idx) => {
                        return (
                            <div key={idx} className="slider-item">
                                <ClickableImage src={item} alt="carousel"/>
                            </div>
                        );
                    }
                )}
            </Slider>
        </div>
    );
};
