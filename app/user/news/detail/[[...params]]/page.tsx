import { Grid, Paper } from "@mui/material"
import { Suspense } from "react"
import FormNews from "../../_component/FormNews";

const page = (props : any) => {
  const params = props.params.params;
  const id = params ? params[0] : null;
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
          <Suspense>
            <FormNews id={id} />
          </Suspense>
        </Paper>
      </Grid>
    </>
  )
}

export default page