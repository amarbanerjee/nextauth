"use client";
import React from "react";
import Link from "next/link";
import AddProduct from "@/components/products/add-product";
import { getSession } from 'next-auth/react';

const AddNewProduct = () => {
    return (
      <div>
        <div className="d-flex mb-2">
         <AddProduct />
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
  
  export default AddNewProduct;