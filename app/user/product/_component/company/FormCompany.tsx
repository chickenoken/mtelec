"use client";
import { CommonService } from "@lib/CommonService";
import { DialogService } from "@lib/DialogService";
import { Box, Button, Card, CardMedia, Divider, FormControl, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCompanyById, updateCompany } from "../../_server/CompanyAction";
import FormCompanyProduct from "./FormCompanyProduct";

interface FormCategoriesProps {
	id: string | null;
}

const FormCompany = ({ id }: FormCategoriesProps) => {
	const router = useRouter();

	const {
		register,
		trigger,
		formState: { errors },
		setValue,
		getValues,
	} = useForm();
	const fileImg = useRef<HTMLInputElement>(null);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [currentImg, setCurrentImg] = useState<string>("");

	const handleUploadClick = (event: any) => {
		fileImg.current?.click();
	};

	const handleFileChange = async (event: any) => {
		const file = event.target.files[0];
		setImageSrc(URL.createObjectURL(file));
		const b64File = await CommonService.convertToBase64(file);
		setValue("image", b64File);
	};

	const handleUpdate = async () => {
		let valid = await trigger();
		if (!valid) return toast.warn("Validate Failed");

		DialogService.save("Do you want to save the changes ?", async () => {
			const { image } = getValues();

			if (image === currentImg) {
				DialogService.success("Your data not change", () => {
					router.push("/user/product");
				});
				return;
			}

			const re = await updateCompany({
				id: id as string,
				path: image,
			});

			if (re.status === 200) {
				DialogService.success("Your data has been saved", () => {
					router.push("/user/product");
				});
			}
		});
	};

	const getDataById = async () => {
		if (id) {
			let res = await getCompanyById(id);
			if (res) {
				setCurrentImg(res.path);
				setValue("image", res.path);
				setValue("_id", id);
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
						Product List Company
					</Typography>
					<FormCompanyProduct id={id} />
				</>
			)}
		</>
	);
};

export default FormCompany;
