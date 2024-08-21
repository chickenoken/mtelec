"use client"
import { getEmpl } from '@app/user/employee/_server/FormEmployAction'
import { MotionDiv } from '@components/motion/MotionDiv'
import { Box, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import { MdChevronRight } from 'react-icons/md'

interface IEmployee {
  ceo_name1: string;
  ceo_image1: string;
  ceo_title1: string;
  ceo_tdesc1: string;
  ceo_desc1: string;
  ceo_name2: string;
  ceo_image2: string;
  ceo_title2: string;
  ceo_tdesc2: string;
  ceo_desc2: string;

  cm_name1: string;
  cm_image1: string;
  cm_title1: string;
  cm_desc1: string;
  cm_name2: string;
  cm_image2: string;
  cm_title2: string;
  cm_desc2: string;

  m_name1: string;
  m_image1: string;
  m_title1: string;
  m_desc1: string;
  m_name2: string;
  m_image2: string;
  m_title2: string;
  m_desc2: string;
  m_name3: string;
  m_image3: string;
  m_title3: string;
  m_desc3: string;

  sm_name1: string;
  sm_image1: string;
  sm_title1: string;
  sm_desc1: string;
  sm_name2: string;
  sm_image2: string;
  sm_title2: string;
  sm_desc2: string;
  sm_name3: string;
  sm_image3: string;
  sm_title3: string;
  sm_desc3: string;
  sm_name4: string;
  sm_image4: string;
  sm_title4: string;
  sm_desc4: string;
}
const page = () => {
  const [data, setData] = React.useState<IEmployee>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    let rs = await getEmpl();
    setData(rs);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

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
    <Box sx={{
      backgroundImage: `url(${"/asset/img/bg_2.png"})`,
      backgroundSize: 'cover',
      }}>
      { loading ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Box display="flex" alignItems="center" sx={{
        height: { xs: '300px', sm: '300px' }, 
        backgroundImage: `url(${"/asset/img/about/teams/banner.png"})`,
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
              <Typography variant="overline"  className="text-black me-2 text-lg">ABOUT OUR TEAM</Typography>
            </Box>
          </Box>
          <Typography variant="h3" className="font-bold txt-mte mt-4 md:ms-16">Our Team</Typography>
        </AnimUp>
      </Box>
      <Container>

        <AnimUp>
        <Box className="lg:px-36 mb-8 mt-14">
          <Typography className='mb-2'>Our team with the strong Leader is a group of skilled and dedicated individuals who share a common goal of delivering high-quality work and exceptional results. Each team member brings a unique set of skills, knowledge, and experience to the table, which allows us to tackle projects from different angles and find innovative solutions. </Typography>
          <Typography className=''>We prioritize collaboration, communication, and mutual respect, which fosters a supportive and productive work environment. We committed to staying up-to-date with the latest industry trends and technologies, and we continuously seek opportunities for growth and improvement.</Typography>
        </Box>
        </AnimUp>
        {data && ( <>
        <AnimUp>
        <Box className="text-center my-10">
          <Typography variant='h4' className='trilong font-bold italic'>Best Team Of</Typography>
          <Typography variant='h4' className='trilong font-bold italic'>Professional Experts</Typography>
        </Box>
        <Box className="mt-8 text-center mb-4" justifyContent="center">
          <Grid container justifyContent="center" alignItems="center">
            <Grid md={6} className="flex flex-col items-center justify-end lg:pe-10 mb-2">
              <Image src={data.ceo_image1} alt="leg" width={380} height={380} />
              <Card className='w-96 max-w-96'>
                <CardContent className='lg:px-2'>
                  <Typography className='text-start txt-mte font-bold text-lg'>
                    {data.ceo_name1}
                  </Typography>
                  <Typography className='text-start font-bold italic trilong' variant='subtitle1'>
                    {data.ceo_title1}
                  </Typography>
                  <Typography className='text-start font-bold text-sm' variant='subtitle2'>
                    {data.ceo_tdesc1}
                  </Typography>
                  <Typography className='text-start text-xs' >
                    {data.ceo_desc1}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid md={6} className="flex flex-col items-center justify-start lg:ps-10">
              <Image src={data.ceo_image2} alt="leg" width={380} height={380} />
              <Card className='w-96 max-w-96'>
                <CardContent>
                  <Typography className='text-start txt-mte font-bold text-lg'>
                    {data.ceo_name2}
                  </Typography>
                  <Typography className='text-start font-bold italic trilong' variant='subtitle1'>
                    {data.ceo_title2}
                  </Typography>
                  <Typography className='text-start font-bold text-sm' variant='subtitle2'>
                    {data.ceo_tdesc2}
                  </Typography>
                  <Typography className='text-start text-xs' >
                    {data.ceo_desc2}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        </AnimUp>
        <AnimUp>
        <Box className="text-center mt-20 mb-10">
          <Typography variant='h4' className='trilong font-bold italic'>Core Managers</Typography>
        </Box>
        </AnimUp>
        
        <Box className="mx-auto mb-4">
          <AnimUp>
          <Grid container justifyContent="center" alignItems="center" className="mb-10">
            <Grid md={6} className="flex flex-col items-center">
              <Image src={data.cm_image1} alt="leg" width={250} height={250} />
              <Typography className='text-center'>
                {data.cm_title1}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.cm_name1}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.cm_desc1}
              </Typography>
            </Grid>
            <Grid md={6} className="flex flex-col items-center">
              <Image src={data.cm_image2} alt="leg" width={250} height={250} />
              <Typography className='text-center'>
                {data.cm_title2}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.cm_name2}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.cm_desc2}
              </Typography>
            </Grid>
          </Grid>
          </AnimUp>

          <AnimUp>
          <Grid container justifyContent="center" alignItems="center" className="mb-10">
            <Grid md={4} className="flex flex-col items-center">
              <Image src={data.m_image1} alt="leg" width={250} height={250} />
              <Typography className='text-center'>
                {data.m_title1}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.m_name1}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.m_desc1}
              </Typography>
            </Grid>
            <Grid md={4} className="flex flex-col items-center">
              <Image src={data.m_image2} alt="leg" width={250} height={250} />
              <Typography className='text-center'>
                {data.m_title2}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.m_name2}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.m_desc2}
              </Typography>
            </Grid>  
            <Grid md={4} className="flex flex-col items-center">
              <Image src={data.m_image3} alt="leg" width={250} height={250} />
              <Typography className='text-center'>
                {data.m_title3}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.m_name3}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.m_desc3}
              </Typography>
            </Grid>
          </Grid>
          </AnimUp>

          <AnimUp>
          <Grid container justifyContent="center" alignItems="center" className="mb-10">
            <Grid md={3} className="flex flex-col items-center">
              <Image src={data.sm_image1} alt="leg" width={200} height={200} />
              <Typography className='text-center'>
                {data.sm_title1}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.sm_name1}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.sm_desc1}
              </Typography>
            </Grid>
            <Grid md={3} className="flex flex-col items-center">
              <Image src={data.sm_image2} alt="leg" width={200} height={200} />
              <Typography className='text-center'>
                {data.sm_title2}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.sm_name2}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.sm_desc2}
              </Typography>
            </Grid>
            <Grid md={3} className="flex flex-col items-center">
              <Image src={data.sm_image3} alt="leg" width={200} height={200} />
              <Typography className='text-center'>
                {data.sm_title3}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.sm_name3}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.sm_desc3}
              </Typography>
            </Grid>
            <Grid md={3} className="flex flex-col items-center">
              <Image src={data.sm_image4} alt="leg" width={200} height={200} />
              <Typography className='text-center'>
                {data.sm_title4}
              </Typography>
              <Typography className='text-center font-bold' variant='subtitle1'>
                {data.sm_name4}
              </Typography>
              <Typography className='text-center font-bold italic trilong text-sm' variant='subtitle2'>
                {data.sm_desc4}
              </Typography>
            </Grid>
          </Grid>
          </AnimUp>
        </Box>
        </>
      )}
      </Container>
    </>
    )}
    </Box>
  )
}

export default page