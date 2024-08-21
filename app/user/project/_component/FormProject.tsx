"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogService } from '@lib/DialogService';
import { Box, Button, Card, CardMedia, FormControl, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FaArrowLeft, FaRegSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ZodType, z } from 'zod';
import { getProjectById, saveProject, updateProject } from '../_server/FormProjectAction';
import { CommonService } from '@lib/CommonService';

const schema: ZodType = z.object({
  project_name: z.string().min(4, 'User Name must be at least 3 characters'),
  client:z.string().min(4, 'User Name must be at least 3 characters'),
  location: z.string().min(4, 'User Name must be at least 3 characters'),
  complete_date: z.string().min(4, 'User Name must be at least 3 characters'),
  working_field: z.string().min(4, 'User Name must be at least 3 characters'),
});

const FormProject = (params: any) => {
  const { register, control, getValues, trigger, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const router = useRouter();

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveProject(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          router.push('/user/project');
        });
      }
    });
  }

  const handleUpdate = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await updateProject(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {
          router.push('/user/project');
        });
      }
    });
  }

  const getDataById = async (id: any) =>{
    if(id){
      let rs = await getProjectById(id);
      if(rs){
        for (const [key, value] of Object.entries(rs)) {
          setValue(key, value);
        }
        setValue('_id', id);
        setImageSrc(rs.image);
        setLogoSrc(rs.logo);
      }
    }
  }

  useEffect(() => {
    getDataById(params.id);
  }, []);

  const fileImg = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const fileLogo = useRef<HTMLInputElement>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  const handleUploadClick = (event:any) => {
      fileImg.current?.click();
  };

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    setImageSrc(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('image', b64File);
  };

  const handleLogoClick = (event:any) => {
    fileLogo.current?.click();
  };

  const handleLogoChange = async (event:any) => {
    const file = event.target.files[0];
    setLogoSrc(URL.createObjectURL(file));
    const b64File = await CommonService.convertToBase64(file);
    setValue('logo', b64File);
  };

  return (
    <>
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Link href="/user/project"><Button variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>Back</Button></Link>
            {!params.id && <Button onClick={handleSave} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>}
            {params.id && <Button onClick={handleUpdate} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Update</Button>}
          </Box>
          <Box className="w-1/2 mb-2">
            <TextField error={Boolean(errors.project_name)} InputLabelProps={{ shrink: !!watch('project_name') }} required fullWidth variant="outlined" size="small" label="Project Name" autoFocus {...register('project_name')}/>
            {/* @ts-ignore */}
            {errors.project_name && <Typography variant="caption" color={'red'}>{errors.project_name.message}</Typography>}
          </Box>
          <Box className="w-1/2 mb-10">
            <Typography variant="h6">Image Project</Typography>
            <input type="file" {...register('image')} ref={fileImg} style={{ display: 'none' }} onChange={handleFileChange} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleUploadClick}>
              Upload
            </Button>
            { imageSrc && 
              <Card><CardMedia component="img" height="140" image={imageSrc} alt="Preview"/></Card>
            }
          </Box>

          <Box className="w-40 mb-10">
            <Typography variant="h6">Image Logo</Typography>
            <input type="file" {...register('logo')} ref={fileLogo} style={{ display: 'none' }} onChange={handleLogoChange} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={handleLogoClick}>
              Upload
            </Button>
            { logoSrc && 
              <Card><CardMedia component="img" height="20" image={logoSrc} alt="Preview"/></Card>
            }
          </Box>
          
          <Grid className="mb-4" container spacing={2}>
            <Grid md={6}>
              <TextField error={Boolean(errors.client)} InputLabelProps={{ shrink: !!watch('client') }} fullWidth variant="outlined" size="small" label="Client" {...register('client')}/>
              {/* @ts-ignore */}
              {errors.client && <Typography variant="caption" color={'red'}>{errors.client.message}</Typography>}
            </Grid>
            <Grid md={6}>
              <TextField error={Boolean(errors.location)} InputLabelProps={{ shrink: !!watch('location') }} fullWidth variant="outlined" size="small" label="Location" {...register('location')}/>
              {/* @ts-ignore */}
              {errors.location && <Typography variant="caption" color={'red'}>{errors.location.message}</Typography>}
            </Grid>
            <Grid md={3}>
              <Controller
                name="complete_date"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    format="MM/yyyy"
                    views={["year", "month"]}
                    label="Complete Time"
                    className="w-44 mb-2"
                    slotProps={{ 
                      textField: { 
                        size: 'small',
                        error: Boolean(errors.complete_date) 
                      } 
                    }}
                    value={value ? new Date(value) : null}
                    onChange={(date) => onChange(date ? date.toISOString() : null)}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box>
            <Typography variant="h6" gutterBottom>Working Field</Typography>
            <TextField error={Boolean(errors.working_field)} InputLabelProps={{ shrink: !!watch('working_field') }} {...register('working_field')} label="Working Field" variant="outlined" size="small" className="w-full" multiline />
            {/* @ts-ignore */}
            {errors.working_field && <Typography variant="caption" color={'red'}>{errors.working_field.message}</Typography>}
          </Box>
        </LocalizationProvider>
      </FormControl>
    </>
  )
}

export default FormProject