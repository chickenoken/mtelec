import FormWorkingField from "@components/services/FormWorkingField";
import { Grid, Paper } from "@mui/material";
import { Suspense } from "react";
import {
	createWorkingField,
	getPElectricDataById,
	getPElectricWorkingFieldById,
	updateWorkingFieldByWorkingId,
} from "../../_server/FormElectricDesignAction";

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
							backUrl="/user/pages/electricDesign"
							getWorkingFieldById={getPElectricWorkingFieldById}
							getDataOfThis={getPElectricDataById}
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
