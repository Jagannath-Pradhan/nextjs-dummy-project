import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import { connectionStr } from "@/utils/db";

export async function PUT(request, context) {
    const { productId } = await context.params;
    const query = { _id: productId };
    console.log(query)

    const updateData = await request.json();
    console.log(updateData)

    // mongoDB connection
    await mongoose.connect(connectionStr)

    const updatedProduct = await Product.findByIdAndUpdate(query, updateData, {
        new: true
    })

    // validation
    if (!updatedProduct) {
        return NextResponse.json({
            success: false,
            message: "Product not found",
        }, { status: 404 });
    }

    return NextResponse.json({
        success: true,
        message: "Product updated successfully",
        result: updatedProduct
    }, { status: 200 });
}




export async function GET(request, context) {
    const { productId } = await context.params;
    const query = { _id: productId };
    console.log(query)

    // mongoDB connection
    await mongoose.connect(connectionStr)
    
    const result = await Product.findById(query)
    
    return NextResponse.json({
        success: true,
        message: "Product fetched successfully",
        result
    }, { status: 200 });
}


export async function DELETE(request, context) {
    const { productId } = await context.params
    const query = { _id: productId }
    
    // mongoDB connection
    await mongoose.connect(connectionStr)

    await Product.findByIdAndDelete(query)

    return NextResponse.json({
        success: true,
        message: "Product deleted successfully"
    }, { status: 200 })
}