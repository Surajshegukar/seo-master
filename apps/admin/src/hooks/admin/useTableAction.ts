"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { activateItem, deactivateItem, deleteItem } from "@/src/services/admin/services";
import toast from "react-hot-toast";



interface ApiResponse {
    data: {
        success: boolean;
        message: string;
    };
}

export const useTableActions = (tableName: string) => {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const toggleStatus = async (id: number, currentStatus: string | number) => {
    try {
      let response: ApiResponse;
      if (currentStatus === 1) {
        response = await deactivateItem(tableName, id);
      } else {
        response = await activateItem(tableName, id);
      }

      if (response.data.success) {
        toast.success("Status updated successfully!");
        setRefresh((prev) => !prev);
      } else {
        toast.error("Failed to toggle status");
        console.error("Failed to toggle status:", response.data.message);
      }
    } catch (error) {
      toast.error("Error toggling status");
      console.error("Error toggling status:", error);

    }
  };

  const editItem = (id: number, path: string) => {
    router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3000/admin'}/${path}/${id}`);
  };

  const deleteItemAction = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the item.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const response: ApiResponse = await deleteItem(tableName, id);
        if (response.data.success) {
          toast.success("Item deleted successfully");
          setRefresh((prev) => !prev);
        } else {
          toast.error("Failed to delete item");
        }
      }
    } catch (error) {
      toast.error("Error deleting item");
      console.error("Error deleting item:", error);

    }
  };

  return { toggleStatus, editItem, deleteItemAction, refresh };
};
