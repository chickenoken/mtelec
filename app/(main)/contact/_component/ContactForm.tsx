"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogService } from '@lib/DialogService';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { saveContact } from '../_server/ContactAction';

const schema = z.object({
  name: z.string().min(1, 'Input is required'),
  email: z.string().min(1, 'Input is required'),
  phone : z.string().min(1, 'Input is required'),
  note : z.string().min(1, 'Input is required'),
});
const ContactForm = () => {
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    DialogService.confirm("Are you sure to apply?", async () => {
      let param = getValues();
      let rs = await saveContact(param);
      if(rs.status == 200){
        DialogService.success('Apply success', () => reset());
      }
    });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" className="font-bold txt-mte mb-4 text-center">
          Get in Touch
        </Typography>
        <Typography variant="body2" className="mb-4">
          Have a query or need support? Don’t hesitate to get in touch with us via the form below. Simply fill in the required details, and we’ll get back to you shortly.
        </Typography>
        <Box className="mb-6">
          <TextField error={Boolean(errors.name)} {...register('name')} label="Your Name" variant="filled" className="w-full bg-white" />
          {/* @ts-ignore */}
          {errors.name && <Typography variant="caption" color={'red'}>{errors.name?.message}</Typography>}
        </Box>
        <Box className="mb-6">
          <TextField error={Boolean(errors.email)} {...register('email')} label="Email" variant="filled" className="w-full bg-white" />
          {/* @ts-ignore */}
          {errors.email && <Typography variant="caption" color={'red'}>{errors.email?.message}</Typography>}
        </Box>
        <Box className="mb-6">
          <TextField error={Boolean(errors.phone)} {...register('phone')} label="Phone Number" variant="filled" className="w-full bg-white" />
          {/* @ts-ignore */}
          {errors.phone && <Typography variant="caption" color={'red'}>{errors.phone?.message}</Typography>}
        </Box>
        <Box className="mb-6">
          <TextField error={Boolean(errors.note)} {...register('note')} className="w-full bg-white" id="txtContent" label="Content" multiline rows={8} variant="filled"/>
          {/* @ts-ignore */}
          {errors.note && <Typography variant="caption" color={'red'}>{errors.note?.message}</Typography>}
        </Box>
        <Box>
          <Button type="submit" className="h-16 px-8 py-5 text-xl bg-mte text-white font-bold mt-2" fullWidth variant="text">Send Us</Button>
        </Box>
      </Box>
    </>
  )
}

export default ContactForm