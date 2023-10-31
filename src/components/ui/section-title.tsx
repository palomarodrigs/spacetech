import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

interface SectionTitleProps extends ComponentProps<"p"> {
  url: string;
}

const SectionTitle = ({ children, url, ...props }: SectionTitleProps) => {
  return (
    <div className="mb-5 flex items-center justify-between px-5">
      <p className="font-bold uppercase">{children}</p>

      <Link href={url}>
        <span className="flex cursor-pointer items-center gap-1 text-sm font-semibold transition duration-300 ease-in-out hover:opacity-80">
          Ver todos <ArrowRightIcon size={16} />
        </span>
      </Link>
    </div>
  );
};

export default SectionTitle;
