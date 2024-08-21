"use client";
import { useState, useEffect } from "react";
import { Box, Card, CardContent, CardActionArea, Typography, IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { MotionDiv } from "@components/motion/MotionDiv";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

interface Category {
  _id: string;
  cate_name: string;
  image?: string;
  project_detail_num: number;
}

interface CateCarouselProps {
  cate: Category[];
  cateAll: { length: number };
  handleChangeCate: (id: string, cate_name : string) => void;
  getAllCateDetail: () => void;
}

const CateCarousel = ({ cate, cateAll, handleChangeCate, getAllCateDetail }: CateCarouselProps) => {
  const isMobile = useMediaQuery("(max-width:769px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesToShow = isMobile ? 4 : 7;
  const padding = 1;
  const totalSlides = cate.length + 1;
  const slideWidth = (100 / slidesToShow) - (padding * 2 / 100);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - slidesToShow));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - slidesToShow ? prev + 1 : 0));
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
        <Box position="relative">
          <Box display="flex" overflow="hidden" width="100%">
            <Box
              display="flex"
              sx={{
                transition: "transform 0.5s ease",
                transform: `translateX(-${slideWidth * currentSlide}%)`,
                width: `${slideWidth * totalSlides}%`,
              }}
            >
              <MotionDiv
                style={{
                  flex: `0 0 ${slideWidth}%`,
                  padding: `${padding}px`,
                  position: 'relative',
                }}
              >
                <Card className="h-50" sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <CardActionArea sx={{ flexGrow: 1, height: "250px" }} onClick={getAllCateDetail}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="h6" className="text-center font-bold my-2">ALL CATEGORIES</Typography>
                      <Image className="my-2" src="/asset/img/projects/catotegry_all.png" alt="catotegry_all.png" width={100} height={100} />
                      <Typography variant="body2" className="text-center txt-mte my-2">{cateAll.length} projects</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MotionDiv>
              {cate.map((item) => (
                <MotionDiv
                  key={item._id}
                  style={{
                    flex: `0 0 ${slideWidth}%`,
                    padding: `${padding}px`,
                    position: 'relative',
                  }}
                >
                  <Card className="h-50" sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <CardActionArea sx={{ flexGrow: 1, height: "250px" }} onClick={() => handleChangeCate(item._id, item.cate_name)}>
                      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h6" className="text-center font-bold my-2">{item.cate_name}</Typography>
                        {item.image && <Image className="my-2" src={item.image} alt={item.cate_name} width={100} height={100} />}
                        <Typography variant="body2" className="text-center txt-mte my-2">{item.project_detail_num} projects</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
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
      </Box>
    </>
  );
};

export default CateCarousel;
