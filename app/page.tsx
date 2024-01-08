'use client';
import Image from 'next/image';
import { useRef, MouseEvent } from 'react';

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    //const { offsetWidth, offsetHeight } = pageRef.current;
    const pageHeight = event.currentTarget.clientHeight;
    const pageWidth = event.currentTarget.clientWidth;

    const percentLeft = (clientX / pageWidth) * 100;
    const percentTop = (clientY / pageHeight) * 100;

    console.log(
      // `Clicked at ${percentLeft}% from the left and ${percentTop}% from the top`
      `${percentLeft}, ${percentTop}, `
    );
  };

  return (
    <div>
      <img
        src='/ireland.jpg'
        alt='Ireland Tide Times Map'
        // style={{ width: '200vw', maxWidth: '200%', '!important': 'true' }}
        className='w-screen relative'
      />
    </div>

    // <div className="bg-[url('/ireland.jpg')] bg-cover bg-no-repeat h-full w-screen">
    //   {/* Your content goes here */}
    // </div>
  );
}
