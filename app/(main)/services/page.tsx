'use client'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion';
import { ReactNode } from "react";
import { MotionDiv } from '@components/motion/MotionDiv';
import { MdChevronRight } from 'react-icons/md';
import Service from './_component/Service';
import Image from 'next/image';

const page = () => {
  const FadeInWhenVisible = ({ children }: { children: ReactNode }) => {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1.3 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
      >
        {children}
      </motion.div>
    );
  };

  const AnimUp = ({ children }: { children: ReactNode }) => {
    return (
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1.3 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 } 
        }}
      >
        {children}
      </MotionDiv>
    );
  };

  return (
    <>
    <FadeInWhenVisible>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          backgroundImage: `url(${"/asset/img/service/hero.png"})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: '8%',
        }}
      >
        <AnimUp>
          <Box display="flex" alignItems="center">
            <Box display="flex" className="border-b-2 md:ms-16">
              <MdChevronRight size="2rem" className="me-2" color="white"/>
              <Typography variant="overline"  className="text-white me-2 text-lg">HOME PAGE</Typography>
              <MdChevronRight size="2rem" className="me-2" color="white"/>
              <Typography variant="overline"  className="text-white me-2 text-lg">SERVICE</Typography>
            </Box>
          </Box>
          <Typography variant="h3" className="trilong italic text-white md:ms-16">Our</Typography>
          <Typography variant="h3" className="font-bold text-white md:ms-16">SERVICES</Typography>
        </AnimUp>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <Box sx={{ width: '100%' }}>
            <Image src="/asset/img/cut_banner.png" layout="responsive" width="100" height="50" alt="f_logo" />
          </Box>
        </Box>
      </Box>
      </FadeInWhenVisible>
      <Container>
        <Service />
      </Container>
    </>
  )
}

export default page