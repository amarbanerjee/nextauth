"use client";
import { useState, useRef, useContext, React } from "react";
import BreadCrumb from "@/components/products/bread-crumb";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import NotificationContext from '@/store/notification-context';




const breadCrumb = [
  { title: "Products", url: "../all-products" },
  { title: "Add New Product", url: "../add-product/" },
];



const AddProduct = () => {
  
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

   

    const formData = new FormData();
    formData.append('file',data.image[0]);
    formData.append('title',data.title);
    formData.append('description',data.description);
    formData.append('price',data.price);

    console.log("Image",data.image[0]);

    //const result = await uploadFile(body);
    //const imageName = await uploadFile(formData);
    //body.image = imageName;
    
    try {
      
        const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
        
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const message = await res.json();
      console.log(message);
      notificationCtx.showNotification({
        title: 'Successfully Added !!',
        message: 'Product Added Successfully.',
        status: 'success',
      });

      router.push("../all-products");
    } catch (error) {
      console.log("Failed to add product", error);
      
      notificationCtx.showNotification({
        title: 'Insert Failed !!',
        message: 'Product Added Failed!!',
        status: 'error',
      });
      //alert("Failed to add product");
    }
  };

  return (
    <div>
      <BreadCrumb lists={breadCrumb} />
      <h4 className="mb-2">Add New Product</h4>
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
                  {...register("title", { required: true })}
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

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Photo
                </label>
                <input type="file"
                  className="form-control"
                  {...register("image", { required: true })}
                />
              </div>

              
              <div className="mb-3 text-end">
                <input type="submit" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
