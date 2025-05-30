interface TitleHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  intro?: string;
}

const TitleHeader = ({ title, subtitle, icon, intro }: TitleHeaderProps) => {
  return (
    <div className="mb-16 text-center">
      <div className="mb-6 inline-flex w-fit items-center gap-2 text-nowrap rounded-full bg-slate-950  px-4 py-2 text-sm text-white-50 dark:bg-slate-900 md:text-base">
        {icon}
        <p className="text-sm font-medium text-white-50 dark:text-slate-300">
          {subtitle}
        </p>
      </div>
      <h2 className="mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-4xl font-bold text-black-100  dark:text-transparent dark:from-white-50 dark:via-slate-200 dark:to-white md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        {intro}
      </p>
    </div>
  );
};

export default TitleHeader;