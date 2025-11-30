"use client";
import ComponentCard from "@/src/components/admin/common/ComponentCard";
import Input from "@/src/components/admin/form/input/InputField";
import Label from "@/src/components/admin/form/Label";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormGroup from "@/src/components/admin/form/FormGroup";
import { MagazineFormData, magazineSchema } from "@/src/validation/admin/validation";
import {  getAllCategorys, getMagazineById, submitMagazine, uniqueMagazine } from "@/src/services/admin/services";
import { useFetchById } from "@/src/hooks/admin/useFetchById";
import { useParams, useRouter } from "next/navigation";
import { useUniqueCheck } from "@/src/hooks/admin/useUniqueCheck";
import { useToastMessage } from "@/src/hooks/admin/useToastMessage";
import dynamic from "next/dynamic";
import FileInput from "@/src/components/admin/form/input/FileInput";
import TextArea from "@/src/components/admin/form/input/TextArea";
import TextEditorInput from "@/src/components/admin/form/input/TextEditor";
import Form from "@/src/components/admin/form/Form";
import Link from "next/link";
import { useLabeledOptions } from "@/src/hooks/admin/useFetchOptions";


const Select = dynamic(() => import('@/src/components/admin/form/Select'), { ssr: false });
const DatePicker = dynamic(() => import('@/src/components/admin/form/date-picker'), { ssr: false });


export default function AddMagazineForm() {
  const id = useParams().id as number | undefined;
  const { message, setMessage } = useToastMessage();
  
  const navigate = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [editorKey, setEditorKey] = useState(0);

  const mapCategoryLabel = (item: { category_name: string; }) => item.category_name;
  const mapCategoryValue = (item: { id: string | number; }) => Number(item.id);

  const { options: categoryOptions } = useLabeledOptions({
    fetchService: async () => {
      const res = await getAllCategorys();
      return res.data.data; // assuming categories are in res.data.data
    },
    mapLabel: mapCategoryLabel,
    mapValue: (item) => Number(mapCategoryValue(item)), // Ensure value is always string
    onError: (err) => console.error(err),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MagazineFormData>({
    resolver: zodResolver(magazineSchema(id)),
    defaultValues: {
      magazine_name: "",
      category_id: 0,
      publish_date: "",     
      image: null,
      short_description: "",
      duration: "",
      description: ""

    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  // Memoize the setter so its reference doesn't change on every render
  const setFormData = useCallback((data: any) => {
    reset({
      magazine_name: data.magazine_name,
      category_id: data.category_id,
      publish_date: data.publish_date,
      image: data.image,
      short_description: data.short_description,
      duration: data.duration,
      description: data.description
    });
    setImagePreview(data.image);
    setEditorKey((k) => k + 1);
  }, [reset]);

  // Pass a stable service function (not inline arrow)
  const fetchService = useCallback(async (id: string) => {
    const res = await getMagazineById(Number(id));
    return res.data.data;
  }, []);

  useFetchById({
    fetchService,
    setFormData,
    onError: (err) => console.error(err),
  });

  const { isUnique, error, checkUnique } = useUniqueCheck(uniqueMagazine, 800);

  const magazineName = watch("magazine_name");

  useEffect(() => {
    checkUnique(magazineName, id);
  }, [magazineName,
    id, checkUnique]);

  const onSubmit = async (data: MagazineFormData) => {
    if (isUnique === false) {
      setMessage({ type: "error", text: "Magazine name must be unique." });
      return;
    }
    setMessage(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);

        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const res = await submitMagazine(id, formData);
      const result = res.data;
      if (!res.data.success) throw new Error(result.message || "Failed to add magazine");
      setMessage({ type: "success", text: "Magazine added successfully!" });

      reset({
        magazine_name: "",
        category_id: 0,
        publish_date: "",
        image: null,
        short_description: "",
        duration: "",
        description: ""

      });
      setTimeout(() => {
        navigate.push("/magazine-list");
      }, 2000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <ComponentCard title="Add Magazine">
      <Form onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        isSubmitting={isSubmitting}
        message={message || undefined}
        formLayout="horizontal"
      >
        {/* Magazine Name */}
        <FormGroup>
          <Label>Magazine Name</Label>
          <Input placeholder="Enter magazine name" {...register("magazine_name")}
            error={!!errors.magazine_name || isUnique === false}
            unique={isUnique === true && !errors.magazine_name}
            errorMessage={
              errors.magazine_name?.message ||
              (isUnique === false ? "Magazine already exists" : undefined) ||
              (error ? "Error checking uniqueness" : undefined)

            }
            hint="e.g., The best art museums"
          />
        </FormGroup>
        <FormGroup>
          <Label>Magazine Category</Label>
          <div className="relative">
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={categoryOptions}
                  placeholder="Select an option"
                  onChange={field.onChange}
                  value={field.value}
                  className="dark:bg-dark-900"
                  error={errors.category_id}
                  errorMessage={errors.category_id?.message as string}
                />

              )}
            />

          </div>

        </FormGroup>
        <FormGroup>
          <Controller
            name="publish_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                id="publish_date"
                label="Publish date"
                placeholder="Choose publish date"
                value={field.value}
                onChange={field.onChange}
                error={errors.publish_date}

              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label>Duration</Label>
          <Input
            type="text"
            placeholder="Enter duration" {...register("duration")}
            error={!!errors.duration}
            errorMessage={
              errors.duration?.message

            }
          />

        </FormGroup>
        
        <FormGroup>
          <Label>Upload Magazine Image {
            imagePreview && <Link target="_blank" href={`http://localhost:3000/uploads/images/${imagePreview}`}>Preview Image</Link>
            }</Label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileInput
                onChange={(e) => field.onChange(e.target.files)}
                error={!!errors.image}
                errorMessage={errors.image?.message as string}
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <Label>Short Description</Label>
          <Controller
            name="short_description"
            control={control}
            render={({ field }) => (
              <TextArea
                placeholder="Enter short description"
                rows={3}
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                error={!!errors.short_description}
                errorMessage={errors.short_description?.message as string}
              />
            )}
          />
        </FormGroup>

        <FormGroup className="col-span-3">
          <Label>Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextEditorInput
                key={editorKey}
                value={field.value || ""}
                onChange={field.onChange}
                error={
                  fieldState.error?.message
                    ? { message: fieldState.error.message }
                    : undefined
                }
              />
            )}
          />
        </FormGroup>


      </Form>
    </ComponentCard>
  );
}


