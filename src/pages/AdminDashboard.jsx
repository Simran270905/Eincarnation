import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Star, 
  Briefcase,
  Calendar,
  MapPin,
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  Info,
  Mail,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import HeroStatsManager from '../components/admin/HeroStatsManager';
import ContactFormsManager from '../components/admin/ContactFormsManager';
import ClientsManager from '../components/admin/ClientsManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import ServicesManager from '../components/admin/ServicesManager';
import EventsManager from '../components/admin/EventsManager';
import FooterManager from '../components/admin/FooterManager';
import ServicesPageManager from '../components/admin/ServicesPageManager';
import RecyclingProcessManager from '../components/admin/RecyclingProcessManager';
import EPRPageManagerNew from '../components/admin/EPRPageManagerNew';
import AboutPageManager from '../components/admin/AboutPageManager';
import CoreTeamManager from '../components/admin/CoreTeamManager';
import CertificationsManager from '../components/admin/CertificationsManager';
import ContactFormRequests from '../components/admin/ContactFormRequests';
import ContactPageSettings from '../components/admin/ContactPageSettings';
import WhatsAppSettingsManager from '../components/admin/WhatsAppSettingsManager';
import SocialMediaManager from '../components/admin/SocialMediaManager';
import AdminSettings from '../components/admin/AdminSettings';
import ConnectionStatus from '../components/ConnectionStatus';
import SEO from '../components/SEO';
import { useNotifications } from '../hooks/useNotifications';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [adminData, setAdminData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState(['home']);
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const data = localStorage.getItem('adminData');
    
    if (!token || !data) {
      navigate('/adminlogin');
      return;
    }
    
    setAdminData(JSON.parse(data));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/adminlogin');
  };

  const menuStructure = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      children: [
        { id: 'hero', label: 'Hero Section', icon: TrendingUp },
        { id: 'services-home', label: 'Services (Home)', icon: Briefcase },
        { id: 'testimonials', label: 'Testimonials', icon: Star },
        { id: 'clients', label: 'Clients', icon: Users },
      ]
    },
    {
      id: 'services-page',
      label: 'Services Page',
      icon: Briefcase,
      children: [
        { id: 'services-page-content', label: 'Page Content', icon: FileText },
        { id: 'services-page-process', label: 'Recycling Process', icon: Briefcase },
      ]
    },
    {
      id: 'events',
      label: 'Events Page',
      icon: Calendar,
      children: [
        { id: 'events-list', label: 'Event Listings', icon: Calendar },
      ]
    },
    {
      id: 'epr',
      label: 'EPR Page',
      icon: FileText,
      children: [
        { id: 'epr-content', label: 'Page Content', icon: FileText },
      ]
    },
    {
      id: 'about',
      label: 'About Us Page',
      icon: Info,
      children: [
        { id: 'about-content', label: 'Page Content', icon: Info },
        { id: 'about-team', label: 'Core Team & Landscape', icon: Users },
        { id: 'about-certifications', label: 'Certifications', icon: Star },
      ]
    },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: Mail,
      children: [
        { id: 'contact-page-settings', label: 'Page Settings', icon: MapPin },
        { id: 'contact-form-requests', label: 'Form Requests', icon: MessageSquare, badge: unreadCount.total },
      ]
    },
    {
      id: 'footer',
      label: 'Footer',
      icon: MapPin,
      children: [
        { id: 'footer-content', label: 'Contact Details', icon: MapPin },
      ]
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageSquare,
      children: [
        { id: 'whatsapp-settings', label: 'WhatsApp Settings', icon: MessageSquare },
      ]
    },
    {
      id: 'social-media',
      label: 'Social Media',
      icon: MapPin,
      children: [
        { id: 'social-media-platforms', label: 'Social Platforms', icon: MapPin },
      ]
    },
    {
      id: 'admin-settings',
      label: 'Admin Settings',
      icon: Users,
      children: [
        { id: 'admin-credentials', label: 'Credentials', icon: Users },
      ]
    },
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroStatsManager />;
      case 'services-home':
        return <ServicesManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'clients':
        return <ClientsManager />;
      case 'services-page-content':
        return <ServicesPageManager />;
      case 'services-page-process':
        return <RecyclingProcessManager />;
      case 'events-list':
        return <EventsManager />;
      case 'epr-content':
        return <EPRPageManagerNew />;
      case 'about-content':
        return <AboutPageManager />;
      case 'about-team':
        return <CoreTeamManager />;
      case 'about-certifications':
        return <CertificationsManager />;
      case 'contact-page-settings':
        return <ContactPageSettings />;
      case 'contact-form-requests':
        return <ContactFormRequests />;
      case 'contact-forms':
        return <ContactFormsManager />;
      case 'footer-content':
        return <FooterManager />;
      case 'whatsapp-settings':
        return <WhatsAppSettingsManager />;
      case 'social-media-platforms':
        return <SocialMediaManager />;
      case 'admin-credentials':
        return <AdminSettings />;
      default:
        return <HeroStatsManager />;
    }
  };

  const getActiveLabel = () => {
    for (const menu of menuStructure) {
      const child = menu.children?.find(c => c.id === activeTab);
      if (child) return `${menu.label} - ${child.label}`;
    }
    return 'Dashboard';
  };

  if (!adminData) {
    return null;
  }

  return (
    <>
      <SEO 
        title="Admin Dashboard - E-Incarnation Recycling"
        description="Admin dashboard for managing E-Incarnation Recycling website content."
        noindex={true}
      />
      <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-[#1A0185] to-[#3451A3] text-white transition-all duration-300 fixed h-full z-30`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-black">Admin Panel</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {menuStructure.map((menu) => {
            const MenuIcon = menu.icon;
            const isExpanded = expandedMenus.includes(menu.id);
            
            return (
              <div key={menu.id} className="mb-1">
                {/* Parent Menu */}
                <button
                  onClick={() => toggleMenu(menu.id)}
                  className="w-full flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MenuIcon size={20} />
                    {sidebarOpen && <span className="font-medium">{menu.label}</span>}
                  </div>
                  {sidebarOpen && (
                    isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                  )}
                </button>
                
                {/* Child Menu Items */}
                {isExpanded && sidebarOpen && menu.children && (
                  <div className="bg-black/10">
                    {menu.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <button
                          key={child.id}
                          onClick={() => setActiveTab(child.id)}
                          className={`w-full flex items-center justify-between gap-3 px-12 py-2.5 hover:bg-white/10 transition-colors text-sm ${
                            activeTab === child.id ? 'bg-white/20 border-r-4 border-white' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <ChildIcon size={16} />
                            <span>{child.label}</span>
                          </div>
                          {child.badge > 0 && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] text-center">
                              {child.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <header className="bg-white shadow-sm px-8 py-6 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                {getActiveLabel()}
              </h1>
              <p className="text-gray-600 text-sm mt-1">Manage your website content</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{adminData.name}</p>
                <p className="text-xs text-gray-600">{adminData.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#1A0185] to-[#87BBD7] rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>

      {/* Connection Status Indicator */}
      <ConnectionStatus />
    </div>
    </>
  );
};

export default AdminDashboard;
