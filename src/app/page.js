import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Basic CRUD Operation Project</h1>
      <Link href="/add-product">Add Product</Link>
      <br />
      <br />
      <Link href="/products">Products</Link>
    </div>
  );
}
