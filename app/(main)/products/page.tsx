"use client"
import { getCompanyWithProduct } from "@app/user/product/_server/CompanyAction";
import { MotionDiv } from "@components/motion/MotionDiv";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { default as ImgCarousel } from "../_component/Home/imgCarousel/ImgCarousel";

export interface IProduct {
	_id: string;
	title: string;
	path: string;
	company: string;
}

interface ICompanyWithProduct {
	_id: string;
	path: string;
	products: IProduct[];
}

const Pages = () => {
	const [res, setData] = useState<ICompanyWithProduct[] | null>(null);
	const [loading, setLoading] = useState(true);

	const getData = async () => {
		let rs = await getCompanyWithProduct();
		setData(rs);
		setLoading(false);
	}

	useEffect(() => {
		getData();
	}, []);

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
			{loading ? (
					<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
						<CircularProgress color="success" />
					</Box>
				) : (
					<>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="flex-start"
							sx={{
								backgroundImage: `url(${"/asset/img/products/hero.png"})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: "cover",
								backgroundPosition: "center",
								paddingTop: '8%',
							}}
						>
							<AnimUp>
								<Box display="flex" flexDirection="column" alignItems="flex-start">
									<Box display="flex" className="border-b-2 border-white md:ms-16">
										<MdChevronRight size="2rem" className="me-2" color="white" />
										<Typography variant="overline" className="text-white me-2 text-lg">HOME PAGE</Typography>
										<MdChevronRight size="2rem" className="me-2" color="white" />
										<Typography variant="overline" className="text-white me-2 text-lg">PRODUCTS</Typography>
									</Box>
									<Typography variant="h3" className="trilong italic text-white mt-4 ms-16">Our</Typography>
									<Typography variant="h3" className="font-bold text-white mb-4 md:ms-16">PRODUCTS</Typography>
								</Box>
							</AnimUp>
							<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
								<Box sx={{ width: '100%' }}>
									<Image src="/asset/img/cut_banner.png" layout="responsive" width="100" height="50" alt="f_logo" />
								</Box>
							</Box>
						</Box>
						<Container>
						<AnimUp>
							<Box className="lg:px-36 mb-8">
								<Typography className="font-bold txt-mte mb-2">
									MTELEC is also a distributor of high-quality Electrical Equipment for all projects
									about Electrical System Installation and Automation.{" "}
								</Typography>
								<Typography className="font-bold txt-mte">
									We have been supplying and installing the most reputable brands like ABB, LEGRAND,
									SIEMENS and SCHNEIDER for our projects.
								</Typography>
							</Box>
						</AnimUp>
						{res?.map((i: ICompanyWithProduct) => (
							<AnimUp key={i._id}>
								<Box className="mb-14">
									<Image src={i.path} alt="hero" width={300} height={300} className="mb-4" />
									<ImgCarousel mode={i.products} title="text-center"/>
								</Box>
							</AnimUp>
						))}
				</Container>
			</>
			)}
		</>
	);
};

export default Pages;
