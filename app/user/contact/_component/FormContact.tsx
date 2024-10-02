"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Typography } from '@mui/material'
import { FaRegSave } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import { useEffect } from 'react'
import { z } from 'zod'
import { toast } from 'react-toastify';
import { DialogService } from '@lib/DialogService';
import { getContactInfo, saveContactInfo } from '../_server/FormContactAction';

const FormContact = () => {
    const schema = z.object({
      label: z.string().min(1, 'Input is required'),
      address: z.string().min(1, 'Input is required'),
      phone: z.string().min(1, 'Input is required'),
      email: z.string().min(1, 'Input is required'),
    });
        
  const { register, getValues, trigger, setValue, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const handleSave = async () => {
    let valid = await trigger();
    if(!valid) return toast.warn('Validate Failed');

    DialogService.save("Do you want to save the changes ?", async () => {
      let param = getValues();
      let re = await saveContactInfo(param);
      if(re.status === 200){
        DialogService.success('Your data has been saved', () => {});
      }
    });
  }

  const getData = async () => {
    let rs = await getContactInfo();
    if(rs){
      for (const [key, value] of Object.entries(rs)) {
        setValue(key, value);
      }
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
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.label)} InputLabelProps={{ shrink: !!watch('label') }} required fullWidth variant="outlined" size="small" label="label" autoFocus {...register('label')}/>
        {/* @ts-ignore */}
        {errors.label && <Typography variant="caption" color={'red'}>{errors.label.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.address)} InputLabelProps={{ shrink: !!watch('address') }} required fullWidth multiline rows={3} variant="outlined" size="small" label="address" autoFocus {...register('address')}/>
        {/* @ts-ignore */}
        {errors.address && <Typography variant="caption" color={'red'}>{errors.address.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.phone)} InputLabelProps={{ shrink: !!watch('phone') }} required fullWidth variant="outlined" size="small" label="phone" autoFocus {...register('phone')}/>
        {/* @ts-ignore */}
        {errors.phone && <Typography variant="caption" color={'red'}>{errors.phone.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.email)} InputLabelProps={{ shrink: !!watch('email') }} required fullWidth variant="outlined" size="small" label="email" autoFocus {...register('email')}/>
        {/* @ts-ignore */}
        {errors.email && <Typography variant="caption" color={'red'}>{errors.email.message}</Typography>}
      </Box>
      <Typography variant="h6" className='mb-2'>Maps Setup</Typography>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.latitude)} InputLabelProps={{ shrink: !!watch('latitude') }} required fullWidth variant="outlined" size="small" label="latitude" autoFocus {...register('latitude')}/>
        {/* @ts-ignore */}
        {errors.latitude && <Typography variant="caption" color={'red'}>{errors.latitude.message}</Typography>}
      </Box>
      <Box className="w-1/2 mb-2">
        <TextField error={Boolean(errors.longitude)} InputLabelProps={{ shrink: !!watch('longitude') }} required fullWidth variant="outlined" size="small" label="longitude" autoFocus {...register('longitude')}/>
        {/* @ts-ignore */}
        {errors.longitude && <Typography variant="caption" color={'red'}>{errors.longitude.message}</Typography>}
      </Box>
    </>
  )
}

export default FormContact