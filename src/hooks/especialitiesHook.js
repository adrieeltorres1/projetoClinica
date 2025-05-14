import { useQuery } from "@tanstack/react-query"
import { API } from "../services";

export const useGetEspecialities = () => {
    return useQuery({
        queryKey: ["especialidades"],
        queryFn: async () => {
            const request = await API.get("/especialidades");
            return request.data;
        }
    })
}