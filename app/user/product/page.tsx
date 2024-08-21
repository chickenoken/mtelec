import { Box, Grid, Paper } from "@mui/material";
import { Suspense } from "react";
import { TableCompany } from "./_component/company";
import { TableProduct } from "./_component/product";

export default function AdminProductPage() {
	return (
		<>
			<Grid item xs={12} md={4} lg={3}>
				<Paper className="mb-5" sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<h1 className="text-2xl font-bold mb-2">Companies</h1>
					<Suspense>
						<Box className="mb-2 text-right">
							<TableCompany />
						</Box>
					</Suspense>
				</Paper>
				<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
					<h1 className="text-2xl font-bold mb-2">Products</h1>
					<Suspense>
						<Box className="mb-2 text-right">
							<TableProduct />
						</Box>
					</Suspense>
				</Paper>
			</Grid>
		</>
	);
}
