import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";
import HomeTemplate from "./Templates/HomeTemplate";
import ProtectedRoute from "Routes/ProtectedRoute";
import GlobalStyles from "./GlobalStyles";
const HomePage = lazy(() => import("Pages/HomePage/HomePage"));
const Login = lazy(() => import("Pages/Login/Login"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="" element={<HomeTemplate />}>
              <Route
                path="quan-ly"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to={""} />} />
            </Route>
          </Routes>
          <GlobalStyles />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}
export default App;
