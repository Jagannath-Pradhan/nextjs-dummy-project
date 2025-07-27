"use client"

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter()
    console.log(params.editProduct)

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const getProductDetails = async () => {
            // const response = await fetch(`http://localhost:3000/api/products/${params.editProduct}`);
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
            const response = await fetch(`${baseUrl}/api/products/${params.editProduct}`);
            const data = await response.json();
            console.log(data);

            if (data.success) {
                const product = data.result;
                setName(product.name);
                setPrice(product.price);
                setColor(product.color);
                setCompany(product.company);
                setCategory(product.category);
            } else {
                console.error("Failed to fetch product details:", data.error);
            }
        }
        getProductDetails();
    }, [])

    const updateProduct = async () => {
        const updatedProduct = { name, price, color, company, category };

        // const response = await fetch(`http://localhost:3000/api/products/${params.editProduct}`, {
        const response = await fetch(`/api/products/${params.editProduct}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
            alert("Product updated successfully");
            router.push("/products");
        } else {
            console.error("Failed to update product:", data.error);
        }
    }


    return (
        <div>
            <h1>Update Product</h1>
            <input type="text" placeholder="Name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Price" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="Color" className="input" value={color} onChange={(e) => setColor(e.target.value)} />
            <input type="text" placeholder="Company" className="input" value={company} onChange={(e) => setCompany(e.target.value)} />
            <input type="text" placeholder="Category" className="input" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button className="btn" onClick={updateProduct}>Update Product</button>
            <br />
            <Link href="/products">Products Page</Link>
        </div>
    );
}