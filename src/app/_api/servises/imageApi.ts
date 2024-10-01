import axios, { AxiosRequestConfig } from "axios"
import { apiRoutes } from "@/shared/lib/api/apiRoutes";

const api = axios.create();

api.defaults.headers["common"]["Content-Type"] = "multipart/form-data"

type TImageApiResponse = {
    success: boolean,
    status: number,
    data: {
        name: string,
        url: string,
        view_url: string,
        created_at: Date
    }
}

export class ImageService {

    private handleError(error: any, action: string): void {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`${action} failed:`, error.response.data);
        } else {
            console.error(`${action} failed:`, error.message ? error.message : error);
        }
    }

    public uploadImage = async (formData: FormData, config?: AxiosRequestConfig<any>) => {

        try {
            const response = await axios.post<TImageApiResponse>(apiRoutes.imageApi.baseRoute, formData, {
                ...config,
                params: {
                    api_key: "LwUdjcSsfIexgLfhA5VNOENNqev2jT5p"
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            return response.data
        } catch (error: unknown) {
            this.handleError(error, 'Image upload');
            return null;
        }
    }


}

export const imageApi = new ImageService();