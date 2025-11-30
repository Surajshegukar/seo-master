
import { ApiResponse, Department ,Category , Magazine , Podcast, User } from "@/src/types/admin/types";
import instance from "@/src/utils/axiosInstance";
import { AxiosResponse } from "axios";
import { number } from "zod";

type ModelName = string | number;
type ItemId = string | number;

export const deleteItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.delete(`/delete/${model}/${id}`);
};

export const activateItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.put(`/active/${model}/${id}`);
};

export const deactivateItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.put(`/inactive/${model}/${id}`);
};

export const signInUser = (data: { email: string; password: string; rememberMe?: boolean }): Promise<AxiosResponse> => {
  return instance.post("/auth/login", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};



export const getAllDepartments = (): Promise<
  AxiosResponse<ApiResponse<Department[]>>
> => instance.get("/department/department-list");

export const addDepartment = (data: { department_name: string }): Promise<AxiosResponse> => {
  return instance.post("/department/add-department", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getDepartmentById = (id: number): Promise<AxiosResponse<ApiResponse<Department>>> => {
  return instance.get(`/department/get-department/${id}`); }


  export const submitDepartment = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/department/add-department/${id}`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
    }
    return instance.post("/department/add-department", data,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  export const  uniqueDepartment = (department_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/department/check-unique/`, {
      params: { department_name, currentId },
    });
  };


  
export const getAllCategorys = (): Promise<
  AxiosResponse<ApiResponse<Category[]>>
> => instance.get("/category/category-list");

export const addCategory = (data: { category_name: string }): Promise<AxiosResponse> => {
  return instance.post("/category/add-category", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCategoryById = (id: number): Promise<AxiosResponse<ApiResponse<Category>>> => {
  return instance.get(`/category/get-category/${id}`); }


  export const submitCategory = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/category/add-category/${id}`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
    }
    return instance.post("/category/add-category", data,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  export const  uniqueCategory = (category_name: string, currentId?: number): Promise<AxiosResponse> => {
    const params = { category_name };
    if (currentId !== undefined) {
      (params as any).currentId = Number(currentId);
    }
    return instance.get(`/category/check-unique/`, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };




  
export const getAllMagazines = (): Promise<
  AxiosResponse<ApiResponse<Magazine[]>>
> => instance.get("/magazine/magazine-list");

export const addMagazine = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/magazine/add-magazine", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMagazineById = (id: number): Promise<AxiosResponse<ApiResponse<Magazine>>> => {
  return instance.get(`/magazine/get-magazine/${id}`); }


  export const submitMagazine = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/magazine/add-magazine/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/magazine/add-magazine", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniqueMagazine = (magazine_name: string, currentId?: number): Promise<AxiosResponse> => {
     const params = { magazine_name };
    if (currentId !== undefined) {
      (params as any).currentId = Number(currentId);
    }
    return instance.get(`/magazine/check-unique/`, 
      {
        params,
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  };


  
  
export const getAllPodcasts = (): Promise<
  AxiosResponse<ApiResponse<Podcast[]>>
> => instance.get("/podcast/podcast-list");

export const addPodcast = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/podcast/add-podcast", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPodcastById = (id: number): Promise<AxiosResponse<ApiResponse<Podcast>>> => {
  return instance.get(`/podcast/get-podcast/${id}`); }


  export const submitPodcast = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/podcast/add-podcast/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/podcast/add-podcast", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniquePodcast = (podcast_name: string, currentId?: number): Promise<AxiosResponse> => {
     const params = { podcast_name };
    if (currentId !== undefined) {
      (params as any).currentId = Number(currentId);
    }
    return instance.get(`/podcast/check-unique/`, {
      params,
       headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };


