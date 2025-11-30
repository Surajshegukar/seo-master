"use client";
import ComponentCard from "@/src/components/admin/common/ComponentCard";
import Input from "@/src/components/admin/form/input/InputField";

import Label from "@/src/components/admin/form/Label";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/src/components/admin/form/Form";
import FormGroup from "@/src/components/admin/form/FormGroup";
import { CategoryFormData, categorySchema } from "@/src/validation/admin/validation";
import {  getCategoryById, submitCategory, uniqueCategory } from "@/src/services/admin/services";
import { useFetchById } from "@/src/hooks/admin/useFetchById";
import { useParams, useRouter } from "next/navigation";
import { useUniqueCheck } from "@/src/hooks/admin/useUniqueCheck";
import { useToastMessage } from "@/src/hooks/admin/useToastMessage";
 

export default function AddCategoryForm() {
  const id = useParams().id as number | undefined;
    const { message, setMessage } = useToastMessage();

  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
    },
  });

  // Memoize the setter so its reference doesn't change on every render
  const setFormData = useCallback((data: any) => {
    reset({
      category_name: data?.category_name || "",
    });
  }, [reset]);

  // Pass a stable service function (not inline arrow)
  const fetchService = useCallback(async (id: string) => {
    const res = await getCategoryById(Number(id));
    return res.data.data;
  }, []);

  useFetchById({
    fetchService,
    setFormData,
    onError: (err) => console.error(err),
  });

  const { isUnique, error, checkUnique } = useUniqueCheck(uniqueCategory, 800);

const categoryName = watch("category_name");

useEffect(() => {
  checkUnique(categoryName , id);
}, [categoryName,
    id,
   , checkUnique]);

  const onSubmit = async (data: CategoryFormData) => {

    if (isUnique === false) {
      setMessage({ type: "error", text: "Category name must be unique." });
      return;
    }

    setMessage(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const res = await submitCategory(id,formData);
      const result = await res.data;
      if (!res.data.success) throw new Error(result.message || "Failed to add category");
      setMessage({ type: "success", text: "Category added successfully!" });      
      reset({
        category_name: "",
      });
      navigate.push("/admin/category-list");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <ComponentCard title="Add Category">
      <Form onSubmit={handleSubmit(onSubmit)}
       className="space-y-4"
        isSubmitting={isSubmitting}
        message={message || undefined}
      >
        {/* Category Name */}
        <FormGroup>
          <Label>Category Name</Label>
          <Input placeholder="Enter category name" {...register("category_name")}
           error={!!errors.category_name || isUnique === false}
            unique={isUnique === true && !errors.category_name}
            errorMessage={
              errors.category_name?.message ||
              (isUnique === false ? "Category already exists" : undefined) ||
              (error ? "Error checking uniqueness" : undefined)

            }
            hint="e.g., Human Resources"
            />
        </FormGroup>

      </Form>
    </ComponentCard>
  );
}
