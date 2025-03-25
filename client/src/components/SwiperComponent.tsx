import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { useElectronics } from "../App";

interface images {
  images: Image[];
}

const SwiperComponent = ({ images }: images) => {
  const { API_URL } = useElectronics();

  console.log(images);

  return (
    <div className="rounded-default overflow-hidden ">
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper w-full h-auto block "
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="bg-white">
            <img
              src={
                image.preview
                  ? image.image_url
                  : image.image_url
                    ? `${API_URL}/files/images/${image.image_url}`
                    : "/defaultComponent.png"
              }
              alt="Component Image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SwiperComponent;
