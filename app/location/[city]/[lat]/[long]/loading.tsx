import { FC } from "react";
import { SunIcon } from "@heroicons/react/solid";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className='bg-gradient-to-br from-[#394F68] to-[#183B7E] min-h-screen flex flex-col items-center justify-center text-slate-500'>
      <SunIcon className='h-24 w-24 animate-bounce text-yellow-500' />
      <h1 className='text-5xl font-bold text-center mb-10 animate-plus'>
        Loading City Weather Information
      </h1>
      <h2 className='text-xl font-bold text-center mb-10 animate-plus'>
        Hold on, we are crunching the numbers & generating an optimized view for
        you.
      </h2>
    </div>
  );
};

export default Loading;
