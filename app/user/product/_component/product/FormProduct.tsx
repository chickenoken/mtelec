"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonService } from "@lib/CommonService";
import { DialogService } from "@lib/DialogService";
import { Box, Button, Card, CardMedia, FormControl, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import { getProductById, updateProduct } from "../../_server/ProductAction";

interface FormCategoriesProps {
	id: string | null;
}

const FormProduct = ({ id }: FormCategoriesProps) => {
	const router = useRouter();
	const schema = z.object({
		title: z.string().min(4, "Title must be at least 3 characters"),
	});

	const {
		register,
		trigger,
		watch,
		formState: { errors },
		setValue,
		getValues,
	} = useForm({ resolver: zodResolver(schema) });
	const fileImg = useRef<HTMLInputElement>(null);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [currentData, setCurrentData] = useState<{ title: string; path: string }>({
		title: "",
		path: "",
	});

	const handleUploadClick = (event: any) => {
		fileImg.current?.click();
	};

	const handleFileChange = async (event: any) => {
		const file = event.target.files[0];
		setImageSrc(URL.createObjectURL(file));
		const b64File = await CommonService.convertToBase64(file);
		setValue("path", b64File);
	};

	const handleUpdate = async () => {
		let valid = await trigger();
		if (!valid) return toast.warn("Validate Failed");

		DialogService.save("Do you want to save the changes ?", async () => {
			const param = getValues();

			const res = await updateProduct({
				id: id as string,
				title: param.title !== currentData.title ? param.title : undefined,
				path: param.path !== currentData.path ? param.path : undefined,
			});
			if (res.status === 200) {
				DialogService.success("Your data has been saved", () => {
					router.push("/user/product");
				});
			}
		});
	};

	const getDataById = async () => {
		if (id) {
			let res = await getProductById(id);
			if (res) {
				for (const [key, value] of Object.entries(res)) {
					setValue(key, value);
				}
				setValue("_id", id);
				setCurrentData({
					title: res.title,
					path: res.path,
				});
				setImageSrc(res.path);
			}
		}
	};

	useEffect(() => {
		getDataById();
	}, [id]);

	return (
		<>
			<FormControl>
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
					<Link href="/user/product">
						<Button variant="outlined" color="secondary" startIcon={<FaArrowLeft />}>
							Back
						</Button>
					</Link>
					<Button
						onClick={handleUpdate}
						variant="contained"
						className="bg-blue-600"
						startIcon={<FaRegSave />}
					>
						Update
					</Button>
				</Box>
				<Box className="w-1/2 mb-4">
					<TextField
						error={Boolean(errors.title)}
						InputLabelProps={{ shrink: !!watch("title") }}
						required
						fullWidth
						variant="outlined"
						size="small"
						label="Name"
						autoFocus
						{...register("title")}
					/>
					{/* @ts-ignore */}
					{errors.title && (<Typography variant="caption" color={"red"}>{errors.title.message}</Typography>
					)}
				</Box>
				<Box className="w-40 mb-4">
					<Typography variant="h6" gutterBottom>
						Image Logo
					</Typography>
					<input
						type="file"
						{...register("path")}
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
		</>
	);
};

export default FormProduct;
