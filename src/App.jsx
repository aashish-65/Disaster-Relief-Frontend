import { useState } from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PageContainer from "./components/layout/PageContainer";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import LocationPicker from "./components/maps/LocationPicker";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Placeholder components - these will be replaced with actual components later
const HomePage = () => (
  // <PageContainer>
  //   <div className="container mx-auto py-8">
  //     <h1 className="text-3xl font-bold mb-4">Home Page</h1>
  //     <p>Welcome to the DisasterRelief crowdmapping platform.</p>
  //   </div>
  // </PageContainer>
  <Home />
);
const LoginPage = () => (
  <Login />
);
const RegisterPage = () => (
  <Register />
);
const DashboardPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
  </DashboardLayout>
);
const IncidentsPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Incidents</h1>
  </DashboardLayout>
);
const ResourcesPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Resources</h1>
  </DashboardLayout>
);
const NotFoundPage = () => (
  <PageContainer>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  </PageContainer>
);
const UnauthorizedPage = () => (
  <PageContainer>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  </PageContainer>
);

// User dashboard pages
const UserReportsPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">My Reports</h1>
  </DashboardLayout>
);
const UserRequestsPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">My Requests</h1>
  </DashboardLayout>
);

// Volunteer dashboard pages
const NearbyIncidentsPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Nearby Incidents</h1>
  </DashboardLayout>
);
const VolunteerResponsesPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">My Responses</h1>
  </DashboardLayout>
);

// NGO dashboard pages
const AddResourcePage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Add Resources</h1>
  </DashboardLayout>
);
const ManageRequestsPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Manage Requests</h1>
  </DashboardLayout>
);
const NgoImpactPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Impact</h1>
  </DashboardLayout>
);

// Admin dashboard pages
const AdminUsersPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Users Management</h1>
  </DashboardLayout>
);
const AdminAnalyticsPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Analytics</h1>
  </DashboardLayout>
);
const AdminSettingsPage = () => (
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-4">Settings</h1>
  </DashboardLayout>
);
function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <PageContainer> */}
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />

          {/* Protected routes - accessible by any authenticated user */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/resources" element={<ResourcesPage />} /> */}
          </Route>

          {/* User-specific routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/user/reports" element={<UserReportsPage />} />
            <Route path="/user/requests" element={<UserRequestsPage />} />
          </Route>

          {/* Volunteer-specific routes */}
          <Route element={<ProtectedRoute allowedRoles={["volunteer"]} />}>
            <Route path="/incidents/nearby" element={<NearbyIncidentsPage />} />
            <Route
              path="/volunteer/responses"
              element={<VolunteerResponsesPage />}
            />
          </Route>

          {/* NGO-specific routes */}
          <Route element={<ProtectedRoute allowedRoles={["ngo"]} />}>
            <Route path="/resources/add" element={<AddResourcePage />} />
            <Route
              path="/resources/requests"
              element={<ManageRequestsPage />}
            />
            <Route path="/ngo/impact" element={<NgoImpactPage />} />
          </Route>

          {/* Admin-specific routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* </PageContainer> */}
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
