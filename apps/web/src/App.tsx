import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GuestRoute, ProtectedRoute } from "@/components/platform/ProtectedRoute";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AffiliatePage from "./pages/Affiliate.tsx";
import CheckoutPage from "./pages/Checkout.tsx";
import Index from "./pages/Index.tsx";
import Institutional from "./pages/Institutional.tsx";
import Events from "./pages/Events.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import Courses from "./pages/Courses.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";
import Community from "./pages/Community.tsx";
import BusinessDetail from "./pages/BusinessDetail.tsx";
import BusinessRegister from "./pages/BusinessRegister.tsx";
import Contact from "./pages/Contact.tsx";
import LearningPage from "./pages/Learning.tsx";
import LearningCoursePage from "./pages/LearningCourse.tsx";
import LoginPage from "./pages/Login.tsx";
import StudioPage from "./pages/Studio.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminEvents from "./pages/admin/AdminEvents.tsx";
import AdminCourses from "./pages/admin/AdminCourses.tsx";
import AdminCommunity from "./pages/admin/AdminCommunity.tsx";
import AdminPages from "./pages/admin/AdminPages.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/institucional" element={<Institutional />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/eventos/:slug" element={<EventDetail />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/cursos/:slug" element={<CourseDetail />} />
          <Route path="/catalog" element={<Navigate replace to="/cursos" />} />
          <Route path="/catalog/:slug" element={<CourseDetail />} />
          <Route path="/comunidade" element={<Community />} />
          <Route path="/comunidade/cadastrar" element={<BusinessRegister />} />
          <Route path="/comunidade/:slug" element={<BusinessDetail />} />
          <Route path="/contato" element={<Contact />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route path="/checkout/:offerId" element={<CheckoutPage />} />
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
          <Route
            path="/admin/eventos"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support"]}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cursos"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support"]}>
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/comunidade"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support"]}>
                <AdminCommunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/paginas"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support"]}>
                <AdminPages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/midia"
            element={
              <ProtectedRoute allowedRoles={["super_admin", "platform_admin", "support"]}>
                <AdminMedia />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
