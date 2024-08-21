"use client"
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { format } from "date-fns";
import { DialogService } from "@lib/DialogService";
import { delCate, getAllCate } from "../_server/TableCategoriesAction";

const TableCategories = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [cate, setCate] = useState<any[]>([]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDel = async (id : string) => {
    DialogService.del("Do you want to delete the changes ?", async () => {
      let res = await delCate(id);
      if(res.status == 200){
        getCategories();
      }
    });
  }

  const getCategories = async () => {
    const cate = await getAllCate();
    setCate(cate);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <TableContainer sx={{ maxHeight: '74vh', overflow: 'auto', marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Project Detail</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cate && cate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell component="th" scope="row">{row.cate_name}</TableCell>
                <TableCell>{row.project_detail}</TableCell>
                <TableCell>{format(new Date(row.createdAt), 'yyyy/MM/dd HH:mm:ss')}</TableCell>
                <TableCell size="small" width="20px">
                  <Link href={`/user/categories/detail/${row._id}`}>
                    <IconButton color="primary">
                      <MdEditSquare />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell size="small" width="20px">
                  <IconButton onClick={() => handleDel(row._id)}> 
                    <MdDeleteForever color="red" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cate.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}

export default TableCategories