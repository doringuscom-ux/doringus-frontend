import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/influencer" element={<InfluencerList />} />
          <Route path="/influencer/:category/:influencerName" element={<InfluencerDetail />} />
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
              <Route path="brands" element={<CategoryManagement />} />
              <Route path="influencers" element={<InfluencerManagement />} />
              <Route path="inquiries" element={<InquiryManagement />} />
              <Route path="videos" element={<VideosManagement />} />
              <Route path="settings" element={<Settings />} />
              {/* Add more admin routes here */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
