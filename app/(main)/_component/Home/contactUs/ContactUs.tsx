import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Link from 'next/link'
import React from 'react'

const ContactUs = () => {
  return (
    <Box className="mt-10 p-8 mb-4" sx={{ backgroundImage: `url('/asset/img/bg_4.png')`, backgroundSize: 'cover'}}>
      <Grid container>
        <Grid md={6}>
          <Box className="mb-4">
            <Typography variant="h4" className="font-bold text-white mb-4">Contact Us</Typography>
            <Typography variant="caption" className="text-white mb-4">Connect with us today for all your Electrical & Automation needs.</Typography>
          </Box>
        </Grid>
        <Grid md={6} className="text-end">
          <Link href="/contact">
            <Button className="h-16 px-8 py-5 mte-grey text-black text-xl font-bold mt-2" variant="text">Contact Us</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactUs