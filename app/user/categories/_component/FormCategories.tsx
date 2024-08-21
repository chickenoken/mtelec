"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonService } from "@lib/CommonService";
import { DialogService } from "@lib/DialogService";
import { Box, Button, Card, CardMedia, Divider, FormControl, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import { getCateById, saveCate, updateCate } from "../_server/FormCategoriesAction";
import FormCateProject from "./FormCateProject";

interface FormCategoriesProps {
	id: string | null;
}

const FormCategories = ({ id }: FormCategoriesProps) => {
	const router = useRouter();
	const schema = z.object({
		cate_name: z.string().min(4, "User Name must be at least 3 characters"),
	});

	const {
		register,
		trigger,
		formState: { errors },
		watch,
		setValue,
		getValues,
	} = useForm({ resolver: zodResolver(schema) });
	const fileImg = useRef<HTMLInputElement>(null);
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	const handleUploadClick = (event: any) => {
		fileImg.current?.click();
	};

	const handleFileChange = async (event: any) => {
		const file = event.target.files[0];
		setImageSrc(URL.createObjectURL(file));
		const b64File = await CommonService.convertToBase64(file);
		setValue("image", b64File);
	};

	const handleSave = async () => {
		let valid = await trigger();
		if (!valid) return toast.warn("Validate Failed");

		DialogService.save("Do you want to save the changes ?", async () => {
			let param = getValues();
			let re = await saveCate(param);
			if (re.status === 200) {
				DialogService.success("Your data has been saved", () => {
					router.push("/user/categories");
				});
			}
		});
	};

	const handleUpdate = async () => {
		let valid = await trigger();
		if (!valid) return toast.warn("Validate Failed");

		DialogService.save("Do you want to save the changes ?", async () => {
			let param = getValues();
			let re = await updateCate(param);
			if (re.status === 200) {
				DialogService.success("Your data has been saved", () => {
					router.push("/user/categories");
				});
			}
		});
	};

	const getDataById = async (data: any) => {
		if (id) {
			let rs = await getCateById(id);
			if (rs) {
				for (const [key, value] of Object.entries(rs)) {
					setValue(key, value);
				}
				setValue("_id", id);
				setImageSrc(rs.image);
			}
		}
	};

	useEffect(() => {
		getDataById({ id });
	}, []);

	return (
		<>
			<FormControl>
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
					<Link href="/user/categories">
						<Button variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>
							Back
						</Button>
					</Link>
					{!id && (
						<Button
							onClick={handleSave}
							variant="contained"
							className="bg-blue-600"
							startIcon={<FaRegSave />}
						>
							Save
						</Button>
					)}
					{id && (
						<Button
							onClick={handleUpdate}
							variant="contained"
							className="bg-blue-600"
							startIcon={<FaRegSave />}
						>
							Update
						</Button>
					)}
				</Box>
				<Box className="w-1/2 mb-4">
					<TextField
						error={Boolean(errors.cate_name)}
						InputLabelProps={{ shrink: !!watch("cate_name") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Catergory Name"
						autoFocus
						{...register("cate_name")}
					/>
					{/* @ts-ignore */}
					{errors.cate_name && (<Typography variant="caption" color={"red"}>{errors.cate_name.message}</Typography>)}
				</Box>
				<Box className="w-40 mb-4">
					<Typography variant="h6" gutterBottom>
						Image Logo
					</Typography>
					<input
						type="file"
						{...register("image")}
						ref={fileImg}
						style={{ display: "none" }}
						onChange={handleFileChange}
					/>
					<Button
						variant="contained"
						color="primary"
						className="bg-mte mb-2"
						onClick={handleUploadClick}
					>
						Upload
					</Button>
					{imageSrc && (
						<Card>
							<CardMedia component="img" height="20" image={imageSrc} alt="Preview" />
						</Card>
					)}
				</Box>
			</FormControl>
			{id && (
				<>
					<Divider className="my-4" />
					<Typography variant="h6" gutterBottom>
						Category Project Detail
					</Typography>
					<FormCateProject id={id} />
				</>
			)}
		</>
	);
};

export default FormCategories;
