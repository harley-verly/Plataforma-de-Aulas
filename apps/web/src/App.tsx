import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Institutional from "./pages/Institutional.tsx";
import Events from "./pages/Events.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import Courses from "./pages/Courses.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";
import Community from "./pages/Community.tsx";
import BusinessDetail from "./pages/BusinessDetail.tsx";
import BusinessRegister from "./pages/BusinessRegister.tsx";
import CommercialPresentation from "./pages/CommercialPresentation.tsx";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminEvents from "./pages/admin/AdminEvents.tsx";
import AdminCourses from "./pages/admin/AdminCourses.tsx";
import AdminCommunity from "./pages/admin/AdminCommunity.tsx";
import AdminPages from "./pages/admin/AdminPages.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";
import NotFound from "./pages/NotFound.tsx";
import { canAccessAdmin, readDemoSession } from "./lib/auth-session.ts";

const queryClient = new QueryClient();

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const session = readDemoSession();

  if (!canAccessAdmin(session)) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

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
          <Route path="/comunidade" element={<Community />} />
          <Route path="/comunidade/cadastrar" element={<BusinessRegister />} />
          <Route path="/comunidade/:slug" element={<BusinessDetail />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/apresentacao-comercial" element={<CommercialPresentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path="/admin/eventos" element={<RequireAdmin><AdminEvents /></RequireAdmin>} />
          <Route path="/admin/cursos" element={<RequireAdmin><AdminCourses /></RequireAdmin>} />
          <Route path="/admin/comunidade" element={<RequireAdmin><AdminCommunity /></RequireAdmin>} />
          <Route path="/admin/paginas" element={<RequireAdmin><AdminPages /></RequireAdmin>} />
          <Route path="/admin/midia" element={<RequireAdmin><AdminMedia /></RequireAdmin>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
