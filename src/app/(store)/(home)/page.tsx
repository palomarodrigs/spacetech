import { prismaClient } from "@/lib/prisma";
import Categories from "./components/categories";
import SectionTitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";
import ProductList from "@/components/ui/product-list";

const Home = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-5 lg:py-10 lg:pt-0">
      <Link href="/deals">
        <PromoBanner
          src="/banner-home-offers-desktop.png"
          alt="Ofertas imperdíveis! Até 55% de desconto só esse mês."
          className="hidden duration-300 hover:opacity-75 lg:block lg:w-full"
        />
      </Link>

      <div className="block lg:hidden">
        <Link href="/deals">
          <PromoBanner
            src="/banner-home-offers-mobile.png"
            alt="Até 55% de desconto esse mês! duration-300 hover:opacity-75"
          />
        </Link>
      </div>

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle url="/deals">Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="block lg:hidden">
        <Link href="/category/mouses">
          <PromoBanner
            src="/banner-home-mouses-mobile.png"
            alt="Até 55% de desconto em mouses!"
          />
        </Link>
      </div>

      <div className="hidden lg:flex lg:gap-9 lg:px-[100px]">
        <div className="hidden lg:block">
          <Link href="/category/mouses">
            <PromoBanner
              src="/banner-home-mouses-desktop.png"
              alt="Até 55% de desconto em mouses!"
              className="duration-300 hover:opacity-75 lg:w-full lg:pr-0"
            />
          </Link>
        </div>

        <div className="hidden lg:block">
          <Link href="/category/headphones">
            <PromoBanner
              src="/banner-home-headsets-desktop.png"
              alt="Até 55% de desconto em fones!"
              className="duration-300 hover:opacity-75 lg:w-full lg:pl-0"
            />
          </Link>
        </div>
      </div>

      <div>
        <SectionTitle url="/category/keyboards">Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div className="hidden lg:block">
        <PromoBanner
          src="/banner-home-free-express.png"
          alt="Frete Grátis para todo o Brasil!"
        />
      </div>

      <div className="block lg:hidden">
        <Link href="/category/headphones">
          <PromoBanner
            src="/banner-home-headsets-mobile.png"
            alt="Até 55% de desconto em fones!"
          />
        </Link>
      </div>

      <div>
        <SectionTitle url="/category/mouses">Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
};

export default Home;
