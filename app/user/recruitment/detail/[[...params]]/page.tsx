import { Grid, Paper } from "@mui/material"
import { Suspense } from "react"
import FormRecruitment from "../../_component/FormRecruitment"

const page = (props : any ) => {
  const params = props.params.params;
  const id = params ? params[0] : null;
  const language = params ? params[1] : null;
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
          <Suspense>
            <FormRecruitment params={{ id: id, language: language}} />
          </Suspense>
        </Paper>
      </Grid>
    </>
  )
}

export default page