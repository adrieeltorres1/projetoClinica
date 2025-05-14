import { notification } from "antd";
import { createContext } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification({
        placement: "bottomRight",
        showProgress: true,
    });
    return (
        <NotificationContext.Provider value={{ api }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;