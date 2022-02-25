import { FC, ReactNode } from 'react';

interface TooltipProps {
    text: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
    return (
        <div className="relative group w-full">
            <div className="transition-all duration-300 flex justify-center items-center w-full flex-col opacity-0 left-auto group-hover:opacity-100 absolute bottom-0 group-hover:bottom-full">
                <div className="whitespace-nowrap dark:bg-slate-100 w-max text-center bg-slate-700 text-xs dark:text-black text-white py-1.5 px-3 rounded-lg shadow">
                    {text}
                </div>
                <div className="flex items-center justify-center fill-current dark:text-slate-100 text-slate-700">
                    <svg width="10" height="10" viewBox="0 0 10 10">
                        <polygon points="0,0 5,5 10,0" />
                    </svg>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Tooltip;