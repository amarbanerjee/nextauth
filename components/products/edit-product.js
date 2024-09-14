"use client";
import React, { useState, useEffect,useContext } from "react";
import BreadCrumb from "@/components/products/bread-crumb";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import NotificationContext from '@/store/notification-context';
import Image from 'next/image';

const breadCrumb = [
  { title: "Products", url: "../all-products" },
  { title: "Edit Product", url: "../edit/" },
];

const EditProduct = ({ id }) => {
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProduct(id);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //console.log("Data",data.product.image);

  const product = async () => {
    const { product } = await getProduct(id);
    //console.log(product);
    return product;
  }
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
    formData.append('file',data.image[0]);
    formData.append('title',data.title);
    formData.append('description',data.description);
    formData.append('price',data.price);
    
      const res = await fetch(`../api/products/${id}/`, {
        method: "POST",
        body: formData,
        
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const { message } = await res.json();
      //alert(message);
      notificationCtx.showNotification({
        title: 'Successfully Updated !!',
        message: 'Product Updated Successfully.',
        status: 'success',
      });
      router.push("../all-products");
    } catch (error) {
      console.log("Failed to update product", error);
      //alert("Failed to update product");
      notificationCtx.showNotification({
        title: 'Failed Updated !!',
        message: 'Product Updated Failed.',
        status: 'error',
      });
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await fetch(`../api/products/${id}`);
      if (!res.ok) {
        throw new Error("Failed to get product");
      }

      return await res.json();
    } catch (error) {
      alert("Failed to get product");
    }
  };

  //const result = await getProduct(id);
  //console.log(result);

 return (
    <div>
      <BreadCrumb lists={breadCrumb} />
      <h4 className="mb-2">Edit Product</h4>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  className="form-control"
                  {...register("title", {
                    required: true,
                  })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  {...register("description", { required: true })}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  className="form-control"
                  {...register("price", { required: true })}
                />
              </div>
              {data &&
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Exsisting Image
                </label>
                <Image
                    src={`https://my-admin-new.s3.eu-north-1.amazonaws.com/${data.product.image}`}
                    width={100}
                    height={100}
                   alt="Picture of the author"
                  />
              </div>
              }

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Upload New Photo
                </label>
                <input
                  className="form-control" type="file"
                  {...register("image")}
                />
              </div>

              <div className="mb-3 text-end">
                <input type="submit" className="btn btn-primary" />
              </div>

              {errors.exampleRequired && <span>This field is required</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
