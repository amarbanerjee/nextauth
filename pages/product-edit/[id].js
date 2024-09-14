"use client";
import React from "react";
import Link from "next/link";
import EditProduct from "@/components/products/edit-product";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const EditAProduct = () => {
    const router = useRouter();
    const id = router.query.id;
    return (
      <div>
        <div className="d-flex mb-2">
         <EditProduct id={id} />
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
  
  export default EditAProduct;