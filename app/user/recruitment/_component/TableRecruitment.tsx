"use client"
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import Swal from "sweetalert2";
import { delRecruitment, getAllRecruitment } from "../_server/TableRecruitmentAction";
import { toast } from "react-toastify";
import { DialogService } from "@lib/DialogService";

const TableRecruitment = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [recruiment, setRecruiment] = useState<any[]>([]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDel = async (id : string) => {
    DialogService.del("Do you want to delete the changes ?", async () => {
      let res = await delRecruitment(id);
      if(res.status == 200){
        getRecruiment();
      }
    });
  }

  const getRecruiment = async () => {
    const re = await getAllRecruitment();
    setRecruiment(re);
  }

  useEffect(() => {
    getRecruiment();
  }, []);

  return (
    <>
      <TableContainer sx={{ maxHeight: '74vh', overflow: 'auto', marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Sort</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recruiment && recruiment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.id_recruitment}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.language}</TableCell>
                <TableCell>{format(new Date(row.deadline), 'yyyy/MM/dd')}</TableCell>
                <TableCell>{row.sort}</TableCell>
                <TableCell size="small" width="20px">
                  <Link href={`/user/recruitment/detail/${row.id_recruitment}/${row.language}`}>
                    <IconButton color="primary">
                      <MdEditSquare />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell size="small" width="20px">
                  <IconButton onClick={() => handleDel(row.id_recruitment)}> 
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
          count={recruiment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}

export default TableRecruitment