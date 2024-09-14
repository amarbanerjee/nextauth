"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import ViewProduct from "@/components/products/view-product";

const ViewProductPage = () => {
    const router = useRouter();
    const id = router.query.id;
    return (
      <div>
        <div className="d-flex mb-2">
         <ViewProduct id={id} />
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
  
  export default ViewProductPage;