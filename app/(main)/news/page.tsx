import { MotionDiv } from "@components/motion/MotionDiv";
import { Box, Container, Typography } from "@mui/material"
import { ReactNode } from "react";
import { MdChevronRight } from "react-icons/md";
import NewForm from "./_component/NewForm";
import Image from "next/image";

const page = () => {
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          backgroundImage: `url(${"/asset/img/news/hero.png"})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: '8%',
        }}
      >
        <AnimUp>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" className="border-b-2 border-white md:ms-16">
              <MdChevronRight size="2rem" className="me-2" color="white" />
              <Typography variant="overline" className="text-white me-2 text-lg">HOME PAGE</Typography>
              <MdChevronRight size="2rem" className="me-2" color="white" />
              <Typography variant="overline" className="text-white me-2 text-lg">NEWS</Typography>
            </Box>
            <Typography variant="h3" className="trilong italic text-white mt-4 md:ms-16">Internal</Typography>
            <Typography variant="h3" className="font-bold text-white mb-4 md:ms-16">NEWS</Typography>
          </Box>
        </AnimUp>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <Box sx={{ width: '100%' }}>
            <Image src="/asset/img/cut_banner.png" layout="responsive" width="100" height="50" alt="f_logo" />
          </Box>
        </Box>
      </Box>
      <Container>
        <AnimUp>
          <NewForm />
        </AnimUp>
      </Container>
    </>
  )
}

export default page