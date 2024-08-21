"use client"
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import Link from "next/link"
import { MdDeleteForever, MdEditSquare } from "react-icons/md"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DialogService } from "@lib/DialogService";
import { delNew, getAllNew } from "../_server/TableNewsAction";

const TableNews = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [news, setNews] = useState<any[]>([]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDel = async (id : string) => {
    DialogService.del("Do you want to delete the changes ?", async () => {
      let res = await delNew(id);
      if(res.status == 200){
        getNews();
      }
    });
  }

  const getNews = async () => {
    const ne = await getAllNew();
    setNews(ne);
  }

  useEffect(() => {
    getNews();
  }, []);


  return (
    <>
      <TableContainer sx={{ maxHeight: '74vh', overflow: 'auto', marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news && news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell>{format(new Date(row.createdAt), 'yyyy/MM/dd HH:mm:ss')}</TableCell>
                <TableCell size="small" width="20px">
                  <Link href={`/user/news/detail/${row._id}`}>
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
          count={news.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}

export default TableNews