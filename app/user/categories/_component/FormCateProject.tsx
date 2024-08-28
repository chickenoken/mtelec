import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdDeleteForever, MdEditSquare } from 'react-icons/md'
import { format } from "date-fns";
import { IoMdAdd } from 'react-icons/io';
import { FaArrowLeft, FaRegSave } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogService } from '@lib/DialogService';
import { delCateProj, getAllCateProj, saveCateProj, updateCateProj } from '../_server/FormCateProjectAction';
import { toast } from 'react-toastify';

const FormCateProject = (params: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [cate, setCate] = useState<any[]>([]);
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
      let res = await delCateProj(id);
      if(res.status == 200){
        getDataById(params.id);
        setMode('add');
      }
    });
  }

  const getDataById = async (id: any) => {
    if(id) {
      let data = {cate_id: id}
      let rs = await getAllCateProj(data);
      if(rs){
        setCate(rs);
        setValue('cate_id', id);
      }
    }
  }

  useEffect(() => {
    getDataById(params.id);
  }, []);

  const schema = z.object({
    cate_id:  z.string(),
    cate_title: z.string().min(1, 'Input is required'),
    cate_pro_name:  z.string().min(1, 'Input is required'),
    location:  z.string().min(1, 'Input is required'),
    detail:  z.string().min(1, 'Input is required'),
  })

  const { register, trigger, formState: { errors }, watch, setValue, getValues, control } = useForm({ resolver: zodResolver(schema) });

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveCateProj(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          setMode('add');
          getDataById(params.id);
        });
      }
    });
  }

  const handleAdd = () => {
    setValue('cate_title', '');
    setValue('cate_pro_name', '');
    setValue('location', '');
    setValue('detail', '');
    setMode('save');
  }

  const handleEdit = (param : any) => {
    setValue('_id', param._id);
    setValue('cate_title', param.cate_title);
    setValue('cate_pro_name', param.cate_pro_name);
    setValue('location', param.location);
    setValue('detail', param.detail);
    setMode('update');
  }

  const handleUpdate = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await updateCateProj(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          setMode('add');
          getDataById(params.id);
        });
      }
    });
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: '74vh', overflow: 'auto', marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category Project Name</TableCell>
              <TableCell>Location</TableCell>
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
                <TableCell component="th" scope="row">{row.cate_pro_name}</TableCell>
                <TableCell>{row.location}</TableCell>
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
          count={cate.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: (mode == 'save' || mode == 'update') ? 'space-between' : 'flex-end', mb: 2 }}>
        {(mode == 'save' || mode == 'update') && <Button onClick={() => setMode('add')} variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>Back</Button>}
        {mode == 'add' && <Button onClick={handleAdd} variant="contained" className="bg-blue-600" startIcon={<IoMdAdd />}>Add</Button>}
        {mode == 'save' && <Button onClick={handleSave} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>}
        {mode == 'update'  && <Button onClick={handleUpdate} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Update</Button>}
      </Box>
      {(mode == 'save' || mode == 'update') && (
        <>
        <Box className="w-1/2 mb-4">
            <TextField error={Boolean(errors.cate_title)} InputLabelProps={{ shrink: !!watch('cate_title') }} required fullWidth variant="outlined" size="small" label="Cate Title" autoFocus {...register('cate_title')}/>
            {/* @ts-ignore */}
            {errors.cate_title && <Typography variant="caption" color={'red'}>{errors.cate_title.message}</Typography>}
          </Box>

          <Box className="w-1/2 mb-4">
            <TextField error={Boolean(errors.cate_pro_name)} InputLabelProps={{ shrink: !!watch('cate_pro_name') }} required fullWidth variant="outlined" size="small" label="Project Name" autoFocus {...register('cate_pro_name')}/>
            {/* @ts-ignore */}
            {errors.cate_pro_name && <Typography variant="caption" color={'red'}>{errors.cate_pro_name.message}</Typography>}
          </Box>

          <Box className="w-1/2 mb-4">
            <TextField error={Boolean(errors.location)} InputLabelProps={{ shrink: !!watch('location') }} fullWidth variant="outlined" size="small" label="Location" {...register('location')}/>
            {/* @ts-ignore */}
            {errors.location && <Typography variant="caption" color={'red'}>{errors.location.message}</Typography>}
          </Box>
          <TextField error={Boolean(errors.detail)} InputLabelProps={{ shrink: !!watch('detail') }} {...register('detail')} label="Working Field" variant="outlined" size="small" className="w-full" multiline />
          {/* @ts-ignore */}
          {errors.detail && <Typography variant="caption" color={'red'}>{errors.detail.message}</Typography>}
        </> 
      )}
    </>
  )
}

export default FormCateProject