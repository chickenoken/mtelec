import { MotionDiv } from "@components/motion/MotionDiv";
import { Box, Container, Typography} from "@mui/material"
import { ReactNode } from "react";
import { MdChevronRight } from "react-icons/md";
import RecruitmentList from "./_component/RecruitmentList";

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
      <Box display="flex" alignItems="center" sx={{
        height: { xs: '300px', sm: '300px' }, 
        backgroundImage: `url(${"/asset/img/about/recruitment/hero.png"})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <AnimUp>
          <Box display="flex" alignItems="center">
            <Box display="flex" className="border-b-2 border-black md:ms-16">
              <MdChevronRight size="2rem" className="me-2" color="black"/>
              <Typography variant="overline"  className="text-black me-2 text-lg">HOME PAGE</Typography>
              <MdChevronRight size="2rem" className="me-2" color="black"/>
              <Typography variant="overline"  className="text-black me-2 text-lg">ABOUT US</Typography>
              <MdChevronRight size="2rem" className="me-2" color="black"/>
              <Typography variant="overline"  className="text-black me-2 text-lg">RECRUITMENT</Typography>
            </Box>
          </Box>
          <Typography variant="h3" className="font-bold txt-mte mt-4 md:ms-16">RECRUITMENT</Typography>
        </AnimUp>
      </Box>

      <Container className="pt-4 lg:p-10" maxWidth={false} >
        <AnimUp>
        <RecruitmentList />
        </AnimUp>
      </Container>
    </>
  )
}

export default page