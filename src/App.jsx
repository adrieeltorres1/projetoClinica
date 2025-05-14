import { QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "./contexts/NotificationContext";
import Paths from "./routes/Paths";
import { queryClient } from "./services";

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Paths />
        </NotificationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;