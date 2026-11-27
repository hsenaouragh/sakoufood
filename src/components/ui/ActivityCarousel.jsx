import React from 'react';

const ActivityCarousel = ({
  images = [],
  imageWidth = '320px',
  imageHeight = '220px',
  speed = 25,
  className = '',
}) => {
  if (!images.length) return null;

  // Duplicate images for seamless infinite scrolling
  const carouselImages = [...images, ...images];

  return (
    <div className={`w-full overflow-hidden py-6 ${className}`}>
      <div
        className="flex w-max animate-scroll hover:[animation-play-state:paused]"
        style={{ '--scroll-speed': `${speed}s` }}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="shrink-0 px-3"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          >
            <img
              src={image}
              alt={`Company activity ${(index % images.length) + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCarousel;