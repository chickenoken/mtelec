import { Grid, Paper } from "@mui/material"
import { Suspense } from "react"
import TableApliant from "./_component/TableApliant"

const page = () => {
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: '85vh',}}>
          <Suspense>
            <TableApliant />
          </Suspense>
        </Paper>
      </Grid>
    </>
  )
}

export default page