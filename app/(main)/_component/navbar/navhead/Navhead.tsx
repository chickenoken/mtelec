import { AppBar, Box, Toolbar, Typography, useMediaQuery } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

const Navhead = () => {
  const isMobile = useMediaQuery('(max-width:769px)');

  return (
    <Link href='/'>
      <Box className="w-full" sx={{zIndex : "1000"}} position={"fixed"}>
        <AppBar position="static" className={"bg-white px-4"} sx={{height: 80}}>
          <Toolbar>
            {!isMobile && (
              <Box sx={{ flexGrow: 1 }} >
                <Typography variant="h5" className={"text-black mt-2 font-bold"}>Electrical & Automation</Typography>
                <Typography variant="h5"className={"text-black mb-2 font-bold"}>Design - Installation - Maintenance</Typography>
              </Box>
            )}
            <Box>
              <Image src="/asset/img/logo.png" width={80} height={80} alt="mtelec logo"/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Link>
  )
}

export default Navhead