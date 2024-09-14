"use client";
import React, { useEffect, useState, useContext } from "react";
import DataTable from "@/components/products/dataTable";
import NotificationContext from '@/store/notification-context';

const cols = ["ID", "TITLE", "DESCRIPTION", "PRICE"];

const AllProducts = () => {
  const notificationCtx = useContext(NotificationContext);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    notificationCtx.showNotification({
      title: 'Loading.. !!',
      message: 'Loading Products from database..',
      status: 'pending',
    });

    async function getAllProducts() {
      try {
        const res = await fetch("/api/products/all-products");
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
  }, []);
  return <DataTable cols={cols} rows={rows} />;
};

export default AllProducts;
