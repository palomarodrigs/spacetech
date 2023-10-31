import { prismaClient } from "@/lib/prisma";
import Categories from "./components/categories";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";

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
    <div className="flex flex-col gap-8 py-5 lg:pt-0">
      <PromoBanner
        src="/banner-home-offers-desktop.png"
        alt="Ofertas imperdíveis! Até 55% de desconto só esse mês."
        className="hidden lg:block lg:w-full"
      />

      <div className="block lg:hidden">
        <PromoBanner
          src="/banner-home-offers-mobile.png"
          alt="Até 55% de desconto esse mês!"
        />
      </div>

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle url="/deals">Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="block lg:hidden">
        <PromoBanner
          src="/banner-home-mouses-mobile.png"
          alt="Até 55% de desconto em mouses!"
        />
      </div>

      <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-9 lg:px-5">
        <div className="hidden lg:block lg:w-[37.5rem]">
          <PromoBanner
            src="/banner-home-mouses-desktop.png"
            alt="Até 55% de desconto em mouses!"
          />
        </div>

        <div className="hidden lg:block lg:w-[37.5rem]">
          <PromoBanner
            src="/banner-home-headsets-desktop.png"
            alt="Até 55% de desconto em fones!"
          />
        </div>
      </div>

      <div>
        <SectionTitle url="/category/keyboards">Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div className="hidden lg:block lg:px-5">
        <PromoBanner
          src="/banner-home-free-express.png"
          alt="Frete Grátis para todo o Brasil!"
        />
      </div>

      <div className="block lg:hidden">
        <PromoBanner
          src="/banner-home-headsets-mobile.png"
          alt="Até 55% de desconto em fones!"
        />
      </div>

      <div>
        <SectionTitle url="/category/mouses">Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
};

export default Home;
