"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaRegSave } from "react-icons/fa"
import { ZodType, z } from "zod";
import { DialogService } from "@lib/DialogService";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import { getNewById, saveNew, updateNew } from "../_server/FormNewsAction";
import FormNewFile from "./FormNewFile";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const schema: ZodType = z.object({
  title: z.string().min(4, 'User Name must be at least 3 characters'),
  content: z.string().min(4, 'User Name must be at least 3 characters'),
  type : z.string().min(4, 'User Name must be at least 3 characters'),
  dateUp : z.string().min(4, 'User Name must be at least 3 characters'),
});
const FormNews = (params: any) => {
  const { register, trigger, control, getValues, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const router = useRouter();

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveNew(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          router.push('/user/news');
        });
      }
    });
  }

  const handleUpdate = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await updateNew(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          router.push('/user/news');
        });
      }
    });
  }

  const getDataById = async (id: any) => {
    if(id){
      let rs = await getNewById(id);
      if(rs){
        for (const [key, value] of Object.entries(rs)) {
          setValue(key, value);
        }
      }
    }
  }

  useEffect(() => {
    getDataById(params.id);
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Link href="/user/news"><Button variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>Back</Button></Link>
        {!params.id && <Button onClick={handleSave} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>}
        {params.id && <Button onClick={handleUpdate} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Update</Button>}
      </Box>
      <Box className="">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="dateUp"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Date Updated"
                className="w-44 mb-2"
                slotProps={{ 
                  textField: { 
                    size: 'small',
                    error: Boolean(errors.dateUp) 
                  } 
                }}
                value={value ? new Date(value) : null}
                onChange={(date) => onChange(date ? date.toISOString() : null)}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.title)} InputLabelProps={{ shrink: !!watch('title') }} fullWidth required variant="outlined" size="small" label="Title" autoFocus {...register('title')}/>
        {/* @ts-ignore */}
        {errors.title && <Typography variant="caption" color={'red'}>{errors.title.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.type)} InputLabelProps={{ shrink: !!watch('type') }} fullWidth required variant="outlined" size="small" label="Type" autoFocus {...register('type')}/>
        {/* @ts-ignore */}
        {errors.type && <Typography variant="caption" color={'red'}>{errors.type.message}</Typography>}
      </Box>
      <Box className="mb-2">
        <TextField error={Boolean(errors.content)} InputLabelProps={{ shrink: !!watch('content') }} fullWidth multiline rows={8} variant="outlined" size="small" label="Content" {...register('content')}/>
        {/* @ts-ignore */}
        {errors.content && <Typography variant="caption" color={'red'}>{errors.content.message}</Typography>}
      </Box>
      
      {params.id && <>
          <Divider className='my-4' />
          <FormNewFile id={params.id} />
        </>
      }
    </>
  )
}

export default FormNews