"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProductPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");

    const router = useRouter();

    const addProduct = async () => {
        // console.log(name, price, color, company, category);
        // let result = await fetch("/api/products", {                      //or
        // let result = await fetch("http://localhost:3000/api/products", {
        let result = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({ name, price, color, company, category })
        });
        result = await result.json();
        // if (result.ok) {
        if (result.success) {
            alert("Product added successfully");
            setName("");
            setPrice("");
            setColor("");
            setCompany("");
            setCategory("");
            router.push("/products"); // Redirect to products page
        } else {
            alert("Failed to add product");
        }
    }

    return (
        <div>
            <h1>Add Product</h1>
            <input type="text" placeholder="Name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Price" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="Color" className="input" value={color} onChange={(e) => setColor(e.target.value)} />
            <input type="text" placeholder="Company" className="input" value={company} onChange={(e) => setCompany(e.target.value)} />
            <input type="text" placeholder="Category" className="input" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button className="btn" onClick={addProduct}>Add Product</button>
            <br />
            <Link href="/">Home Page</Link>
        </div>
    );
}