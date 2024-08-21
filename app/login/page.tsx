import { Box, Card, CardContent, Container } from "@mui/material";
import FormLogin from "./_component/FormLogin";
import Image from "next/image";
import { validateRequest } from "@auth/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/user");
	}
	return (
		<>
			<Container component="main" maxWidth="xs" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
				<Card className='shadow-lg'>
					<CardContent>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
							<Image src="/asset/img/logo.png" width={80} height={80} alt="mtelec logo"/>
							<FormLogin />
						</Box>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}