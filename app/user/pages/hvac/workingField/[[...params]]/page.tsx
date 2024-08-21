import FormWorkingField from "@components/services/FormWorkingField";
import { Grid, Paper } from "@mui/material";
import { Suspense } from "react";
import {
	createWorkingField,
	getPHvacDataById,
	getPHvacWorkingFieldById,
	updateWorkingFieldByWorkingId,
} from "../../_server/FormHvacAction";

interface IParams {
	params: {
		params: string[];
	};
}

const page = ({ params }: IParams) => {
	const id = params.params ? params.params[0] : null;

	return (
		<>
			<Grid item xs={12} md={4} lg={3}>
				<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<Suspense>
						<FormWorkingField
							id={id}
							backUrl="/user/pages/hvac"
							getDataOfThis={getPHvacDataById}
							getWorkingFieldById={getPHvacWorkingFieldById}
							createNewWorkingField={createWorkingField}
							updateWorkingFieldByWorkingId={updateWorkingFieldByWorkingId}
						/>
					</Suspense>
				</Paper>
			</Grid>
		</>
	);
};

export default page;
