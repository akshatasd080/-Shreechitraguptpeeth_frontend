import React, { useEffect, useState } from "react";
import { Home, X } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/api/axios";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/gallery/`;
const FALLBACK_IMAGES = [
  { src: "/gallery/g1.jpg", title: "Gallery Image" },
  { src: "/gallery/g2.jpg", title: "Gallery Image" },
  { src: "/gallery/g3.jpg", title: "Gallery Image" },
  { src: "/gallery/g4.jpg", title: "Gallery Image" },
  { src: "/gallery/g5.jpg", title: "Gallery Image" },
  { src: "/gallery/g6.jpg", title: "Gallery Image" },
];

const PhotoGallery = () => {
  const [galleryImages, setGalleryImages] = useState(FALLBACK_IMAGES);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      setLoading(true);
      try {
        const res = await api.get("/gallery-images?active=true");
        const apiImages = res.data?.images || [];
        if (apiImages.length > 0) {
          setGalleryImages(
            apiImages.map((img) => ({
              id: img.id,
              src: `${IMAGE_BASE_URL}${img.image_filename}`,
              title: img.title || "Gallery Image",
            }))
          );
        }
      } catch (_) {
        // keep fallback images
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="w-full bg-[#f8f8f8] overflow-hidden">

      {/* =========================================
                  HERO SECTION
      ========================================= */}
      <div
        className="
          relative
          w-full
          h-[300px]
          md:h-[400px]
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/New folder/subheader1.jpg')",
        }}
      >

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-white
            px-5
          "
        >

          {/* TAG */}
          <span
            className="
              px-6 py-2
              rounded-full
              bg-white/10
              backdrop-blur-lg
              border border-white/20
              text-sm
              tracking-[3px]
              uppercase
              mb-5
            "
          >
            Shree Chitragupt Peeth
          </span>

          {/* TITLE */}
          <h1
            className="
              text-[42px]
              md:text-[72px]
              font-black
              text-center
              drop-shadow-2xl
            "
          >
            Photo Gallery
          </h1>

          {/* BREADCRUMB */}
          <div
            className="
              absolute
              -bottom-8
              bg-white
              rounded-full
              shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              px-8
              py-4
              flex
              items-center
              gap-4
            "
          >

            <Link
              to="/"
              className="
                flex items-center gap-2
                text-gray-600
                font-bold
                hover:text-red-500
                transition-all
              "
            >
              <Home size={18} />
              HOME
            </Link>

            <span className="text-gray-400">
              /
            </span>

            <span className="font-bold text-red-500">
              PHOTO GALLERY
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
                  GALLERY SECTION
      ========================================= */}
      <div className="max-w-[1650px] mx-auto px-5 lg:px-10 pt-28 pb-24">

        {/* SECTION TITLE */}
        <div className="text-center mb-16">

          <span
            className="
              inline-flex
              items-center
              gap-2
              px-6 py-3
              rounded-full
              bg-red-50
              text-red-500
              font-bold
              border border-red-100
              tracking-[3px]
              text-sm
            "
          >
            ✨ DIVINE MOMENTS
          </span>

          <h2
            className="
              mt-6
              text-[38px]
              md:text-[62px]
              font-black
              text-[#ff3300]
            "
          >
            Photo Gallery
          </h2>

          <p
            className="
              mt-5
              text-gray-600
              text-[18px]
              max-w-[850px]
              mx-auto
              leading-[2]
            "
          >
            Shree Chitragupt Peeth ke pavitra aur yaadgaar karyakramon ke
            divya drishya.
          </p>
        </div>

        {/* =========================================
                    IMAGE GRID
        ========================================= */}
        {loading ? (
          <div className="text-center py-16 text-gray-500 text-lg font-medium">
            Loading gallery images...
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg font-medium">
            No gallery images available yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (

            <div
              key={image.id || index}
              onClick={() => setSelectedImage(image)}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                cursor-pointer
                bg-white
                p-3
                border border-gray-100
                shadow-[0_15px_50px_rgba(0,0,0,0.08)]
                hover:-translate-y-3
                hover:shadow-[0_30px_70px_rgba(255,80,0,0.18)]
                transition-all
                duration-500
              "
            >

              {/* TOP BORDER */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-[5px]
                  bg-gradient-to-r
                  from-[#ff3300]
                  to-[#ff7a00]
                  z-20
                "
              />

              {/* IMAGE */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[24px]
                "
              >

                <img
                  src={image.src}
                  alt={image.title}
                  className="
                    w-full
                    h-[340px]
                    object-cover
                    group-hover:scale-110
                    transition-all
                    duration-700
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    group-hover:bg-black/30
                    transition-all
                    duration-500
                  "
                />

                {/* VIEW BUTTON */}
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                  "
                >

                  <div
                    className="
                      px-8
                      py-4
                      rounded-full
                      bg-white
                      text-[#ff3300]
                      font-bold
                      shadow-2xl
                    "
                  >
                    View Image
                  </div>
                </div>
              </div>

              <div className="px-2 pt-5 pb-2 text-center">
                <h3 className="text-lg font-bold text-[#ff3300] line-clamp-2">
                  {image.title}
                </h3>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================
                  IMAGE MODAL
      ========================================= */}
      {selectedImage && (

        <div
          className="
            fixed
            inset-0
            z-[999]
            bg-black/90
            flex
            items-center
            justify-center
            p-5
          "
        >

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImage(null)}
            className="
              absolute
              top-6
              right-6
              w-14
              h-14
              rounded-full
              bg-white
              text-[#ff3300]
              flex
              items-center
              justify-center
              shadow-2xl
              hover:rotate-90
              transition-all
              duration-300
            "
          >
            <X size={28} />
          </button>

          {/* IMAGE */}
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="
              max-w-full
              max-h-[90vh]
              rounded-[30px]
              shadow-[0_30px_100px_rgba(0,0,0,0.5)]
            "
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#ff3300] px-6 py-3 rounded-full font-bold shadow-2xl">
            {selectedImage.title}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;