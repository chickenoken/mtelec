"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { login } from './LoginAction';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next-nprogress-bar';

const schema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});
const FormLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const router = useRouter();

  const subLogin = async (data: any) => {
    const result = await login(data);
    if(result && result.error) {
      toast.error(result.error);
    }else{
      router.push("/user");
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(subLogin)} noValidate sx={{ mt: 1 }}>
        <TextField error={Boolean(errors.username)} margin="normal" required fullWidth label="User Name" autoFocus {...register('username')}/>
        {/* @ts-ignore */}
        {errors.username && <Typography variant="caption" color={'red'}>{errors.username?.message}</Typography>}
        <TextField error={Boolean(errors.password)} margin="normal" required fullWidth label="Password" type="password" id="password" autoComplete="current-password" {...register('password')} />
        {/* @ts-ignore */}
        {errors.password && <Typography variant="caption" color={'red'}>{errors.password?.message}</Typography>}
        <Button type="submit" fullWidth color="secondary" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
          />
      </Box>
    </>
  )
}

export default FormLogin