import axios from "axios"
import { apiRoutes } from "@/shared/lib/api/apiRoutes";
import { TNftItemUri } from "@/features/mint-nft/types";

const api = axios.create();
const uriUrl = "https://api.jsonbin.io/v3/b"
api.defaults.headers.common["Content-Type"] = "application/json"
api.defaults.headers.common["X-Master-Key"] = "$2a$10$/8wt9SlXHsMkQHUe.gGCD.Nh4p2QN8UCCu8UAFXCDAhXRLJSSf0RK"
api.defaults.headers.common["X-Bin-Private"] = "false"
api.defaults.headers.common["X-Bin-Private"] = "false"
api.defaults.headers.common["X-Collection-Id"] = "66fcc52dacd3cb34a88fbf53"
type TUriApiResponse = {
    record: object,
    metadata: {
        id: string,
        createdAt: string,
        private: boolean,
    }
}

export class UriService {

    private handleError(error: any, action: string): void {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`${action} failed:`, error.response.data);
        } else {
            console.error(`${action} failed:`, error.message ? error.message : error);
        }
    }

    public uploadUri = async (uriData: TNftItemUri) => {

        try {
            const response = await api.post<TUriApiResponse>(apiRoutes.nftItemApi.baseRoute, uriData, {
                headers: {
                    "X-Bin-Name": uriData.name
                }
            })
            const uriId = response.data.metadata.id
            return `${uriUrl}/${uriId}`
        } catch (error: unknown) {
            this.handleError(error, 'Uri upload');
            return null;
        }
    }


}

export const uriApi = new UriService();