"use client";
import { Button, Divider, IconButton, Typography } from "@mui/material";

import { IPAutomation } from "@model/PAutomation";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";

interface IProps {
	data: {
		id: string;
		workingFields: IPAutomation["workingFields"];
	};
	workingFieldUrl: string;
}

export default function TableWorkingFields({ data, workingFieldUrl }: IProps) {
	const { workingFields, id } = data;

	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(25);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div className="mb-8">
			<div className="flex justify-between items-center mt-8 mb-4">
				<Typography variant="h6" gutterBottom>
					List working field
				</Typography>
				<Link href={`${workingFieldUrl}/${id}`}>
					<Button variant="contained" className="bg-blue-600" startIcon={<IoMdAdd />}>
						Add working field
					</Button>
				</Link>
			</div>

			<Divider className="" />
			<TableContainer sx={{ maxHeight: "74vh", overflow: "auto", marginTop: "10px" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width="300px">ID</TableCell>
							<TableCell width="300px">Title</TableCell>
							<TableCell>Description 1</TableCell>
							<TableCell>Description 2</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{workingFields &&
							workingFields
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow
										key={row._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row._id}
										</TableCell>
										<TableCell component="th" scope="row">
											{row.title}
										</TableCell>
										<TableCell component="th" scope="row">
											{row.descriptions[0].sub}
										</TableCell>
										<TableCell component="th" scope="row">
											{row.descriptions.length > 1 ? row.descriptions[1].sub : ""}
										</TableCell>
										<TableCell></TableCell>

										<TableCell size="small" width="20px">
											<Link href={`${workingFieldUrl}/${row._id}`}>
												<IconButton color="primary">
													<MdEditSquare />
												</IconButton>
											</Link>
										</TableCell>
									</TableRow>
								))}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={workingFields.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</div>
	);
}
