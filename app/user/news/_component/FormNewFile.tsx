"use client"
import { Box, Button, Card, CardMedia, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md"
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdAdd } from "react-icons/io";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";
import { DialogService } from "@lib/DialogService";
import { delNewFile, getAllNewFile, saveNewFile, updateNewFile } from "../_server/FormNewFileAction";
import { toast } from "react-toastify";
import { CommonService } from "@lib/CommonService";

const FormNewFile = (params: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [newFile, setNewFile] = useState<any[]>([]);
  const [mode, setMode] = useState<any>('add');

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDel = async (id : string) => {
    DialogService.del("Do you want to delete the changes ?", async () => {
      let res = await delNewFile(id);
      if(res.status == 200){
        getDataById(params.id);
        setMode('add');
      }
    });
  }

  const getDataById = async (data: any) => {
    if(params.id) {
      let data = {id_news: params.id}
      let rs = await getAllNewFile(data);
      if(rs){
        setNewFile(rs);
        setValue('id_news', params.id);
      }
    }
  }

  useEffect(() => {
    getDataById(params.id);
  }, []);

  const schema = z.object({
    id_news: z.string().min(4, 'User Name must be at least 3 characters'),
    file_name: z.string().min(4, 'User Name must be at least 3 characters'),
  })

  const { register, trigger, formState: { errors }, watch, setValue, getValues, control } = useForm({ resolver: zodResolver(schema) });

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveNewFile(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          setMode('add');
          getDataById(params.id);
        });
      }
    });
  }

  const handleAdd = () => {
    setValue('file', '');
    setValue('file_name', '');
    setImageSrc(null);
    setMode('save');
  }

  const handleEdit = (param : any) => {
    setValue('_id', param._id);
    setValue('file', param.file);
    setImageSrc(param.file);
    setMode('update');
    
  }

  const handleUpdate = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await updateNewFile(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          setMode('add');
          getDataById(params.id);
        });
      }
    });
  }

  const fileImg = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleUploadClick = (event:any) => {
    fileImg.current?.click();
  };

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    setImageSrc(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('file', b64File);
    setValue('file_name', file.name);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: (mode == 'save' || mode == 'update') ? 'space-between' : 'flex-end', mb: 2 }}>
        {(mode == 'save' || mode == 'update') && <Button onClick={() => setMode('add')} variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>Back</Button>}
        {mode == 'add' && <Button onClick={handleAdd} variant="contained" className="bg-blue-600" startIcon={<IoMdAdd />}>Add</Button>}
        {mode == 'save' && <Button onClick={handleSave} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>}
        {mode == 'update'  && <Button onClick={handleUpdate} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Update</Button>}
      </Box>

      {(mode == 'save' || mode == 'update') && (
        <>
          <Box className="w-40 mb-4">
            <Typography variant="h6" gutterBottom>Upload Image</Typography>
            <input type="file" {...register('image')} ref={fileImg} style={{ display: 'none' }} onChange={handleFileChange} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick}>
              Upload
            </Button>
            { imageSrc && 
              <Card><CardMedia component="img" height="20" image={imageSrc} alt="Preview"/></Card>
            }
          </Box>
        </> 
      )}
      <TableContainer sx={{ maxHeight: '74vh', overflow: 'auto', marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newFile && newFile.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell component="th" scope="row">{row.file_name}</TableCell>
                <TableCell>{format(new Date(row.createdAt), 'yyyy/MM/dd HH:mm:ss')}</TableCell>
                <TableCell size="small" width="20px">
                  <IconButton color="primary" onClick={() => handleEdit(row)}>
                    <MdEditSquare />
                  </IconButton>
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
          count={newFile.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}

export default FormNewFile