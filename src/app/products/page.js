export const dynamic = "force-dynamic";

import Link from "next/link";
import DeleteProduct from "./components/DeleteProduct";

const getProducts = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const response = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    const data = await response.json();

    if (data.success) return data.result;
    console.error("Failed to fetch products:", data.error);
    return [];
};

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <h1>Product Lists</h1>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.color}</td>
                            <td>{product.company}</td>
                            <td>{product.category}</td>
                            <td>
                                <Link href={`/products/${product._id}`}>Edit</Link>
                                <DeleteProduct id={product._id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <Link href="/">Home Page</Link>
        </div>
    );
}
