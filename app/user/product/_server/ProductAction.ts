"use server";
import { default as dbConnect } from "@db/db";
import { default as Products } from "@model/Product";

interface IClientData {
	title: string;
	path: string;
}

interface IUpdateProduct {
	id: string;
	title: string;
	path: string;
}

// products
/**
 * -> insert: this api need you in FormCategories.tsx
 * -> set img upload with input multiple
 * const [a, setA] = useState<string[]>([]);
 *
 * handleChangeFile = async (event: any) => {
 * 		for (let i in event.target.files) {
			const file = event.target.files[i];
			const ba64 = await CommonService.convertToBase64(file);
			setA((prev) => [...prev, ba64]);
	}}

	=> in this ex i user itemData4, we have 4 data to insert from 1 to 4. And image must be in order of each image in the product. company field it a id of company. by the way, you must insert company first before insert product.

		const handleSave1 = async () => {
		const { cate_name: company } = getValues();
		await insertProduct(itemData4, a, company);
	};

 * create button to top below first <>
 * <button onClick={() => handleSave1()}>save</button>
 * 
 * add multiple inside input type file
 */
export const insertProduct = async (clientData: IClientData[], path: string[], company: string) => {
	await dbConnect();

	for (let i = 0; i < clientData.length; i++) {
		const product = new Products();
		product.title = clientData[i].title;
		product.path = path[i];
		product.company = company;
		await product.save();
	}

	return { status: 200 };
};

export const getAllProduct = async () => {
	await dbConnect();
	const pro = await Products.find({});
	return JSON.parse(JSON.stringify(pro));
};

export const getProductByCompany = async (id: string) => {
	await dbConnect();
	let products = await Products.find({
		company: id,
	});
	return JSON.parse(JSON.stringify(products));
};

export const getProductById = async (id: string) => {
	await dbConnect();
	let product = await Products.findOne({ _id: id });
	return JSON.parse(JSON.stringify(product));
};

export const updateProduct = async (data: IUpdateProduct) => {
	const { title, path, id } = data;
	await dbConnect();
	await Products.updateOne(
		{ _id: id },
		{
			title,
			path,
		}
	);
	return { status: 200 };
};
