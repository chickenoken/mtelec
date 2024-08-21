"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { CommonService } from '@lib/CommonService'
import { DialogService } from '@lib/DialogService'
import { Box, Button, Card, CardMedia, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { getPCompanyInfo, savePCompanyInfo } from '../_server/FormCompanyAction'

const FormCompany = () => {
  const fileImg1 = useRef<HTMLInputElement>(null);
  const fileImg2 = useRef<HTMLInputElement>(null);
  const fileImg3 = useRef<HTMLInputElement>(null);
  const fileImg4 = useRef<HTMLInputElement>(null);
  const fileImg5 = useRef<HTMLInputElement>(null);
  const [imageSrc1, setImageSrc1] = useState<string | null>(null);
  const [imageSrc2, setImageSrc2] = useState<string | null>(null);
  const [imageSrc3, setImageSrc3] = useState<string | null>(null);
  const [imageSrc4, setImageSrc4] = useState<string | null>(null);
  const [imageSrc5, setImageSrc5] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<any>({});

  const handleFileChange = async (event: any, imageSetter :any, fieldName: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const b64File = await CommonService.convertToBase64(file);
    setValue(fieldName, b64File);
    imageSetter(URL.createObjectURL(file));
  };

  const handleUploadClick = (fileInputRef: any) => {
    fileInputRef.current?.click();
  };

  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Type is required'),
    tax: z.string().min(1, 'Tax is required'),
    address: z.string().min(1, 'Address is required'),
    tel: z.string().min(1, 'Telephone number is required'),
    email: z.string().min(1, 'Email is required'),
    web: z.string().min(1, 'Web is required'),
    fileName1: z.string().min(1, 'File name 1 is required'),
    image1: z.string().min(1, 'Image 1 is required'),
    fileName2: z.string().min(1, 'File name 2 is required'),
    image2: z.string().min(1, 'Image 2 is required'),
    fileName3: z.string().min(1, 'File name 3 is required'),
    image3: z.string().min(1, 'Image 3 is required'),
    fileName4: z.string().min(1, 'File name 4 is required'),
    image4: z.string().min(1, 'Image 4 is required'),
    fileName5: z.string().min(1, 'File name 5 is required'),
    image5: z.string().min(1, 'Image 5 is required'),
  });
  const { register, getValues, trigger, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      if(param.image1 === originalData.image1) param.image1 = '';
      if(param.image2 === originalData.image2) param.image2 = '';
      if(param.image3 === originalData.image3) param.image3 = '';
      if(param.image4 === originalData.image4) param.image4 = '';
			if(param.image5 === originalData.image5) param.image5 = '';
      let re = await savePCompanyInfo(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

  const getData = async () => {
    let rs = await getPCompanyInfo();
    if(rs){
      for (const [key, value] of Object.entries(rs)) {
        setValue(key, value);
      }
      setImageSrc1(rs.image1);
      setImageSrc2(rs.image2);
      setImageSrc3(rs.image3);
      setImageSrc4(rs.image4);
      setImageSrc5(rs.image5);
      setOriginalData(rs);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
        <Button onClick={handleSave} variant="contained" className="bg-blue-600" startIcon={<FaRegSave />}>Save</Button>
      </Box>
      <Typography variant="h6" className='mb-2'>General Details</Typography>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.name)} InputLabelProps={{ shrink: !!watch('name') }} required fullWidth variant="outlined" size="small" label="Name Of Contractor" autoFocus {...register('name')}/>
        {/* @ts-ignore */}
        {errors.name && <Typography variant="caption" color={'red'}>{errors.name.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.type)} InputLabelProps={{ shrink: !!watch('type') }} required fullWidth variant="outlined" size="small" label="Type Of Company" autoFocus {...register('type')}/>
        {/* @ts-ignore */}
        {errors.type && <Typography variant="caption" color={'red'}>{errors.type.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.tax)} InputLabelProps={{ shrink: !!watch('tax') }} required fullWidth variant="outlined" size="small" label="Tax Number" autoFocus {...register('tax')}/>
        {/* @ts-ignore */}
        {errors.tax && <Typography variant="caption" color={'red'}>{errors.tax.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.address)} InputLabelProps={{ shrink: !!watch('address') }} required fullWidth variant="outlined" size="small" label="Adress Of Office & Workshop" autoFocus {...register('address')}/>
        {/* @ts-ignore */}
        {errors.address && <Typography variant="caption" color={'red'}>{errors.address.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.tel)} InputLabelProps={{ shrink: !!watch('tel') }} required fullWidth variant="outlined" size="small" label="Telephone Number" autoFocus {...register('tel')}/>
        {/* @ts-ignore */}
        {errors.tel && <Typography variant="caption" color={'red'}>{errors.tel.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.email)} InputLabelProps={{ shrink: !!watch('email') }} required fullWidth variant="outlined" size="small" label="Email" autoFocus {...register('email')}/>
        {/* @ts-ignore */}
        {errors.email && <Typography variant="caption" color={'red'}>{errors.email.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.web)} InputLabelProps={{ shrink: !!watch('web') }} required fullWidth variant="outlined" size="small" label="Website" autoFocus {...register('web')}/>
        {/* @ts-ignore */}
        {errors.web && <Typography variant="caption" color={'red'}>{errors.web.message}</Typography>}
      </Box>
      <Typography variant="h6" className='mb-2'>Certificates</Typography>

      <Grid container spacing={10}>
        <Grid md={6}>
          <TextField error={Boolean(errors.fileName1)} InputLabelProps={{ shrink: !!watch('fileName1') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('fileName1')}/>
          {/* @ts-ignore */}
          {errors.fileName1 && <Typography variant="caption" color={'red'}>{errors.fileName1.message}</Typography>}
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('image1')} ref={fileImg1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc1, 'image1')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg1)}>
              Upload
            </Button>
            { imageSrc1 && 
              <Card><CardMedia component="img" height="20" image={imageSrc1} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid md={6}>
          <TextField error={Boolean(errors.fileName2)} InputLabelProps={{ shrink: !!watch('fileName2') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('fileName2')}/>
          {/* @ts-ignore */}
          {errors.fileName2 && <Typography variant="caption" color={'red'}>{errors.fileName2.message}</Typography>}
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('image2')} ref={fileImg2} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc2, 'image2')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg2)}>
              Upload
            </Button>
            { imageSrc2 && 
              <Card><CardMedia component="img" height="20" image={imageSrc2} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid md={6}>
          <TextField error={Boolean(errors.fileName3)} InputLabelProps={{ shrink: !!watch('fileName3') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('fileName3')}/>
          {/* @ts-ignore */}
          {errors.fileName3 && <Typography variant="caption" color={'red'}>{errors.fileName3.message}</Typography>}
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('image3')} ref={fileImg3} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc3, 'image3')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg3)}>
              Upload
            </Button>
            { imageSrc3 && 
              <Card><CardMedia component="img" height="20" image={imageSrc3} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid md={6}>
          <TextField error={Boolean(errors.fileName4)} InputLabelProps={{ shrink: !!watch('fileName4') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('fileName4')}/>
          {/* @ts-ignore */}
          {errors.fileName4 && <Typography variant="caption" color={'red'}>{errors.fileName4.message}</Typography>}
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('image4')} ref={fileImg4} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc4, 'image4')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg4)}>
              Upload
            </Button>
            { imageSrc4 && 
              <Card><CardMedia component="img" height="20" image={imageSrc4} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={10}>
        <Grid md={6}>
          <TextField error={Boolean(errors.fileName5)} InputLabelProps={{ shrink: !!watch('fileName5') }} required fullWidth variant="outlined" size="small" label="Name" autoFocus {...register('fileName5')}/>
          {/* @ts-ignore */}
          {errors.fileName5 && <Typography variant="caption" color={'red'}>{errors.fileName5.message}</Typography>}
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4" >
            <input type="file" {...register('image5')} ref={fileImg5} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc5, 'image5')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg5)}>
              Upload
            </Button>
            { imageSrc5 && 
              <Card><CardMedia component="img" height="20" image={imageSrc5} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
      </Grid>

    </>
  )
}

export default FormCompany