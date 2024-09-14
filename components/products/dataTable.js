import Link from "next/link";
import { useContext, React } from "react";
import NotificationContext from '@/store/notification-context';
import Image from 'next/image';

const DataTable = ({ cols = [], rows = [] }) => {

  const notificationCtx = useContext(NotificationContext);


  const handlerDelete = async (id) => {
    if (confirm("Are you sure you want to delete")) {
      try {
        const res = await fetch(`../api/products/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Couldn't delete");
        }

        const { message } = await res.json();
        
        notificationCtx.showNotification({
          title: 'Successfully Deleded !!',
          message: 'Product Deleted Successfully.',
          status: 'success',
        });
        //router.push("../all-products");
        window.location.href="/all-products";
      } catch (error) {
       // alert("Error deleting");
       notificationCtx.showNotification({
        title: 'Error Deleting Product !!',
        message: 'Product Deleted Failed.',
        status: 'error',
      });
      }
    }
  };

  return (
    <table className="table">
      <thead>
        <tr className="table-primary">
          
            <th>Index</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Photo</th>
            <th>Actions</th>
         
          
        </tr>
      </thead>
      <tbody>
        {rows.map((tr, i) => (
          <tr key={i}>
            <td>{i+1}</td>
            <td>{tr?.title}</td>
            <td>{tr?.description}</td>
            <td>{tr?.price}</td>
            <td> <Image
                    src={`https://my-admin-new.s3.eu-north-1.amazonaws.com/${tr?.image}`}
                    width={100}
                    height={100}
                   alt="Picture of the author"
                  />
    
            </td>
            <td>
              <div className="d-flex gap-1">
                <Link
                  className="btn btn-info btn-sm"
                  href={`../view/${tr?._id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-warning btn-sm"
                  href={`../product-edit/${tr?._id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handlerDelete(tr?._id)}
                >
                  Trash
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
