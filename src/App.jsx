import { useMemo, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RouterRender from "./routes/routerRender";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./components/Loader/Loader";
import { io } from "socket.io-client";
import { URL } from "./config";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchInterval: 30_000,
    },
  },
});


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterRender />
              </ThemeProvider>
            </LocalizationProvider>
          </Suspense>
        </ErrorBoundary>
        <ToastContainer  position="bottom-right" />
      </QueryClientProvider>

    </div>
  );
}

export default App;
