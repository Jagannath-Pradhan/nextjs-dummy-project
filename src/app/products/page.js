import Link from "next/link";
import DeleteProduct from "./components/DeleteProduct";

const getProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products")
    const data = await response.json();

    if (data.success) {
        return data.result;
    } else {
        console.error("Failed to fetch products:", data.error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();
    // console.log(products)

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
                                <Link href={"/products/" + product._id}>Edit</Link>
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