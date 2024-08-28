"use client";
import { IProduct } from "@app/(main)/products/page";
import { MotionDiv } from "@components/motion/MotionDiv";
import { Box, CardContent, IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

interface Props {
  mode: IProduct[];
  title?: string;
}

const ImgCarousel = ({ mode, title='text-left' }: Props) => {
  const isMobile = useMediaQuery("(max-width:769px)");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slidesToShow = isMobile ? 1 : 3;
  const padding = 10;
  const totalSlides = mode.length - 2;
  const slideWidth = (100 / slidesToShow) - (padding * 2 / 100); // Adjust slideWidth for padding

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000); 

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <Box
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box display="flex" overflow="hidden" width="100%">
        <Box
          display="flex"
          sx={{
            transition: "transform 0.5s ease",
            transform: `translateX(-${slideWidth * currentSlide}%)`,
            width: `${slideWidth * mode.length}%`,
          }}
        >
          {mode.map((item) => (
            <MotionDiv
              key={item.title}
              whileHover={{ scale: 1.05 }}
              style={{
                flex: `0 0 ${slideWidth}%`,
                padding: `${padding}px`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={item.path}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
                <CardContent
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(255, 255, 255, 0.6)',
                    color: 'white',
                    padding: '10px', 
                  }}
                >
                  <Box className={`text-black font-bold ${title}`}>{item.title}</Box>
                </CardContent>
              </div>
            </MotionDiv>
          ))}
        </Box>
      </Box>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "-30px",
          transform: "translateY(-50%)",
          fontSize: "50px",
        }}
      >
        <IoIosArrowDropleftCircle />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "-20px",
          transform: "translateY(-50%)",
          fontSize: "50px",
        }}
      >
        <IoIosArrowDroprightCircle />
      </IconButton>
    </Box>
  );
};

export default ImgCarousel;
