import Config from "@config";

import CarouselWithArrows from "@components/basic/CarouselWithArrows";

const FacebookCarousel = () => {
  return (
    <CarouselWithArrows>
      {Config.gallery.map((post, index) => (
        <div key={index}>
          <iframe
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
              post.link
            )}&show_text=false&width=350`}
            width={350}
            height={post.height}
            className="border-0 overflow-hidden mx-auto"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      ))}
    </CarouselWithArrows>
  );
};

export default FacebookCarousel;
