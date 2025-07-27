"use client";

import { useRouter } from "next/navigation";

export default function DeleteProduct({ id }) {
    const router = useRouter()
    const deleteRecord = async () => {
        // const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        if( data.success ) {
            alert("Product deleted successfully");
            router.push("/products");
        } else {
            console.error("Failed to delete product:", data.error);
            alert("Failed to delete product");
        }
    }

    return (
        <button onClick={deleteRecord}>Delete</button>
    )
}