"use client"
import { getPPPE } from "@app/user/pages/ppe/server/FormPPEAction";
import { MotionDiv } from "@components/motion/MotionDiv";
import { Box, Card, CardActionArea, CardContent, CircularProgress, Container, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"
import React, { ReactNode, useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { MdChevronRight } from "react-icons/md";

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

  interface IPPPE {
    image1: string;
    title1: string;
    content1: string[];
    title2: string;
    content2: string[];
    title3: string;
    content3: string[];
  }

  const [data, setData] = React.useState<IPPPE>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    let rs = await getPPPE();
    rs.content1 = rs.content1.split('\n');
    rs.content2 = rs.content2.split('\n');
    rs.content3 = rs.content3.split('\n');
    setData(rs);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
    {loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ) : (
      <>
      <Box display="flex" alignItems="center" sx={{
        height: { xs: '300px', sm: '300px' }, 
        backgroundImage: `url(${"/asset/img/about/protection/hero.png"})`,
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
              <Typography variant="overline"  className="text-black me-2 text-lg">PPE PROTECTION</Typography>
            </Box>
          </Box>
          <Typography variant="h3" className="font-bold txt-mte mt-4 md:ms-16">PPE PROTECTION</Typography>
        </AnimUp>
      </Box>
      <Box sx={{
          backgroundImage: `url(${"/asset/img/about/protection/bg.png"})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}>
        <Container>
          <AnimUp>
          <Typography variant="h3" className="text-center font-bold mb-14">MTELEC PPE</Typography>
          <Box display="flex" justifyContent="center" className="mb-10" >
            <Image alt="mte-pbe" src={data?.image1 ?? ""} width={800} height={800} />
          </Box>
          </AnimUp>

          <AnimUp>
          <Box display="flex" justifyContent="center" className="mb-4">
            <Card sx={{ width: {
                xs: '100vw', 
                md: '55vw', 
              }, backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
              <CardActionArea>
                <CardContent className="m-1">
                  <Grid container spacing={5}>
                    <Grid md={2} container justifyContent="center" alignItems="center">
                      <Image alt="mte-icon" src="/asset/img/about/protection/icon_box.png" width={70} height={70} />
                    </Grid>
                    <Grid md={9}>
                      <Typography gutterBottom className="font-bold">
                        {data?.title1}
                      </Typography>
                      {data?.content1 ? data.content1.map((val: string, ind: number) => (
                          <Box display="flex" key={ind}>
                            <BsDot className="me-2"/>
                            <Typography variant="body2">
                              {val}
                            </Typography>
                          </Box>
                      )) : null}
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          </AnimUp>
          <AnimUp>
          <Box display="flex" justifyContent="center" className="mb-4">
            <Card sx={{ width: {
                xs: '100vw', 
                md: '55vw', 
              }, backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
              <CardActionArea>
                <CardContent className="m-1">
                  <Grid container spacing={5}>
                    <Grid md={2} container justifyContent="center" alignItems="center">
                      <Image alt="mte-icon" src="/asset/img/about/protection/icon_box.png" width={70} height={70} />
                    </Grid>
                    <Grid md={9}>
                      <Typography gutterBottom className="font-bold">
                        {data?.title2}
                      </Typography>
                      {data?.content2 ? data.content2.map((val: string, ind: number) => (
                          <Box display="flex" key={ind}>
                            <BsDot className="me-2"/>
                            <Typography variant="body2">
                              {val}
                            </Typography>
                          </Box>
                      )) : null}
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          </AnimUp>
          <AnimUp>
          <Box display="flex" justifyContent="center" className="mb-4">
            <Card sx={{  
              width: {
                xs: '100vw', 
                md: '55vw', 
              }, backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
              <CardActionArea>
                <CardContent className="m-1">
                  <Grid container spacing={5}>
                    <Grid md={2} container justifyContent="center" alignItems="center">
                      <Image alt="mte-icon" src="/asset/img/about/protection/icon_box.png" width={70} height={70} />
                    </Grid>
                    <Grid md={9}>
                      <Typography gutterBottom className="font-bold">
                        {data?.title3}
                      </Typography>
                      {data?.content3 ? data.content3.map((val: string, ind: number) => (
                          <Box display="flex" key={ind}>
                            <BsDot className="me-2"/>
                            <Typography variant="body2">
                              {val}
                            </Typography>
                          </Box>
                      )) : null}
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          </AnimUp>
        </Container>
      </Box>
    </>
    )}
    </>
  )
}

export default page