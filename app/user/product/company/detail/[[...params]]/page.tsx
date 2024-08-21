import FormCompany from "@app/user/product/_component/company/FormCompany";
import { Grid, Paper } from "@mui/material";
import { Suspense } from "react";

const page = (props: any) => {
	const params = props.params.params;
	const id = params ? params[0] : null;
	return (
		<>
			<Grid item xs={12} md={4} lg={3}>
				<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<Suspense>
						<FormCompany id={id} />
					</Suspense>
				</Paper>
			</Grid>
		</>
	);
};

export default page;
