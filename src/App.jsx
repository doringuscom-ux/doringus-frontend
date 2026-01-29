import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CampaignManagement from './pages/admin/CampaignManagement';
import Settings from './pages/admin/Settings';
import CategoryManagement from './pages/admin/CategoryManagement';
import InfluencerManagement from './pages/admin/InfluencerManagement';
import InquiryManagement from './pages/admin/InquiryManagement';
import VideosManagement from './pages/admin/VideosManagement';
import AdminLogin from './pages/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AdminProvider } from './context/AdminContext';

import InfluencerList from './pages/InfluencerList';
import InfluencerDetail from './pages/InfluencerDetail';
import Register from './pages/Register';
import InfluencerRegister from './pages/InfluencerRegister';
import InfluencerDashboard from './pages/InfluencerDashboard';
import InfluencerLogin from './pages/InfluencerLogin';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AdminProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Influencer Marketplace Flow */}
        <Route path="/influencers" element={<InfluencerList />} />
        <Route path="/influencers/:category" element={<InfluencerList />} />
        <Route path="/influencers/:category/:location" element={<InfluencerList />} />

        {/* Individual Influencer Profile */}
        <Route path="/influencer/:influencerName" element={<InfluencerDetail />} />
        {/* Support old URLs if any for SEO continuity */}
        <Route path="/influencers/:category/:influencerName" element={<InfluencerDetail />} />

        {/* Auth Routes */}
        <Route path="/login" element={<InfluencerLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/influencer" element={<InfluencerRegister />} />
        <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="brands" element={<CategoryManagement />} />
            <Route path="influencers" element={<InfluencerManagement />} />
            <Route path="inquiries" element={<InquiryManagement />} />
            <Route path="videos" element={<VideosManagement />} />
            <Route path="settings" element={<Settings />} />
            {/* Add more admin routes here */}
          </Route>
        </Route>

        {/* 404 Catch-All Route */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminProvider>
  );
}

export default App;
