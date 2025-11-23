
import { ApiResponse, Department ,Category , Magazine , Podcast, User } from "@/src/types/admin/types";
import instance from "@/src/utils/axiosInstance";
import { AxiosResponse } from "axios";
import { number } from "zod";

type ModelName = string | number;
type ItemId = string | number;

export const deleteItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.delete(`/api2/delete/${model}/${id}`);
};

export const activateItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.put(`/api2/active/${model}/${id}`);
};

export const deactivateItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.put(`/api2/inactive/${model}/${id}`);
};

export const signInUser = (data: { email: string; password: string; rememberMe?: boolean }): Promise<AxiosResponse> => {
  return instance.post("/api2/auth/login", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};



export const getAllDepartments = (): Promise<
  AxiosResponse<ApiResponse<Department[]>>
> => instance.get("/api2/department/department-list");

export const addDepartment = (data: { department_name: string }): Promise<AxiosResponse> => {
  return instance.post("/api2/department/add-department", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getDepartmentById = (id: number): Promise<AxiosResponse<ApiResponse<Department>>> => {
  return instance.get(`/api2/department/get-department/${id}`); }


  export const submitDepartment = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api2/department/add-department/${id}`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
    }
    return instance.post("/api2/department/add-department", data,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  export const  uniqueDepartment = (department_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api2/department/check-unique/`, {
      params: { department_name, currentId },
    });
  };


  
export const getAllCategorys = (): Promise<
  AxiosResponse<ApiResponse<Category[]>>
> => instance.get("/api2/category/category-list");

export const addCategory = (data: { category_name: string }): Promise<AxiosResponse> => {
  return instance.post("/api2/category/add-category", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCategoryById = (id: number): Promise<AxiosResponse<ApiResponse<Category>>> => {
  return instance.get(`/api2/category/get-category/${id}`); }


  export const submitCategory = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api2/category/add-category/${id}`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
    }
    return instance.post("/api2/category/add-category", data,{
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
    return instance.get(`/api2/category/check-unique/`, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };




  
export const getAllMagazines = (): Promise<
  AxiosResponse<ApiResponse<Magazine[]>>
> => instance.get("/api2/magazine/magazine-list");

export const addMagazine = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/api2/magazine/add-magazine", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMagazineById = (id: number): Promise<AxiosResponse<ApiResponse<Magazine>>> => {
  return instance.get(`/api2/magazine/get-magazine/${id}`); }


  export const submitMagazine = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api2/magazine/add-magazine/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/api2/magazine/add-magazine", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniqueMagazine = (magazine_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api2/magazine/check-unique/`, {
      params: { magazine_name, currentId },
    });
  };


  
  
export const getAllPodcasts = (): Promise<
  AxiosResponse<ApiResponse<Podcast[]>>
> => instance.get("/api2/podcast/podcast-list");

export const addPodcast = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/api2/podcast/add-podcast", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPodcastById = (id: number): Promise<AxiosResponse<ApiResponse<Podcast>>> => {
  return instance.get(`/api2/podcast/get-podcast/${id}`); }


  export const submitPodcast = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api2/podcast/add-podcast/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/api2/podcast/add-podcast", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniquePodcast = (podcast_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api2/podcast/check-unique/`, {
      params: { podcast_name, currentId },
    });
  };



  
export const getAllUsers = (): Promise<
  AxiosResponse<ApiResponse<User[]>>
> => instance.get("/api2/user/user-list");

export const addUser = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/api2/user/add-user", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserById = (id: number): Promise<AxiosResponse<ApiResponse<User>>> => {
  return instance.get(`/api2/user/get-user/${id}`); }


  export const submitUser = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api2/user/add-user/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/api2/user/add-user", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniqueUser = (full_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api2/user/check-unique/`, {
      params: { full_name, currentId },
    });
  };

  export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const response = await instance.get<ApiResponse<User>>(`/api2/user/get-by-email`, {
        params: { email },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  };
  