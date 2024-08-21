import { Box, Card, CardContent, Container, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"
import { MdChevronRight } from "react-icons/md"
import { MotionDiv } from "@components/motion/MotionDiv"
import { ReactNode } from "react"
import Gmap from "./_component/Gmap"
import ContactForm from "./_component/ContactForm"
import MapBox from "./_component/MapBox"

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
        height: { xs: '300px', sm: '500px' }, 
        backgroundImage: `url(${"/asset/img/contact/hero.png"})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <AnimUp>
          <Box display="flex" alignItems="center">
            <Box display="flex" className="border-b-2 border-white md:ms-16">
              <MdChevronRight size="2rem" className="me-2" color="white"/>
              <Typography variant="overline"  className="text-white me-2 text-lg">HOME PAGE</Typography>
              <MdChevronRight size="2rem" className="me-2" color="white"/>
              <Typography variant="overline"  className="text-white me-2 text-lg">CONTACT US</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize : "24px"}} className="font-bold text-white mt-4 md:ms-16">Get in Touch with</Typography>
          <Typography variant="h3" className="font-bold text-white mt-4 md:ms-16">Our Company</Typography>
        </AnimUp>
      </Box>

      <Container className="my-4">
        <AnimUp>
        <Card>
          <CardContent>
            <Grid container className="p-2 md:p-10" spacing={10}>
              <Grid md={6}>
                <Typography variant="body2" className="mb-5">
                  Thank you for visiting MTELEC's website. Don't hesitate to contact us if you have further information.
                </Typography>
                <Typography variant="h5" className='font-bold txt-mte mb-4' >
                  MTELEC Co., LTD
                </Typography>
                <Box className="flex items-center mb-4">
                  <Image src="/asset/svg/contact/map.svg" alt="alt" width={40} height={40} />
                  <Typography className="ml-2 font-bold">No 22, Street No 6, KP6, Binh Hung Hoa B Ward, Binh Tan District, Ho Chi Minh City, Viet Nam</Typography>
                </Box>
                <Box className="flex items-center mb-4">
                  <Image src="/asset/svg/contact/phone.svg" alt="alt" width={40} height={40} />
                  <Typography className="ml-2 font-bold">(84-28) 37655273 - 37655274</Typography>
                </Box>
                <Box className="flex items-center mb-10">
                  <Image src="/asset/svg/contact/mail.svg" alt="alt" width={40} height={40} />
                  <Typography className="ml-2 font-bold">mtelec@mtelec.vn</Typography>
                </Box>
                <Box>
                  <a
                    href="https://maps.app.goo.gl/rTwkWe9k3tnyxN6B9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography className='font-bold txt-mte mb-4'>
                      Get Directions on Google Maps
                    </Typography>
                  </a>
                </Box>
              <MapBox />
              </Grid>
              <Grid md={6} className="grey">
                <ContactForm />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </AnimUp>
      </Container>
    </>
  )
}

export default page