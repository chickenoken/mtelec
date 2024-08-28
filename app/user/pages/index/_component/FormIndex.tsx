"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogService } from '@lib/DialogService'
import { Box, Button, Card, CardMedia, TextField, Typography } from '@mui/material'
import { FaRegSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from 'react'
import { CommonService } from '@lib/CommonService'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { getPIndex, savePIndex } from '../_server/FormIndexAction'

const FormIndex = () => {
  const fileImg1 = useRef<HTMLInputElement>(null);
  const [imageSrc1, setImageSrc1] = useState<string | null>(null);

  const fileImg2 = useRef<HTMLInputElement>(null);
  const [imageSrc2, setImageSrc2] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<any>({});

  const schema = z.object({
    about1: z.string().min(1, 'Input is required'),
    about2: z.string().min(1, 'Input is required'),
    concept: z.string().min(1, 'Input is required'),
    image1: z.string().min(1, 'Input is required'),
    image2: z.string().min(1, 'Input is required'),
  });
  const { register, getValues, trigger, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      if(param.image1 === originalData.image1) param.image1 = '';
      if(param.image2 === originalData.image2) param.image2 = '';
      let re = await savePIndex(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

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

  const getData = async () => {
    let rs = await getPIndex();
    if(rs){
      for (const [key, value] of Object.entries(rs)) {
        setValue(key, value);
      }
      setImageSrc1(rs.image1);
      setImageSrc2(rs.image2);
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
      <Typography variant="h6" className='mb-2'>About Mtelec</Typography>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.about1)} InputLabelProps={{ shrink: !!watch('about1') }} required fullWidth multiline rows={3}variant="outlined" size="small" label="Content About 1" autoFocus {...register('about1')}/>
        {/* @ts-ignore */}
        {errors.about1 && <Typography variant="caption" color={'red'}>{errors.about1.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.concept)} InputLabelProps={{ shrink: !!watch('concept') }} required fullWidth variant="outlined" size="small" label="Concept" {...register('concept')}/>
        {/* @ts-ignore */}
        {errors.concept && <Typography variant="caption" color={'red'}>{errors.concept.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.about2)} InputLabelProps={{ shrink: !!watch('about2') }} required fullWidth multiline rows={3} variant="outlined" size="small" label="Content About 2"  {...register('about2')}/>
        {/* @ts-ignore */}
        {errors.about2 && <Typography variant="caption" color={'red'}>{errors.about2.message}</Typography>}
      </Box>

      <Grid container spacing={10}>
        <Grid md={6}>
          <Box className="w-40 mb-4">
            <input type="file" {...register('image1')} ref={fileImg1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setImageSrc1, 'image1')} />
            <Button variant="contained" color="primary" className='bg-mte mb-2' onClick={() => handleUploadClick(fileImg1)}>
              Upload
            </Button>
            { imageSrc1 && 
              <Card><CardMedia component="img" height="20" image={imageSrc1} alt="Preview"/></Card>
            }
          </Box>
        </Grid>
        <Grid md={6}>
          <Box className="w-40 mb-4">
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



      



    </>
  )
}

export default FormIndex