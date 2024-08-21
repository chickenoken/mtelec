import { Box, Button, Grid, Paper } from "@mui/material"
import Link from "next/link";
import { Suspense } from "react"
import { IoMdAdd } from "react-icons/io";
import TableRecruitment from "./_component/TableRecruitment";

const page = () => {
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
          <Suspense>
            <Box className="mb-2 text-right">
              <Link href="/user/recruitment/detail">
                <Button variant="contained" className="bg-blue-600" startIcon={<IoMdAdd />}>Add</Button>
              </Link>
              <TableRecruitment />
            </Box>
          </Suspense>
        </Paper>
      </Grid>
    </>
  )
}

export default page