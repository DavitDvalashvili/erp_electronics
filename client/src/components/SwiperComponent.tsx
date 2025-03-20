import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectFlip, Pagination, Navigation } from "swiper/modules";

type Image = {
  image_id: number | null;
  image_url: string | null;
};

interface images {
  images: Image[];
}

const SwiperComponent = ({ images }: images) => {
  return (
    <div className="rounded-default overflow-hidden">
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper w-full h-auto block"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.image_url || "/defaultComponent.png"}
              alt={`Slide ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SwiperComponent;
