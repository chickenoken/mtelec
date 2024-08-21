"use client"
import ContactUs from "@app/(main)/_component/Home/contactUs/ContactUs";
import ImgCarousel from "@app/(main)/_component/Home/imgCarousel/ImgCarousel";
import RenderWorkingField from "@app/(main)/_component/services/renderWorkingField";
import { IProduct } from "@app/(main)/products/page";
import { getPElv, getPElvWorkingField } from "@app/user/pages/elv/_server/FormElvAction";
import { MotionDiv } from "@components/motion/MotionDiv";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import ImageLinks from "../_component/ImageLinks";
import { IWorkingField } from "../automation/page";
import Link from "next/link";
import Image from "next/image";

interface IElv {
	name1: string;
	image1: string;
	name2: string;
	image2: string;
	name3: string;
	image3: string;
	name4: string;
	image4: string;
}

const page = () => {
	const [workingField, setWorkingField] = React.useState<IWorkingField[]>([]);
	const [data, setData] = React.useState<IElv>();
	const [loading, setLoading] = useState(true);

  const getData = async () => {
    let rs = await getPElvWorkingField();
    setWorkingField(rs);
		rs = await getPElv();
		setData(rs);
		setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

	const itemData1: IProduct[] = [
		{
			_id: "1",
			company: "",
			title: "AUTOMATION DESIGN AND INSTALLATION",
			path: "/asset/img/home/carousel1/carousel_1.png",
		},
		{ _id: "1", company: "", title: "SOLAR SYSTEM", path: "/asset/img/home/carousel1/carousel_2.jpg" },
		{
			_id: "1",
			company: "",
			title: "HVAC DESIGN AND INSTALLATION",
			path: "/asset/img/home/carousel1/carousel_3.jpg",
		},
		{
			_id: "1",
			company: "",
			title: "ELV DESIGN AND INSTALLATION",
			path: "/asset/img/home/carousel1/carousel_4.jpg",
		},
		{
			_id: "1",
			company: "",
			title: "ELECTRICAL SERVICE",
			path: "/asset/img/home/carousel1/carousel_5.png",
		},
		{
			_id: "1",
			company: "",
			title: "ELECTRICAL DESIGN AND INSTALLATION",
			path: "/asset/img/home/carousel1/carousel_6.jpg",
		},
	];

	const AnimUp = ({ children }: { children: ReactNode }) => {
		return (
			<MotionDiv
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ duration: 1.3 }}
				variants={{
					visible: { opacity: 1, y: 0 },
					hidden: { opacity: 0, y: 50 },
				}}
			>
				{children}
			</MotionDiv>
		);
	};

	return (
		<>
	{ loading ? (
		<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
			<CircularProgress />
		</Box>
	) : (
		<>
			<Box display="flex" alignItems="center">
				<Box display="flex" className="border-b-2 md:ms-16 my-2">
					<MdChevronRight size="2rem" className="me-2" color="gray" />
					<Typography variant="overline" className="text-gray-300 me-2 text-lg">
						HOME PAGE
					</Typography>
					<MdChevronRight size="2rem" className="me-2" color="gray" />
					<Typography variant="overline" className="text-gray-300 me-2 text-lg">
						SERVICE
					</Typography>
					<MdChevronRight size="2rem" className="me-2" color="black" />
					<Typography variant="overline" className="text-black me-2 text-lg">
						ELV DESIGN AND INSTALLATION{" "}
					</Typography>
				</Box>
			</Box>
			<Box
					display="flex"
					alignItems="flex-start"
					flexDirection="column"
					position="relative"
					sx={{
						height: { xs: '400px', sm: '800px' },
						backgroundImage: `url(${"/asset/img/tangle_top.png"})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: "right top",
						backgroundSize: { xs: '300px 300px', sm: '700px 700px' },
						marginX: { sm: '25px' },
				}}
			>
				<Box sx={{zIndex : '1'}}>
					<Box display="flex" flexDirection="column" alignItems="flex-start"
						sx={{
							position: 'absolute',
							bottom: '20px',
							left: '20px',
						}}>
						<Typography variant="h4" className="font-bold text-white">
						ELV DESIGN AND INSTALLATION{" "}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ width: '100%', height: '100%', position: 'relative' }} className="mb-8">
					<Box
						sx={{ position: 'absolute', width: '95%', height: '95%', right: '2%', bottom: '0', paddingBottom: '105px'}}>
						<Image src="/asset/img/service/elv/hero.png" layout="fill" objectFit="cover" alt="f_logo"/>
					</Box>
				</Box>
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '0',}}>
					<Box sx={{ width: '100%', position: 'relative' }}>
						<Box sx={{ position: 'absolute', bottom: '0', left: '10px',}}>
							<Image src="/asset/img/tangle_bot.png" width={1100} height={1100} alt="f_logo" />
						</Box>
					</Box>
				</Box>
			</Box>
			<Container>
				{!!workingField.length && (
					<AnimUp>
						<Box
							className="mt-10 p-8"
							sx={{
								backgroundImage: `url('/asset/img/about/bg_1.png')`,
								backgroundSize: "cover",
							}}
						>
							<Typography variant="h5" className="font-bold trilong italic mb-4">
								Working Fields
							</Typography>

							<RenderWorkingField workingField={workingField} />
						</Box>
					</AnimUp>
				)}
				<AnimUp>
					<Box className="mt-10">
						<ImageLinks data={data} grid={6} start={1} num={4} />
					</Box>
					<Box>
						<Link href="/services">
							<Button
								className="h-16 px-8 py-5 mte-grey text-black text-xl font-bold mt-2"
								fullWidth
								variant="text"
							>
								Other Services
							</Button>
						</Link>
					</Box>
				</AnimUp>
				{/* PROJECTS */}
				<AnimUp>
					<Box className="my-20">
						<Container>
							<Typography className="trilong italic font-bold mb-2" variant="h3">
								Other Services
							</Typography>
							<ImgCarousel mode={itemData1} />
							<Link href="/services">
								<Button
									className="h-16 px-8 py-5 mte-grey text-black text-xl font-bold mt-2"
									fullWidth
									variant="text"
								>
									All Services
								</Button>
							</Link>
						</Container>
					</Box>
				</AnimUp>
				<AnimUp>
					<ContactUs />
				</AnimUp>
			</Container>
		</>
		)}
		</>
	);
};

export default page;
