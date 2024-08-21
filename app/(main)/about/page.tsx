"use client"
import { getPAbout } from "@app/user/pages/about/server/FormAboutAction"
import { MotionDiv } from "@components/motion/MotionDiv"
import { Box, Container, Button, Typography, Card, ImageListItemBar, ImageListItem, CardActionArea, CircularProgress } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Image from "next/image"
import Link from "next/link"
import React, { ReactNode, useEffect, useState } from "react"
import { MdChevronRight } from "react-icons/md"

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
    title: string;
    content: string;
    desc: string;
    image1: string;
    image2: string;
    team_title: string;
    team_content: string;
    icon1: string;
    icon_name1: string;
    icon_desc1: string;
    icon2: string;
    icon_name2: string;
    icon_desc2: string;
    icon3: string;
    icon_name3: string;
    icon_desc3: string;
    vision: string;
    val1: string;
    val_title1: string;
    val_desc1: string;
    val2: string;
    val_title2: string;
    val_desc2: string;
    val3: string;
    val_title3: string;
    val_desc3: string;
    core1: string;
    core_title1: string;
    core_desc1: string;
    core2: string;
    core_title2: string;
    core_desc2: string;
    core3: string;
    core_title3: string;
    core_desc3: string;
    core4: string;
    core_title4: string;
    core_desc4: string;
  }

  const [data, setData] = React.useState<PAbout>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    let rs = await getPAbout();
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          backgroundImage: `url(${"/asset/img/about/hero.png"})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: '8%',
        }}
      >
        <AnimUp>
          <Box display="flex" alignItems="center">
            <Box display="flex" className="border-b-2 ms-16">
              <MdChevronRight size="2rem" className="me-2" color="white"/>
              <Typography variant="overline"  className="text-white me-2 text-lg">HOME PAGE</Typography>
              <MdChevronRight size="2rem" className="me-2" color="white"/>
              <Typography variant="overline"  className="text-white me-2 text-lg">ABOUT US</Typography>
            </Box>
          </Box>
          <Typography variant="h3" className="trilong italic text-white ms-16">About</Typography>
          <Typography variant="h3" className="font-bold text-white ms-16">MTELEC Co., LTD</Typography>
        </AnimUp>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <Box sx={{ width: '100%' }}>
            <Image src="/asset/img/cut_banner.png" layout="responsive" width="100" height="50" alt="f_logo" />
          </Box>
        </Box>
      </Box>
      <Container>
        <AnimUp>
        <Grid className="my-6" container spacing={10}>
          <Grid md={6}>
            <Box>
              <Typography className="trilong italic font-bold" variant="h5" gutterBottom>Our Company</Typography>
              <Typography variant="h3" className='font-bold txt-mte' gutterBottom>{data?.title}</Typography>
              <Typography align="justify" gutterBottom>
                {data?.content}
              </Typography>
              <Box className="px-2.5 py-6 my-6 bg-gradient-to-l from-stone-300 via-neutral-100 to-stone-300">
                <Typography variant="h4" align="center" className='font-bold txt-mte'>
                {data?.desc}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid md={6} >
            <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
              <Image key={1} src={data?.image1 ?? ""} alt="alt" width={500} height={450} />
            </Box>
          </Grid>
        </Grid>
        </AnimUp>

        <AnimUp>
        <Box className="mb-8" sx={{ backgroundImage: `url('/asset/img/about/bg_1.png')`, backgroundSize: 'cover'}}>
          <Grid container spacing={5}>
            <Grid md={4}>
              <Box className="flex justify-center" sx={{ alignItems: 'center' }}>
                <Image src={data?.icon1 ?? ""} alt="alt" width={70} height={70} />
                <Box className="ml-2">
                  <Typography variant="h4" className="font-bold txt-mte">{data?.icon_name1 ?? ""}</Typography>
                  <Typography>{data?.icon_desc1}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid md={4}>
              <Box className="flex justify-center" sx={{ alignItems: 'center' }}>
                  <Image src={data?.icon2 ?? ""} alt="alt" width={70} height={70} />
                  <Box className="ml-2">
                    <Typography variant="h4" className="font-bold txt-mte">{data?.icon_name2 ?? ""}</Typography>
                    <Typography>{data?.icon_desc2}</Typography>
                  </Box>
                </Box>
            </Grid>
            <Grid md={4}>
              <Box className="flex justify-center" sx={{ alignItems: 'center' }}>
                <Image src={data?.icon3 ?? ""} alt="alt" width={70} height={70} />
                <Box className="ml-2">
                  <Typography variant="h4" className="font-bold txt-mte">{data?.icon_name3 ?? ""}</Typography>
                  <Typography>{data?.icon_desc3}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Link href="/about/company">
          <Button className="mb-8 mt-16 h-16 px-8 py-5 mte-grey text-black text-xl font-bold" fullWidth variant="text">Company Information</Button>
        </Link>
        </AnimUp>
      </Container>

      <Box className="mb-8 pt-12 py-20" sx={{ backgroundImage: `url('/asset/img/about/bg_2.png')`, backgroundSize: '100% 100%'}}>
        <Container>
        <AnimUp>
        <Typography className="font-bold text-white text-center" variant="h4" gutterBottom>Our Values</Typography>
        <Grid container spacing={5}>
          <Grid md={3}>
            <Typography variant="h5" className="font-bold italic underline text-white text-center">Vision</Typography>
          </Grid>
          <Grid md={9}>
            <Typography align="justify" className="text-white">{data?.vision}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid md={3}>
            <Typography variant="h5" className="font-bold italic underline text-white text-center">Mission</Typography>
          </Grid>
          <Grid container md={9}>
            <Grid md={4}>
              <Card className="bg-transparent border-slate-50 p-2 h-full" variant="outlined">
                <Image src={data?.val1 ?? ""} alt="alt" width={70} height={70} />
                <Typography className="font-bold text-white">{data?.val_title1}</Typography>
                <Typography align="justify" className="text-xs text-white">{data?.val_desc1}</Typography>
              </Card>
            </Grid>
            <Grid md={4}>
              <Card className="bg-transparent border-slate-50 p-2 h-full" variant="outlined">
                <Image src={data?.val2 ?? ""} alt="alt" width={70} height={70} />
                <Typography className="font-bold text-white">{data?.val_title2}</Typography>
                <Typography align="justify" className="text-xs text-white">{data?.val_desc2}</Typography>
              </Card>
            </Grid>
            <Grid md={4}>
              <Card className="bg-transparent border-slate-50 p-2 h-full" variant="outlined">
                <Image src={data?.val3 ?? ""} alt="alt" width={70} height={70} />
                <Typography className="font-bold text-white">{data?.val_title3 ?? ""}</Typography>
                <Typography align="justify" className="text-xs text-white">{data?.val_desc3}</Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid md={3}>
            <Typography variant="h5" className="font-bold italic underline text-white text-center">Core Values</Typography>
          </Grid>
          <Grid container md={9}>
            <Grid md={6}>
              <Card className="bg-transparent border-slate-50 p-2 h-full" variant="outlined">
                <Box className="flex justify-center" sx={{ alignItems: 'center' }}>
                  <Image src={data?.core1 ?? ""} alt="alt" width={70} height={70} />
                  <Box className="ml-2">
                    <Typography className="font-bold text-white">{data?.core_title1}</Typography>
                    <Typography align="justify" className="text-xs text-white">{data?.core_desc1}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid md={6}>
              <Card className="bg-transparent border-slate-50 p-2 h-full" variant="outlined">
                <Box className="flex justify-center" sx={{ alignItems: 'center' }}>
                  <Image src={data?.core2 ?? ""} alt="alt" width={70} height={70} />
                  <Box className="ml-2">
                    <Typography className="font-bold text-white">{data?.core_title2}</Typography>
                    <Typography align="justify" className="text-xs text-white">{data?.core_desc2}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid md={6}>
              <Card className="bg-transparent border-slate-50 p-2 h-full" variant="outlined">
                <Box className="flex justify-center" sx={{ alignItems: 'center' }}>
                  <Image src={data?.core3 ?? ""} alt="alt" width={70} height={70} />
                  <Box className="ml-2">
                    <Typography className="font-bold text-white">{data?.core_title3}</Typography>
                    <Typography align="justify" className="text-xs text-white">{data?.core_desc3}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid md={6}>
              <Card className="bg-transparent border-slate-50 p-2 h-full" variant="outlined">
                <Box className="flex justify-center" sx={{ alignItems: 'center' }}>
                  <Image src={data?.core4 ?? ""} alt="alt" width={70} height={70} />
                  <Box className="ml-2">
                    <Typography className="font-bold text-white">{data?.core_title4}</Typography>
                    <Typography align="justify" className="text-xs text-white">{data?.core_desc4}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        </AnimUp>
        </Container>
      </Box>
      <Container>
        <AnimUp>
        <Grid className="mb-8" container spacing={10}>
          <Grid md={6}>
            <Box>
              <Typography className="trilong italic font-bold" variant="h5" gutterBottom>Our Team</Typography>
              <Typography variant="h3" className='font-bold txt-mte' gutterBottom>{data?.team_title}</Typography>
              <Typography align="justify" gutterBottom>
                {data?.team_content}
              </Typography>
            </Box>
          </Grid>
          <Grid md={6}>
            <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
              <Image key={1} src={data?.image2 ?? ""} alt="alt" width={500} height={450} />
            </Box>
          </Grid>
        </Grid>
        <Link href="/about/teams">
          <Button className="mb-8 h-16 px-8 py-5 mte-grey text-black text-xl font-bold" fullWidth variant="text">Organization Chart</Button>
        </Link>
        </AnimUp>
        <AnimUp>
        <Box>
          <Grid container spacing={10}>
            <Grid md={6}>
              <Box sx={{ height: 400, width: '100%', position: 'relative' }}>
              <ImageListItem className="mx-2">
                <Image className="h-96 w-full" src="/asset/img/about/img_2.png" alt="" loading="lazy" width={500} height={200} />
                <Link href="/about/protection"> 
                  <CardActionArea>
                    <ImageListItemBar className="text-center m-2 mte-grey text-xl font-bold" title="PPE PROTECTION"  sx={{"& .MuiImageListItemBar-title": { color: "black" }}}  />
                  </CardActionArea>
                </Link>
              </ImageListItem>
              </Box>
            </Grid>
            <Grid md={6}>
              <Box sx={{ height: 400, width: '100%', position: 'relative' }}>
              <ImageListItem className="mx-2">
                <Image className="h-96 w-full" src="/asset/img/about/img_3.png" alt="" loading="lazy" width={500} height={200} />
                <Link href="/about/recruitment"> 
                  <CardActionArea>
                    <ImageListItemBar className="text-center m-2 mte-grey text-xl font-bold" title="RECRUITMENT"  sx={{"& .MuiImageListItemBar-title": { color: "black" }}}  />
                  </CardActionArea>
                </Link>
              </ImageListItem>
              </Box>
            </Grid>
          </Grid>
        </Box>
        </AnimUp>
      </Container>
    </>
    )}
    </>
  )
}

export default page