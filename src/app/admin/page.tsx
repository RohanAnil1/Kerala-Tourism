'use client';

import { useState } from 'react';
import { BarChart3, MapPin, FileText, Users, Settings, PlusCircle, Eye, Edit, Trash2, Search, TrendingUp, Globe, Camera, Shield, Bell, Menu, X, LogOut, Home } from 'lucide-react';
import Link from 'next/link';

// Mock analytics data
const analytics = {
  totalVisitors: 125430,
  monthlyGrowth: 12.5,
  totalBookings: 3241,
  revenue: 8450000,
  topPages: [
    { page: '/destinations/munnar', views: 14200 },
    { page: '/destinations/alleppey', views: 12800 },
    { page: '/experiences/houseboat-cruise', views: 9400 },
    { page: '/trip-planner', views: 8100 },
    { page: '/blog/backwater-guide', views: 7300 },
  ],
  recentActivity: [
    { action: 'New booking', detail: 'Kumarakom Lake Resort - 3 nights', time: '2 min ago' },
    { action: 'Blog published', detail: 'Top 10 Monsoon Destinations', time: '1 hour ago' },
    { action: 'Review submitted', detail: '5★ review for Munnar Tea Trek', time: '3 hours ago' },
    { action: 'New inquiry', detail: 'Group tour - 15 pax from Germany', time: '5 hours ago' },
    { action: 'Content updated', detail: 'Alleppey destination photos', time: '1 day ago' },
  ],
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'destinations', label: 'Destinations', icon: MapPin },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'media', label: 'Media Library', icon: Camera },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'seo', label: 'SEO', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Top Bar */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-white border-b h-14 flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-display text-lg font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <Link href="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-kerala-green">
            <Home size={16} /> View Site
          </Link>
        </div>
      </div>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r transform transition-transform duration-300 pt-28 lg:pt-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <nav className="p-4 space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-kerala-green text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-[80vh]">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'destinations' && <DestinationsTab />}
          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'media' && <MediaTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'seo' && <SEOTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

function OverviewTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Visitors', value: analytics.totalVisitors.toLocaleString(), change: `+${analytics.monthlyGrowth}%`, color: 'bg-blue-500' },
          { label: 'Total Bookings', value: analytics.totalBookings.toLocaleString(), change: '+8.3%', color: 'bg-kerala-green' },
          { label: 'Revenue', value: '₹84.5L', change: '+15.2%', color: 'bg-kerala-gold' },
          { label: 'Avg Rating', value: '4.7', change: '+0.2', color: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">{stat.label}</span>
              <span className={`${stat.color} text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}>
                <TrendingUp size={12} /> {stat.change}
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {analytics.topPages.map((page, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-kerala-green/10 text-kerala-green text-xs font-bold rounded-full flex items-center justify-center">{i + 1}</span>
                  <span className="text-sm text-gray-700 font-mono">{page.page}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {analytics.recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-kerala-green rounded-full flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-900">{item.action}</span>
                  <p className="text-sm text-gray-500">{item.detail}</p>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DestinationsTab() {
  const destinations = [
    { id: 1, name: 'Munnar', district: 'Idukki', status: 'published', views: 14200 },
    { id: 2, name: 'Alleppey', district: 'Alappuzha', status: 'published', views: 12800 },
    { id: 3, name: 'Fort Kochi', district: 'Ernakulam', status: 'published', views: 8900 },
    { id: 4, name: 'Wayanad', district: 'Wayanad', status: 'draft', views: 0 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
        <button className="flex items-center gap-2 bg-kerala-green text-white px-4 py-2 rounded-xl text-sm hover:bg-kerala-green/90">
          <PlusCircle size={16} /> Add Destination
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">District</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Views</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {destinations.map(d => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{d.name}</td>
                <td className="px-6 py-4 text-gray-600">{d.district}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${d.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {d.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{d.views.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Eye size={16} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Edit size={16} /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlogTab() {
  const posts = [
    { id: 1, title: 'Complete Guide to Kerala Backwaters', status: 'published', date: 'Dec 15, 2024', views: 7300 },
    { id: 2, title: 'Monsoon Magic in Kerala', status: 'published', date: 'Dec 10, 2024', views: 5100 },
    { id: 3, title: 'Kerala Food Trail', status: 'draft', date: 'Dec 8, 2024', views: 0 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button className="flex items-center gap-2 bg-kerala-green text-white px-4 py-2 rounded-xl text-sm hover:bg-kerala-green/90">
          <PlusCircle size={16} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Title</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Date</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Views</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{p.title}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{p.date}</td>
                <td className="px-6 py-4 text-gray-600">{p.views.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Eye size={16} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Edit size={16} /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MediaTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
        <button className="flex items-center gap-2 bg-kerala-green text-white px-4 py-2 rounded-xl text-sm hover:bg-kerala-green/90">
          <PlusCircle size={16} /> Upload Media
        </button>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="max-w-md mx-auto">
          <Camera size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Drag & Drop Media Files</h3>
          <p className="text-gray-500 text-sm mb-4">Support for JPEG, PNG, WebP, MP4 up to 50MB</p>
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl text-sm hover:bg-gray-200">
            Browse Files
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {['Munnar Hills', 'Backwater Sunset', 'Kathakali', 'Fort Kochi'].map((name, i) => (
            <div key={i} className="relative group bg-gray-100 rounded-xl aspect-square flex items-center justify-center">
              <Camera size={24} className="text-gray-400" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 rounded-lg text-white"><Eye size={16} /></button>
                <button className="p-2 bg-white/20 rounded-lg text-white"><Edit size={16} /></button>
                <button className="p-2 bg-red-500/50 rounded-lg text-white"><Trash2 size={16} /></button>
              </div>
              <span className="absolute bottom-2 left-2 text-xs text-gray-500">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-kerala-green/30" />
          </div>
          <button className="flex items-center gap-2 bg-kerala-green text-white px-4 py-2 rounded-xl text-sm hover:bg-kerala-green/90">
            <PlusCircle size={16} /> Add User
          </button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Arun Kumar', email: 'arun@keralatourism.org', role: 'Admin', status: 'active' },
            { name: 'Priya Menon', email: 'priya@keralatourism.org', role: 'Editor', status: 'active' },
            { name: 'Rahul Nair', email: 'rahul@keralatourism.org', role: 'Contributor', status: 'inactive' },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-kerala-green/10 text-kerala-green flex items-center justify-center font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{user.role}</span>
                <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Edit size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SEOTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Settings</h2>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Global Meta Tags</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Site Title</label>
              <input type="text" defaultValue="Kerala Tourism - God's Own Country" className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-kerala-green/30 outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Meta Description</label>
              <textarea defaultValue="Explore the enchanting beauty of Kerala..." rows={3} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-kerala-green/30 outline-none resize-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Keywords</label>
              <input type="text" defaultValue="Kerala tourism, backwaters, Munnar, Alleppey, God's Own Country" className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-kerala-green/30 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Sitemap & Robots</h3>
          <div className="flex gap-4">
            <button className="bg-kerala-green text-white px-4 py-2 rounded-xl text-sm hover:bg-kerala-green/90">Generate Sitemap</button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm hover:bg-gray-200">Edit robots.txt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Authentication</h3>
          <div className="space-y-3">
            {[
              { label: 'Two-Factor Authentication', desc: 'Require 2FA for admin accounts', enabled: true },
              { label: 'Session Timeout', desc: 'Auto-logout after 30 minutes of inactivity', enabled: true },
              { label: 'IP Whitelisting', desc: 'Restrict admin access to specific IPs', enabled: false },
              { label: 'Rate Limiting', desc: 'Limit API requests to 100/min', enabled: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <span className="font-medium text-gray-900">{item.label}</span>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button className={`w-12 h-6 rounded-full transition-colors relative ${item.enabled ? 'bg-kerala-green' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${item.enabled ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Security Headers</h3>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-600 space-y-1">
            <p>X-Frame-Options: DENY</p>
            <p>X-Content-Type-Options: nosniff</p>
            <p>X-XSS-Protection: 1; mode=block</p>
            <p>Strict-Transport-Security: max-age=63072000</p>
            <p>Content-Security-Policy: default-src &apos;self&apos;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">General Settings</h2>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Site Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Site Name</label>
              <input type="text" defaultValue="Kerala Tourism" className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-kerala-green/30 outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Contact Email</label>
              <input type="email" defaultValue="info@keralatourism.org" className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-kerala-green/30 outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Default Language</label>
              <select className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-kerala-green/30 outline-none">
                <option>English</option>
                <option>Malayalam</option>
                <option>Hindi</option>
                <option>Arabic</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Integrations</h3>
          <div className="space-y-3">
            {[
              { name: 'Google Analytics', status: 'Connected', connected: true },
              { name: 'Google Maps API', status: 'Connected', connected: true },
              { name: 'Payment Gateway (Razorpay)', status: 'Not configured', connected: false },
              { name: 'Email Service (SendGrid)', status: 'Connected', connected: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <p className="text-sm text-gray-500">{item.status}</p>
                </div>
                <button className={`px-4 py-1.5 rounded-lg text-sm ${item.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  {item.connected ? 'Configure' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-kerala-green text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-kerala-green/90">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
