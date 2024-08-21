"use client";
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { getAllCompanies } from "../../_server/CompanyAction";

const TableCompany = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [companies, setCompanies] = useState<any[]>([]);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getCompanies = async () => {
		const pro = await getAllCompanies();
		setCompanies(pro);
	};

	useEffect(() => {
		getCompanies();
	}, []);

	return (
		<>
			<TableContainer sx={{ maxHeight: "74vh", overflow: "auto", marginTop: "10px" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width="300px">ID</TableCell>
							<TableCell>Image</TableCell>
							<TableCell width="370px"></TableCell>
							<TableCell>Create At</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{companies &&
							companies
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow
										key={row._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell>{row._id}</TableCell>
										<TableCell>
											<Image src={row.path} alt="image" width={100} height={100} />
										</TableCell>
										<TableCell width="370px"></TableCell>
										<TableCell>
											{format(new Date(row.createdAt), "yyyy/MM/dd HH:mm:ss")}
										</TableCell>
										<TableCell size="small" width="20px">
											<Link href={`/user/product/company/detail/${row._id}`}>
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
					count={companies.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</>
	);
};

export default TableCompany;
