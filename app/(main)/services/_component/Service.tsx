'use client'
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image';
import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';

const Service = () => {
  const leftToRightVariants = {
    hidden: { x: -100 },
    visible: { x: 0, transition: { type: 'spring', stiffness: 60 } },
  }

  const rightToLeftVariants = {
    hidden: { x: 100 },
    visible: { x: 0, transition: { type: 'spring', stiffness: 60 } },
  }

  const data = [
    {id: 1, link:'services/design', path: '/asset/img/service/service/ser_1.jpg', title: 'Electrical Design and Installation', descr: 'Our electrical design and installation service ensures the safe and efficient implementation of electrical systems for your projects.'},
    {id: 2, link:'services/automation',path: '/asset/img/service/service/ser_2.png', title: 'Automation Design and Installation', descr: 'MTELEC specializes in automation design and installation, enabling you to streamline processes and boost productivity in your industry.'},
    {id: 3, link:'services/solar',path: '/asset/img/service/service/ser_3.jpg', title: 'Solar System', descr: 'MTELEC delivers sustainable energy solutions through cutting-edge solar systems, harnessing renewable energy to power a greener future.'},
    {id: 4, link:'services/elv',path: '/asset/img/service/service/ser_4.jpg', title: 'ELV Design and Installation', descr: 'We supply Extra-Low Voltage (ELV) design and installation services, providing reliable and secure solutions for communication, security, and data transmission'},
    {id: 5, link:'services/hvac',path: '/asset/img/service/service/ser_5.jpg', title: 'HVAC Design and Installation', descr: 'MTELEC offers top-quality HVAC design and installation services for ventilation and air conditioning solutions.'},
    {id: 6, link:'services/electrical',path: '/asset/img/service/service/ser_6.png', title: 'Electrical Services', descr: 'We offer various electrical services including maintenance, repairs, and upgrades to keep your systems running smoothly and safely.'},
  ];

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        {data.map((item) => (
          <Grid md={6} key={item.id}>
            <motion.div
              variants={item.id % 2 === 0 ? rightToLeftVariants : leftToRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 2.5 }}
            >
              <Box sx={{ height: 400, width: '100%', position: 'relative' }}>
                <Image src={item.path} alt={item.title} layout="fill" objectFit="cover" />
              </Box>
              <Typography className="font-bold txt-mte mt-4" variant="h5">{item.title}</Typography>
              <Typography className="mt-4" display="block" variant="caption">{item.descr}</Typography>
              <Box className="mb-4 mt-3">
                <Link href={item.link}>
                <Button className="bg2-mte px-6 text-white" style={{ textTransform: 'none' }}>
                  <Typography className="font-semibold">More Details</Typography>
                </Button>
                </Link>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Service