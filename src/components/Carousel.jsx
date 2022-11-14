import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

export default function SliderComponent({ images }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full md:max-w-[900px] h-[70vh]"
      >
        {images.map((image, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img
                className="object-cover w-full h-full"
                src={image.url}
                alt={image.id}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

// import { useState, useEffect, useRef } from 'react';
// import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
// export const Carousel = ({ images }) => {
//   const [current, setCurrent] = useState(0);
//   //   const slideInterval = useRef();

//   const prev = () => {
//     // startSlideTimer();
//     const index = current > 0 ? current - 1 : images.length - 1;
//     setCurrent(index);
//   };

//   const next = () => {
//     const index = current < images.length - 1 ? current + 1 : 0;
//     setCurrent(index);
//   };

//   return (
//     <div className="relative mx-auto w-[800px] overflow-hidden ">
//       <div
//         className="whitespace-nowrap"
//         style={{ transform: `translateX(${-current * 100}%)` }}
//       >
//         {images.map((image, idx) => {
//           return (
//             <div className="inline-block w-full h-[400px]" key={idx}>
//               <img
//                 className="h-full w-full block object-cover"
//                 src={image.url}
//                 alt={image.id}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <div>
//         <MdChevronLeft
//           className="absolute bottom-[190px] left-0 bg-black/50   rounded-full opacity-50 hover:opacity-100 cursor-pointer"
//           onClick={prev}
//           size={40}
//         />
//         <MdChevronRight
//           className="absolute bottom-[190px] right-0 bg-black/50  rounded-full opacity-50 hover:opacity-100 cursor-pointer "
//           onClick={next}
//           size={40}
//         />
//       </div>
//       {/* <div>
//         <Title>{image.id}</Title>
//       </div> */}
//     </div>
//   );
// };
