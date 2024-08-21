"use client";
import {
	IconButton,
	Link,
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
import { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { getProductByCompany } from "../../_server/ProductAction";

const FormCompanyProduct = ({ id }: { id: string }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [products, setProducts] = useState<any[]>([]);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getDataById = async (id: any) => {
		const res = await getProductByCompany(id);
		if (res) {
			setProducts(res);
		}
	};

	useEffect(() => {
		getDataById(id);
	}, [id]);

	return (
		<>
			<TableContainer sx={{ maxHeight: "74vh", overflow: "auto", marginTop: "10px" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width="300px">ID</TableCell>
							<TableCell>Image</TableCell>
							<TableCell width="380px">Title</TableCell>
							<TableCell>Create At</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products &&
							products
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
											<Image src={row.path} alt={row.title} width={100} height={100} />
										</TableCell>
										<TableCell width="380px">{row.title}</TableCell>
										<TableCell>
											{format(new Date(row.createdAt), "yyyy/MM/dd HH:mm:ss")}
										</TableCell>
										<TableCell size="small" width="20px">
											<Link href={`/user/product/detail/${row._id}`}>
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
					count={products.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</>
	);
};

export default FormCompanyProduct;
