"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogService } from "@lib/DialogService";
import { Box, Button, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveApplyRecruit } from "../_server/RecruitmentAction";

const schema = z.object({
  name: z.string().min(1, 'Input is required'),
  email: z.string().min(1, 'Input is required'),
  phone : z.string().min(1, 'Input is required'),
  position : z.string().min(1, 'Input is required'),
  cv: z.string().min(1, 'Input is required'),
});
const FormApplyRecruit = () => {
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    DialogService.confirm("Are you sure to apply?", async () => {
      let param = getValues();
      let rs = await saveApplyRecruit(param);
      if(rs.status == 200){
        DialogService.success('Apply success', () => reset());
      }
    });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}  sx={{ backgroundImage: `url('/asset/img/recruitment/bg_1.png')`, backgroundSize: 'cover'}}>
        <Grid container spacing={{ md: 9, lg: 15 }} className="p-5 m-5">
          <Grid md={7}>
            <Typography variant="h4" className="text-white font-bold">Job Application Form</Typography>
            <Typography variant="body2" className="text-white">We appreciate your interest in the recruiting role at MTELEC. To apply, simply fill out the form below with your information. We'll reach out to you shortly!</Typography>
            <TextField error={Boolean(errors.name)} {...register('name')} fullWidth label="Your Full Name / Họ và Tên" variant="filled" className="mt-5 bg-white"/>
            {/* @ts-ignore */}
            {errors.name && <Typography variant="caption" color={'red'}>{errors.name?.message}</Typography>}

            <TextField error={Boolean(errors.email)} {...register('email')} fullWidth label="Email" variant="filled" className="mt-5 bg-white"/>
            {/* @ts-ignore */}
            {errors.email && <Typography variant="caption" color={'red'}>{errors.email?.message}</Typography>}
            
            <TextField error={Boolean(errors.phone)} {...register('phone')} fullWidth label="Phone Number / Số Điện Thoại" variant="filled" className="mt-5 bg-white"/>
            {/* @ts-ignore */}
            {errors.email && <Typography variant="caption" color={'red'}>{errors.email?.message}</Typography>}

            <TextField error={Boolean(errors.position)} {...register('position')} fullWidth label="Position / Vị Trí Ứng Tuyển" variant="filled" className="mt-5 bg-white"/>
            {/* @ts-ignore */}
            {errors.position && <Typography variant="caption" color={'red'}>{errors.position?.message}</Typography>}
            
            <TextField error={Boolean(errors.cv)} {...register('cv')} fullWidth label="CV Link /  CV Ứng Viên" variant="filled" className="mt-5 bg-white"/>
            {/* @ts-ignore */}
            {errors.cv && <Typography variant="caption" color={'red'}>{errors.cv?.message}</Typography>}
            <Button fullWidth type="submit" variant="contained" className="mt-5 mte-grey text-black">APPLY NOW</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default FormApplyRecruit