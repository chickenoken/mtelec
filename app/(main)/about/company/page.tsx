"use client"
import { getPCompanyInfo } from '@app/user/pages/company/_server/FormCompanyAction'
import { MotionDiv } from '@components/motion/MotionDiv'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import { MdChevronRight } from 'react-icons/md'

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

  interface PAbout {
    name: string;
    type: string;
    tax: string;
    address: string;
    tel: string;
    email: string;
    web: string;
    fileName1: string;
    image1: string;
    fileName2: string;
    image2: string;
    fileName3: string;
    image3: string;
    fileName4: string;
    image4: string;
    fileName5: string;
    image5: string;
  }

  const [data, setData] = React.useState<PAbout>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    let rs = await getPCompanyInfo();
    setData(rs);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <Box sx={{
      backgroundImage: `url(${"/asset/img/bg_2.png"})`,
      backgroundSize: 'cover',
      }}>
    {loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ) : (
      <>
      <Box display="flex" alignItems="center" sx={{
        height: { xs: '300px', sm: '300px' }, 
        backgroundImage: `url(${"/asset/img/about/company/banner.png"})`,
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
              <Typography variant="overline"  className="text-black me-2 text-lg">ABOUT COMPANY</Typography>
            </Box>
          </Box>
          <Typography variant="h3" className="font-bold txt-mte mt-4 md:ms-16">Company Information</Typography>
        </AnimUp>
      </Box>
      <Container>
      <AnimUp>
        <Box className="text-center">
          <Typography variant='h4' className='trilong font-bold italic mt-14'>General Details</Typography>
        </Box>
        <Box className="mt-8 text-left" display="flex" justifyContent="center">
          <Grid container justifyContent="center">
            <Grid xs={3}>
              <Typography className='txt-mte font-bold'>Name Of Contractor</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography className=''>{data?.name}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography className='txt-mte font-bold'>Type Of Company</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography className=''>{data?.type}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography className='txt-mte font-bold'>Tax Number</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography className=''>{data?.tax}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography className='txt-mte font-bold'>Adress Of Office & Workshop</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography className=''>{data?.address}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography className='txt-mte font-bold'>Telephone Number</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography className=''>{data?.tel}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography className='txt-mte font-bold'>Email</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography className=''>{data?.email}</Typography>
            </Grid>
            <Grid xs={3}>
              <Typography className='txt-mte font-bold'>Website</Typography>
            </Grid>
            <Grid xs={8}>
              <Typography className=''>{data?.web}</Typography>
            </Grid>
          </Grid>
        </Box>
        </AnimUp>
        <AnimUp>
        <Box className="text-center my-10">
          <Typography variant='h4' className='trilong font-bold italic'>Certificates</Typography>
        </Box>
        </AnimUp>
        <Box className="mt-8 text-center mb-4" justifyContent="center">
          <AnimUp>
          <Grid container justifyContent="center" alignItems="center">
            <Grid md={6}>
              <Typography variant='h5' className='trilong italic font-bold'>{data?.fileName1}</Typography>
            </Grid>
            <Grid md={6} className="flex items-center justify-center">
              <Image src={data?.image1 ?? ""} alt="leg" width={420} height={420} />
            </Grid>
          </Grid>
          </AnimUp>
          <AnimUp>
          <Grid className="mb-4" container justifyContent="center" alignItems="center">
            <Grid md={6}>
              <Typography variant='h5' className='trilong italic font-bold'>{data?.fileName2}</Typography>
            </Grid>
            <Grid md={6} className="flex items-center justify-center">
              <Image src={data?.image2 ?? ""} alt="leg" width={420} height={420} />
            </Grid>
          </Grid>
          </AnimUp>
          <AnimUp>
          <Grid className="mb-4" container justifyContent="center" alignItems="center">
            <Grid md={6}>
              <Typography variant='h5' className='trilong italic font-bold'>{data?.fileName3}</Typography>
            </Grid>
            <Grid md={6} className="flex items-center justify-center">
              <Image src={data?.image3 ?? ""} alt="leg" width={420} height={420} />
            </Grid>
          </Grid>
          </AnimUp>
          <AnimUp>
          <Grid className="mb-4" container justifyContent="center" alignItems="center">
            <Grid md={6}>
              <Typography variant='h5' className='trilong italic font-bold'>{data?.fileName4}</Typography>
            </Grid>
            <Grid md={6} className="flex items-center justify-center">
              <Image src={data?.image4 ?? ""} alt="leg" width={420} height={420} />
            </Grid>
          </Grid>
          </AnimUp>
          <AnimUp>
          <Grid className="mb-4" container justifyContent="center" alignItems="center">
            <Grid md={6}>
              <Typography variant='h5' className='trilong italic font-bold'>{data?.fileName5}</Typography>
            </Grid>
            <Grid md={6} className="flex items-center justify-center">
              <Image src={data?.image5 ?? ""} alt="leg" width={420} height={420} />
            </Grid>
          </Grid>
          </AnimUp>
        </Box>
      </Container>
    </>
    )}
    </Box>
  )
}

export default page