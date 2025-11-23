"use client";
import ComponentCard from "@/src/components/admin/common/ComponentCard";
import Input from "@/src/components/admin/form/input/InputField";

import Label from "@/src/components/admin/form/Label";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormGroup from "@/src/components/admin/form/FormGroup";
import { UserFormData, userSchema } from "@/src/validation/admin/validation";
import {  getUserById, submitUser, uniqueUser } from "@/src/services/admin/services";
import { useFetchById } from "@/src/hooks/admin/useFetchById";
import { useParams, useRouter } from "next/navigation";
import { useUniqueCheck } from "@/src/hooks/admin/useUniqueCheck";
import { useToastMessage } from "@/src/hooks/admin/useToastMessage";

import FileInput from "@/src/components/admin/form/input/FileInput";
import TextArea from "@/src/components/admin/form/input/TextArea";
import TextEditorInput from "@/src/components/admin/form/input/TextEditor";
import Form from "@/src/components/admin/form/Form";
import Link from "next/link";
import { EyeCloseIcon, EyeIcon } from "@/src/icons/admin/index";


export default function AddUserForm() {
  const id = useParams().id as number | undefined;
  const { message, setMessage } = useToastMessage();
  const navigate = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [editorKey, setEditorKey] = useState(0);
  const [passwordToggle, setPasswordToggle] = useState(false);



  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema(id)),
    defaultValues: {
      full_name: "",
      image: null,
      short_description: "",
      description: "",
      email:"",
      password:"",
      job:"",
      city:"",

    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  // Memoize the setter so its reference doesn't change on every render
  const setFormData = useCallback((data: any) => {
    reset({
    full_name: data.full_name,
      image: data.image,
      short_description: data.short_description,
      description: data.description,
      email:data.email,
      password:data.password,
           job:data.job,
      city:data.city,
    });
    setImagePreview(data.image);
    setEditorKey((k) => k + 1);
  }, [reset]);

  // Pass a stable service function (not inline arrow)
  const fetchService = useCallback(async (id: string) => {
    const res = await getUserById(Number(id));
    return res.data.data;
  }, []);

  useFetchById({
    fetchService,
    setFormData,
    onError: (err) => console.error(err),
  });

  const { isUnique, error, checkUnique } = useUniqueCheck(uniqueUser, 800);

  const full_name = watch("full_name");

  useEffect(() => {
    checkUnique(full_name, id );
  }, [full_name,
    id, checkUnique]);

  const onSubmit = async (data: UserFormData) => {
    if (isUnique === false) {
      setMessage({ type: "error", text: "User name must be unique." });
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

      const res = await submitUser(id, formData);
      const result = res.data;
      if (!res.data.success) throw new Error(result.message || "Failed to add magazine");
      setMessage({ type: "success", text: "User added successfully!" });

      reset({
      full_name: "",
      image: null,
      short_description: "",
      description: "",
      email:"",
      password:"",
           job:"",
      city:"",

      });
      setTimeout(() => {
        navigate.push("/admin/user-list");
      }, 2000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <ComponentCard title="Add User">
      <Form onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        isSubmitting={isSubmitting}
        message={message || undefined}
        formLayout="horizontal"
      >
        {/* User Name */}
        <FormGroup>
          <Label>Full Name</Label>
          <Input placeholder="Enter full name" {...register("full_name")}
            error={!!errors.full_name || isUnique === false}
            unique={isUnique === true && !errors.full_name}
            errorMessage={
              errors.full_name?.message ||
              (isUnique === false ? "User already exists" : undefined) ||
              (error ? "Error checking uniqueness" : undefined)

            }
            hint="e.g., The best art museums"
          />
        </FormGroup>

        <FormGroup>
            <Label>Email</Label>
             <Input placeholder="Enter email" {...register("email")}
            error={!!errors.email }
            errorMessage={
              errors.email?.message
            }
          />
        </FormGroup>

        <FormGroup>
            <Label>Job</Label>
            <Input placeholder="Enter Job" {...register("job")}
               error={!!errors.job }
            errorMessage={
              errors.job?.message
            }
            />
        </FormGroup>
           <FormGroup>
            <Label>City</Label>
            <Input placeholder="Enter City" {...register("city")}
               error={!!errors.city }
            errorMessage={
              errors.city?.message
            }
            />
        </FormGroup>

            <FormGroup className="relative">
            <Label>Password</Label>
             <Input type= {
                passwordToggle ? 'text' : 'password'
                } 
                placeholder="Enter password" {...register("password")}
                error={!!errors.password }
                errorMessage={
                errors.password?.message
                }
    
          />

            <button
                type="button"
                onClick={() => setPasswordToggle(!passwordToggle)}
                className="absolute right-3 top-[3rem] -translate-y-1/2 p-1 focus:outline-none"
                aria-label={
                  passwordToggle ? "Hide password" : "Show password"
                }>
                {passwordToggle ? (
                  <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
        </FormGroup>

            

        <FormGroup>
          <Label>Upload User Image {
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
        <FormGroup className="col-span-3">
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


