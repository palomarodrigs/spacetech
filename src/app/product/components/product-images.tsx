"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="flex flex-col lg:relative lg:flex-row">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent lg:h-[670px] lg:w-[736px] lg:rounded-xl">
        <Image
          src={currentImage}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          alt={name}
        />
      </div>
      <div className="my-8 grid grid-cols-4 gap-4 px-5 lg:absolute lg:mt-0 lg:grid-cols-none lg:grid-rows-4 lg:p-10">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[77px] items-center justify-center rounded-2xl bg-accent lg:bg-zinc-800
              ${
                imageUrl === currentImage &&
                "border-2 border-solid border-[#8162FF]"
              }
            
            `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
