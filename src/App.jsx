// src/App.jsx
import React, { useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RequirePermission from "./components/common/RequirePermission";
import RequireAuth from "./components/common/RequireAuth";
import AppLayout from "./components/common/AppLayout";
import Layout from "./layout/Layout";

import ProductDetails from "./pages/Product/ProductDetails";
import Career from "./pages/Career/Career";
import ApplyDialog from "./components/ui/ApplyDialog";
import SpiritualContentPage from "./pages/SpiritualContent/SpiritualContentPage";
import News from "./pages/News/News";
import NewsImages from "./pages/News/NewsImages";
import NewsVideos from "./pages/News/NewsVideos";
import NewsLinks from "./pages/News/NewsLinks";

import { restoreSession } from "./store/auth/authSlice";
import ApplyRequest from "./pages/ApplyRequest/ApplyRequest";
import ReviewsPage from "./pages/Reviews/Reviews";
import WhatsAppFloat from "./components/ui/WhatsAppFloat";
import Privacy from "./pages/Policy/Privacy";
import TermsService from "./pages/Policy/TermsService";
import CookiePolicy from "./pages/Policy/CookiePolicy";



import OurClients from "./pages/Clients/OurClients";
import CareerPage from "./pages/Career/CareerPage";
import AboutPeeth from "./pages/About/AboutPeeth";
import AboutSwami from "./pages/About/AboutSwami";
import Establishment from "./pages/About/Establishment";
import Volunteers from "./pages/About/Volunteers";
import Mission from "./pages/About/Mission";
import PhotoGallery from "./pages/Gallery copy/PhotoGallery";
import VideoGallery from "./pages/Gallery copy/VideoGallery";
import Mediagallery from "./pages/Gallery copy/Mediagallery";
import Member from "./pages/Member/Member";
import Events from "./pages/Events/Events";


// ================= Lazy Loaded Pages =================
const CompanySettingsPage = React.lazy(() => import("./pages/CompanySettings/CompanySettings"));
const CompaniesPage = React.lazy(() => import("./pages/Companies/Companies"));
const CompanyDetailPage = React.lazy(() => import("./pages/Companies/CompanyDetail"));
const HomePage = React.lazy(() => import("./pages/Home/Home"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Departments = React.lazy(() => import("./pages/Departments/Departments"));
const Roles = React.lazy(() => import("./pages/RolesAndPermissions/Roles"));
const AdminsPage = React.lazy(() => import("./pages/Admins/Admins"));
const VariablesPage = React.lazy(() => import("./pages/Variables/Variables"));
const LeadsPage = React.lazy(() => import('./pages/Leads/Leads'));
const ServicesPage = React.lazy(() => import('./pages/Services/Services'));
const ProjectsPage = React.lazy(() => import('./pages/Projects/Projects'));
const TechnologiesPage = React.lazy(() => import('./pages/Technologies/Technologies'));
const TeamsPage = React.lazy(() => import('./pages/Teams/Teams'));
const ProductsPage = React.lazy(() => import('./pages/Products/Products'));

// ================= Loading Spinner =================
function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
    </div>
  );
}

// ================= App Component =================
export default function App() {
  const dispatch = useDispatch();
  const { loading, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  // Wait until auth state is restored
  if (loading && !initialized) {   
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* ================= LOGIN WITHOUT LAYOUT ================= */}
        <Route path="login" element={<LoginPage />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<Layout type="public" />}>
          <Route index element={<HomePage />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="/Privacy" element={<Privacy  />} />
          <Route path="/terms" element={<TermsService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/establishment" element={<Establishment />} />
          <Route path="/about-peeth" element={<AboutPeeth/>} />
          <Route path="/about-swami" element={<AboutSwami/>} />
          <Route path="/volunteers" element={<Volunteers/>} />
          <Route path="/photo-gallery" element={<PhotoGallery/>} />
          <Route path="/video-gallery" element={<VideoGallery/>}/>
          <Route path="/media-gallery" element={<Mediagallery/>}/>
          <Route path="/membership" element={<Member/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/news-images" element={<NewsImages/>}/>
          <Route path="/news-videos" element={<NewsVideos/>}/>
          <Route path="/news-links" element={<NewsLinks/>}/>
          <Route path="/mission" element={<Mission/>}/>
          <Route path="/spiritual/:type/:id" element={<SpiritualContentPage/>}/>
        </Route>

        {/* ================= PROTECTED ROUTES ================= */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route
            path="dashboard/departments"
            element={
              <RequirePermission permission="department.read">
                <Departments />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/apply-request"
            element={
              <RequirePermission permission="department.read">
                <ApplyRequest />
              </RequirePermission>
            }
          />

         
         


          <Route
            path="companies"
            element={
              <RequirePermission permission="company.read">
                <CompaniesPage />
              </RequirePermission>
            }
          />

          
          <Route
            path="/dashboard/our-clients"
            element={
              <RequirePermission permission="our_client.read">
                <OurClients/>
              </RequirePermission>
            }
          />

          <Route
            path="companies/:companyId"
            element={
              <RequirePermission permission="company.read">
                <CompanyDetailPage />
              </RequirePermission>
            }
          />

          <Route
            path="admins"
            element={
              <RequirePermission permission="user.read">
                <AdminsPage />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/roles"
            element={
              <RequirePermission permission="role.read">
                <Roles />
              </RequirePermission>
            }
          />

           <Route
            path="dashboard/career"
            element={
              <RequirePermission permission="career.read">
                <CareerPage/>
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/variables"
            element={
              <RequirePermission permission="variables.read">
                <VariablesPage />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/leads"
            element={
              <RequirePermission permission="">
                <LeadsPage />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/reviews"
            element={
              <RequirePermission permission="review.read">
                <ReviewsPage />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/services"
            element={
              <RequirePermission permission="service.read">
                <ServicesPage />
              </RequirePermission>
            }
          />

       

          <Route
            path="dashboard/projects"
            element={
              <RequirePermission permission="project.read">
                <ProjectsPage />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/technologies"
            element={
              <RequirePermission permission="technology.read">
                <TechnologiesPage />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/teams"
            element={
              <RequirePermission permission="team.read">
                <TeamsPage />
              </RequirePermission>
            }
          />

          <Route
            path="dashboard/products"
            element={
              <RequirePermission permission="product.read">
                <ProductsPage />
              </RequirePermission>
            }
          />

          <Route
            path="company-settings"
            element={
              <RequirePermission permission="companySettings.read">
                <CompanySettingsPage />
              </RequirePermission>
            }
          />
        </Route>

        {/* ================= 404 ROUTE ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
    </Suspense>
  );
}
