"use client";
import React, { useEffect, useState, useContext } from "react";
import DataTable from "@/components/products/dataTable";
import Pagination from "@/components/products/pagination";
import NotificationContext from '@/store/notification-context';

const cols = ["ID", "TITLE", "DESCRIPTION", "PRICE"];

const AllProducts = () => {
  const notificationCtx = useContext(NotificationContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 3;


  const [rows, setRows] = useState([]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    notificationCtx.showNotification({
      title: 'Loading.. !!',
      message: 'Loading Products from database..',
      status: 'pending',
    });

    async function getPageCount() {
      try {
        const perpage=2;
        const page=1;
        const res = await fetch("/api/products/productCount");
        if (!res.ok) {
          throw new Error("Error fetching products");
        }

        const { count } = await res.json();
        //console.log(count);
        //setRows(products);
        setPageCount(count);
        
        notificationCtx.showNotification({
          title: 'Product Loaded.. !!',
          message: 'Successfully Loaded..',
          status: 'success',
        });
      } catch (error) {
        
        notificationCtx.showNotification({
          title: 'Product Loaded Failed.. !!',
          message: 'Error in Loding Products ..',
          status: 'error',
        });

        console.log("Error fetching products");
      }
    }

    async function getAllProducts() {
      try {
        //const perpage=2;
        //const page=1;
        console.log("Current Page",currentPage);
        console.log("Page Size",pageSize);

        const res = await fetch(`/api/products/all-products?perpage=${pageSize}&page=${currentPage}`);
        if (!res.ok) {
          throw new Error("Error fetching products");
        }

        const { products } = await res.json();
        setRows(products);
        
        notificationCtx.showNotification({
          title: 'Product Loaded.. !!',
          message: 'Successfully Loaded..',
          status: 'success',
        });
      } catch (error) {
        
        notificationCtx.showNotification({
          title: 'Product Loaded Failed.. !!',
          message: 'Error in Loding Products ..',
          status: 'error',
        });

        console.log("Error fetching products");
      }
    }
    getAllProducts();
    getPageCount();
  }, [currentPage]);
  return (
  
    <>
    <DataTable cols={cols} rows={rows} />
    
    <Pagination
       items={pageCount} // 100
       currentPage={currentPage} // 1
       pageSize={pageSize} // 10
       onPageChange={onPageChange}
        />
    </>

  );
};

export default AllProducts;
