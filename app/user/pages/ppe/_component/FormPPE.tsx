"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonService } from '@lib/CommonService';
import { DialogService } from '@lib/DialogService';
import { Box, Button, Card, CardMedia, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaRegSave } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { z } from 'zod';
import { getPPPE, savePPPE } from '../server/FormPPEAction';

const FormPPE = () => {
  const fileImg1 = useRef<HTMLInputElement>(null);
  const [imageSrc1, setImageSrc1] = useState<string | null>(null);
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
    image1: z.string().min(1, 'Image 1 is required'),
    title1: z.string().min(1, 'Title 1 is required'),
    content1: z.string().min(1, 'Content 1 is required'),
    title2: z.string().min(1, 'Title 2 is required'),
    content2: z.string().min(1, 'Content 2 is required'),
    title3: z.string().min(1, 'Title 3 is required'),
    content3: z.string().min(1, 'Content 3 is required'),
  });
  const { register, getValues, trigger, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      if(param.image1 === originalData.image1) param.image1 = '';
      let re = await savePPPE(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

  const getData = async () => {
    let rs = await getPPPE();
    if(rs){
      for (const [key, value] of Object.entries(rs)) {
        setValue(key, value);
      }
      setImageSrc1(rs.image1);
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

      <Box className="w-40 mb-4" >
        <input type="file" {...register('image3')} ref={fileImg1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc1, 'image1')} />
        <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg1)}>
          Upload
        </Button>
        { imageSrc1 && 
          <Card><CardMedia component="img" height="20" image={imageSrc1} alt="Preview"/></Card>
        }
      </Box>

      <Box display="flex">
        <Box className="w-1/3 mb-2">
          <TextField error={Boolean(errors.title1)} InputLabelProps={{ shrink: !!watch('title1') }} required fullWidth multiline variant="outlined" size="small" label="title1" autoFocus {...register('title1')}/>
          {/* @ts-ignore */}
          {errors.title1 && <Typography variant="caption" color={'red'}>{errors.title1.message}</Typography>}
        </Box>
        <Box className="w-2/3 mb-2 ml-2">
          <TextField error={Boolean(errors.content1)} InputLabelProps={{ shrink: !!watch('content1') }} required fullWidth multiline variant="outlined" size="small" label="content1" autoFocus {...register('content1')}/>
          {/* @ts-ignore */}
          {errors.content1 && <Typography variant="caption" color={'red'}>{errors.content1.message}</Typography>}
        </Box>
      </Box>

      <Box display="flex">
        <Box className="w-1/3 mb-2">
          <TextField error={Boolean(errors.title2)} InputLabelProps={{ shrink: !!watch('title2') }} required fullWidth multiline variant="outlined" size="small" label="title2" autoFocus {...register('title2')}/>
          {/* @ts-ignore */}
          {errors.title2 && <Typography variant="caption" color={'red'}>{errors.title2.message}</Typography>}
        </Box>
        <Box className="w-2/3 mb-2 ml-2">
          <TextField error={Boolean(errors.content2)} InputLabelProps={{ shrink: !!watch('content2') }} required fullWidth multiline variant="outlined" size="small" label="content2" autoFocus {...register('content2')}/>
          {/* @ts-ignore */}
          {errors.content2 && <Typography variant="caption" color={'red'}>{errors.content2.message}</Typography>}
        </Box>
      </Box>

      <Box display="flex">
        <Box className="w-1/3 mb-2">
          <TextField error={Boolean(errors.title3)} InputLabelProps={{ shrink: !!watch('title3') }} required fullWidth multiline variant="outlined" size="small" label="title3" autoFocus {...register('title3')}/>
          {/* @ts-ignore */}
          {errors.title3 && <Typography variant="caption" color={'red'}>{errors.title3.message}</Typography>}
        </Box>
        <Box className="w-2/3 mb-2 ml-2">
          <TextField error={Boolean(errors.content3)} InputLabelProps={{ shrink: !!watch('content3') }} required fullWidth multiline variant="outlined" size="small" label="content3" autoFocus {...register('content3')}/>
          {/* @ts-ignore */}
          {errors.content3 && <Typography variant="caption" color={'red'}>{errors.content3.message}</Typography>}
        </Box>
      </Box>
    </>
  )
}

export default FormPPE