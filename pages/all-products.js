"use client";
import React from "react";
import Link from "next/link";
import AllProducts from "@/components/products/all-products";
import { getSession } from 'next-auth/react';


const ProductHome = () => {
  //const session =  getSession({ req: context.req });
  return (
    <div>
      <div className="d-flex mb-2">
        <Link className="btn btn-primary" href="../add-product/">
          Add Product
        </Link>
      </div>
      <div>
        <AllProducts/>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProductHome;
