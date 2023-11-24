import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <h1 className="text-xl font-semibold duration-300 hover:brightness-90 lg:text-2xl">
          <span className="bg-gradient-to-r from-[#5033C3] to-[#8162FF] bg-clip-text text-transparent">
            Space
          </span>
          Tech
        </h1>
      </Link>
    </>
  );
};

export default Logo;
