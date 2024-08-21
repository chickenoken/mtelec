"use client";
import { Box, ImageListItem } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MotionDiv } from '@components/motion/MotionDiv';

const LogoCarousel = () => {
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const itemData = Array.from({ length: 24 }, (_, index) => ({
    id: (index + 1).toString(),
    path: `/asset/img/home/logo/logo_${index + 1}.png`,
  }));

  const slidesToShow = 7;
  const slideWidthPercentage = 100 / slidesToShow;
  const extendedItemData = [...itemData, ...itemData];

  useEffect(() => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.clientWidth;
    const itemWidth = containerWidth / slidesToShow;
    const totalWidth = extendedItemData.length * itemWidth;

    const startAnimation = () => {
      controls.start({
        x: `-${totalWidth / 2}px`, 
        transition: {
          duration: 50,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    };

    if (isAnimating) {
      startAnimation();
    }

    return () => setIsAnimating(false);
  }, [controls, isAnimating, extendedItemData.length, slidesToShow]);

  return (
    <Box
      position="relative"
    >
      <Box display="flex" overflow="hidden" width="100%" ref={carouselRef}>
        <MotionDiv style={{
            display: 'flex',
            width: `${extendedItemData.length * slideWidthPercentage}%`,
            whiteSpace: 'nowrap',
          }}
          animate={controls}
        >
          {extendedItemData.map((item, index) => (
            <Box key={`${item.id}-${index}`}
              sx={{
                flex: `0 0 ${slideWidthPercentage}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ImageListItem sx={{ paddingX: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={`${item.path}`} alt={item.id} loading="lazy" width={140} height={140} />
              </ImageListItem>
            </Box>
          ))}
        </MotionDiv>
      </Box>
    </Box>
  );
};

export default LogoCarousel;
