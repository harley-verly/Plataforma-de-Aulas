import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { GuestRoute, ProtectedRoute } from "@/components/platform/ProtectedRoute";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AffiliatePage from "@/pages/Affiliate";
import CheckoutPage from "@/pages/Checkout";
import CourseDetail from "@/pages/CourseDetail";
import CoursesPage from "@/pages/Courses";
import Index from "@/pages/Index";
import LearningCoursePage from "@/pages/LearningCourse";
import LearningPage from "@/pages/Learning";
import LoginPage from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import StudioPage from "@/pages/Studio";
import AdminDashboard from "@/pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<CoursesPage />} />
          <Route path="/catalog/:slug" element={<CourseDetail />} />
          <Route path="/checkout/:offerId" element={<CheckoutPage />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/learning"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support", "student"]}>
                <LearningPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning/:slug"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support", "student"]}>
                <LearningCoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studio"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "producer"]}>
                <StudioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/affiliate"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "affiliate"]}>
                <AffiliatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/cursos" element={<Navigate replace to="/catalog" />} />
          <Route path="/cursos/:slug" element={<Navigate replace to="/catalog" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
