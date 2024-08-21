"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MotionDiv } from "@components/motion/MotionDiv";

interface ImageChangeProps {
  aboutImg: any;
  width: number;
  height: number;
}

const ImageChange: React.FC<ImageChangeProps> = ({ aboutImg, width, height }) => {
  const [curImg, setCurImg] = useState(0);

  useEffect(() => {
    if (aboutImg.length === 0) return; 
    const interval = setInterval(() => {
      setCurImg((prevIndex) => (prevIndex + 1) % aboutImg.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [aboutImg.length]);

  if (aboutImg.length === 0) {
    return null; 
  }

  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 2.3 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
    >
      <Image
        className=""
        key={aboutImg[curImg].name}
        src={aboutImg[curImg].binaryData}
        alt={aboutImg[curImg].name}
        width={width}
        height={height}
      />
    </MotionDiv>
  );
};

export default ImageChange;
