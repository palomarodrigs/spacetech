import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      width={350}
      height={150}
      className="h-auto w-full px-5 lg:px-0"
      sizes="100vw"
      alt={alt}
      {...props}
    />
  );
};

export default PromoBanner;
