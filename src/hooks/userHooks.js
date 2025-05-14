import { useMutation } from "@tanstack/react-query"
import { API } from "../services";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data) => {
            const request = await API.post("/usuarios/login", data);
            return request.data;
        }
    })
}