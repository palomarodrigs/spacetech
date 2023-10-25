import { Badge } from "./badge";

interface BadgeTitleProps {
  icon: React.ReactNode;
  title: string;
}

const BadgeTitle = ({ icon, title }: BadgeTitleProps) => {
  return (
    <Badge
      className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
      variant="outline"
    >
      {icon}
      {title}
    </Badge>
  );
};

export default BadgeTitle;
