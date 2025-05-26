interface TitleHeaderProps {
    title: string;
    subtitle: string;
}

const TitleHeader = ({ title, subtitle }: TitleHeaderProps) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="bg-slate-950 dark:bg-slate-900 text-white-50 py-2 px-4 rounded-full w-fit text-sm md:text-base text-nowrap">
                <p>{subtitle}</p>
            </div>
            <div>
                <h1 className="font-semibold md:text-5xl text-3xl text-center text-black-100  dark:text-slate-300">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default TitleHeader;