"use client"
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { BiSolidRightArrow } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { ReactNode, useEffect, useState } from 'react';
import { MotionDiv } from '@components/motion/MotionDiv';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { GoDownload } from 'react-icons/go';
import Link from 'next/link';
import Visitor from '@components/gapi/Visitor';
import { getContactInfo } from '@app/user/contact/_server/FormContactAction';

const Footer = () => {
  const LeftToRight = ({ children }: { children: ReactNode }) => {
    return (
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1.3 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: -50 },
        }}
      >
        {children}
      </MotionDiv>
    );
  };

  interface Contact {
		label: string;
    address: string;
    phone: string;
    email: string;
    latitude: string;
    longitude: string;
	}

	const [data, setData] = useState<Contact>();
	const [loading, setLoading] = useState(true);

  const getData = async () => {
		let rs = await getContactInfo();
		setData(rs);
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('/asset/img/footer.png')`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'transparent',
          // Responsive styles for smaller screens
          '@media (max-width: 800px)': {
            backgroundImage: 'none', //
            background: 'linear-gradient(to left, #00bcd4, #38b2ac, #27ae60)', // Default gradient background
          },
        }}
      >
        <Grid container className="pt-10 lg:pt-32 pb-6">
          {/* Left Section */}
          <Grid xs={12} md={4}>
            <Box className='flex items-center space-x-4 ml-6'>
              <LeftToRight>
                <Box className='md:ml-11 mb-2'>
                  <Image className="ml-2" src="/asset/img/logo_white.png" width={120} height={150} alt="f_logo" />
                  <Typography className="text-white mt-2">MTELEC Co., LTD</Typography>
                  <Box className='flex mb-1 mt-4'>
                    <FiMapPin className="text-white" size={20} />
                    <Typography className='text-white ml-2 text-sm'>{data?.address}</Typography>
                  </Box>
                  <Box className='lg:flex items-center mb-2'>
                    <Box className='flex items-center mb-2'>
                      <BsTelephone className="text-white" size={15} />
                      <Typography className='text-white ml-2 text-sm'>{data?.phone}</Typography>
                    </Box>
                    <Box className='flex items-center lg:ml-4 mb-2'>
                      <FiMail className="text-white" size={15} />
                      <Typography className='text-white ml-2 text-sm'>{data?.email}</Typography>
                    </Box>
                  </Box>
                </Box>
              </LeftToRight>
            </Box>
          </Grid>
          {/* Center Section */}
          <Grid xs={12} md={4} className="my-4 mb-6">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              {['/about', '/services', '/projects', '/products', '/about/recruitment', '/contact'].map((href, index) => (
                <Grid xs={12} sm={4} key={index} className="flex">
                  <Box className='flex items-center justify-center w-full mx-2'>
                    <Link href={href}>
                      <Typography className='font-bold'>
                        {
                          href === '/about' ? 'About Us' :
                          href === '/services' ? 'Service' :
                          href === '/projects' ? 'Typical Projects' :
                          href === '/products' ? 'Product' :
                          href === '/about/recruitment' ? 'Recruitment' :
                          'Contact Us'
                        }
                      </Typography>
                    </Link>
                    <BiSolidRightArrow className="ml-2" size={15} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Right Section */}
          <Grid xs={12} md={4} className='flex justify-end mt-auto pr-8'>
            <Box className='items-center'>
              <a href="/asset/mte-pdf.pdf" download style={{ display: 'flex', alignItems: 'center' }}>
                <Typography className='font-bold text-white'>Download Company Profile (PDF)</Typography>
                <GoDownload color='white' size="1.3rem" style={{ filter: 'drop-shadow(0 0 1px white)' }} />
              </a>
              <Box className='mb-2 font-bold text-right'>
                <Visitor />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Footer;
