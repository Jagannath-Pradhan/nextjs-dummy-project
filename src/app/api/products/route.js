import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db";
import Product from "@/models/product";

export async function GET() {
    try {
        await mongoose.connect(connectionStr)
        const products = await Product.find()
        // console.log(products)

        return NextResponse.json({
            success: true,
            count: products.length,
            message: "Products fetched successfully",
            result: products
        }, { status: 200 });
    } catch (error) {
        console.log("Error fetching products", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching products",
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await mongoose.connect(connectionStr)
        const requestBody = await request.json()
        const newProduct = new Product(requestBody)
        const savedProduct = await newProduct.save()

        return NextResponse.json({
            success: true,
            message: "Product created successully",
            savedProduct
        }, { status: 201 })
    } catch (error) {
        console.error("Error creating product", error);
        return NextResponse.json({
            success: false,
            message: "Error creating product",
            error: error.message
        }, { status: 500 });
    }
}