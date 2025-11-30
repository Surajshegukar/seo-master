"use client";
import ComponentCard from "@/src/components/admin/common/ComponentCard";
import Input from "@/src/components/admin/form/input/InputField";
import Label from "@/src/components/admin/form/Label";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormGroup from "@/src/components/admin/form/FormGroup";
import { PodcastFormData, podcastSchema } from "@/src/validation/admin/validation";
import {  getPodcastById, submitPodcast, uniquePodcast } from "@/src/services/admin/services";
import { useFetchById } from "@/src/hooks/admin/useFetchById";
import { useParams, useRouter } from "next/navigation";
import { useUniqueCheck } from "@/src/hooks/admin/useUniqueCheck";
import { useToastMessage } from "@/src/hooks/admin/useToastMessage";
import dynamic from "next/dynamic";
import FileInput from "@/src/components/admin/form/input/FileInput";
import TextEditorInput from "@/src/components/admin/form/input/TextEditor";
import Form from "@/src/components/admin/form/Form";
import Link from "next/link";

const DatePicker = dynamic(() => import('@/src/components/admin/form/date-picker'), { ssr: false });


export default function AddPodcastForm() {
  const id = useParams().id as number | undefined;
  const { message, setMessage } = useToastMessage();
  const navigate = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [editorKey, setEditorKey] = useState(0);


  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PodcastFormData>({
    resolver: zodResolver(podcastSchema(id)),
    defaultValues: {
      podcast_name: "",
      publish_date: "",     
      image: null,
      duration: "",
      description: ""

    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  // Memoize the setter so its reference doesn't change on every render
  const setFormData = useCallback((data: any) => {
    reset({
      podcast_name: data.podcast_name,
      publish_date: data.publish_date,
      image: data.image,
      duration: data.duration,
      description: data.description
    });
    setImagePreview(data.image);
    setEditorKey((k) => k + 1);
  }, [reset]);

  // Pass a stable service function (not inline arrow)
  const fetchService = useCallback(async (id: string) => {
    const res = await getPodcastById(Number(id));
    return res.data.data;
  }, []);

  useFetchById({
    fetchService,
    setFormData,
    onError: (err) => console.error(err),
  });

  const { isUnique, error, checkUnique } = useUniqueCheck(uniquePodcast, 800);

  const podcastName = watch("podcast_name");

  useEffect(() => {
    checkUnique(podcastName, id);
  }, [podcastName,
    id, checkUnique]);

  const onSubmit = async (data: PodcastFormData) => {
    if (isUnique === false) {
      setMessage({ type: "error", text: "Podcast name must be unique." });
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

      const res = await submitPodcast(id, formData);
      const result = res.data;
      if (!res.data.success) throw new Error(result.message || "Failed to add podcast");
      setMessage({ type: "success", text: "Podcast added successfully!" });

      reset({
        podcast_name: "",
        publish_date: "",
        image: null,
        duration: "",
        description: ""

      });
      setTimeout(() => {
        navigate.push("/podcast-list");
      }, 2000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <ComponentCard title="Add Podcast">
      <Form onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        isSubmitting={isSubmitting}
        message={message || undefined}
        formLayout="horizontal"
      >
        {/* Podcast Name */}
        <FormGroup>
          <Label>Podcast Name</Label>
          <Input placeholder="Enter podcast name" {...register("podcast_name")}
            error={!!errors.podcast_name || isUnique === false}
            unique={isUnique === true && !errors.podcast_name}
            errorMessage={
              errors.podcast_name?.message ||
              (isUnique === false ? "Podcast already exists" : undefined) ||
              (error ? "Error checking uniqueness" : undefined)

            }
            hint="e.g., The best art museums"
          />
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
          <Label>Upload Podcast Image {
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


