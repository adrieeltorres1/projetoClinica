import { Navigate, useNavigate } from "react-router";
import { API } from "../services";

const SafePath = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    API.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status == 401) {
            sessionStorage.clear();
            navigate("/");
        }
        return Promise.reject(error);
    });

    return token ? children : <Navigate to="/" />;
}

export default SafePath;