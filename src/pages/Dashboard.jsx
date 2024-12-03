import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import {
  Home,
  KeyboardArrowDown,
  KeyboardArrowRight,
  WhatsApp,
  Email,
  DarkMode,
  Menu as MenuIcon,
  MoreVert,
  Edit,
  Delete,
  Search,
  Sort,
  ChevronLeft,
  ChevronRight,
  Settings,
  Logout,
  AccountCircle,
  Phone,
  Dashboard as DashboardIcon,
  SmartToy,
  Support,
} from '@mui/icons-material'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Chart data and options
const lineChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Gesamt Unterhaltungen',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#34c759',
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: 'Leads Konvertiert',
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: '#9333ea',
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
}

const menuIcons = {
  mandatscout: <DashboardIcon className="w-4 h-4" />,
  kiwidget: <SmartToy className="w-4 h-4" />,
  kontoeinstellungen: <Settings className="w-4 h-4" />,
  support: <Support className="w-4 h-4" />,
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('privatverkaufschancen')
  const [expandedSections, setExpandedSections] = useState({
    mandatscout: true,
    kiwidget: false,
    kontoeinstellungen: false,
    support: false
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const menuItems = {
    mandatscout: [
      { id: 'privatverkaufschancen', label: 'Privatverkaufschancen' },
    ],
    kiwidget: [
      { id: 'widget-settings', label: 'Widget-Einstellungen' },
      { id: 'chatbot-training', label: 'Chatbot Training' },
      { id: 'analytics', label: 'Analytics' },
    ],
    kontoeinstellungen: [
      { id: 'profile', label: 'Profil' },
      { id: 'notifications', label: 'Benachrichtigungen' },
    ],
    support: [
      { id: 'faq', label: 'FAQ' },
      { id: 'documentation', label: 'Dokumentation' },
      { id: 'contact', label: 'Kontakt' },
    ],
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div 
        className={`fixed h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-20
          ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}
      >
        {/* Logo Section */}
        <div className="h-20 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-svg.svg" alt="Company Logo" className="h-8 w-auto" />
            {isSidebarOpen && (
              <img src="/logo-text.svg" alt="Company Name" className="h-5 w-auto" />
            )}
          </div>
          <IconButton 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 dark:text-gray-400"
          >
            <MenuIcon />
          </IconButton>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-6 overflow-x-hidden">
          {Object.entries(menuItems).map(([section, items]) => (
            <div key={section} className="mb-6 px-4">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700/50 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mb-2"
              >
                <div className="flex items-center gap-2">
                  {menuIcons[section]}
                  <span>{section}</span>
                </div>
                {isSidebarOpen && (expandedSections[section] ? <KeyboardArrowDown /> : <KeyboardArrowRight />)}
              </button>
              
              {(isSidebarOpen && expandedSections[section]) && (
                <div className="space-y-1 pl-8">
                  {items.map(item => (
                    <Link
                      key={item.id}
                      to="#"
                      className={`block py-2 pr-4 text-sm transition-colors ${
                        activeSection === item.id
                          ? 'text-[#34c759]'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className="text-gray-400 dark:text-gray-500">-</span>
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 relative">
          <div className="bg-[#34c759] dark:bg-[#2da94c] text-white rounded-lg p-4 h-auto pt-12">
            {/* Profile Picture */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg">
                <AccountCircle className="w-14 h-14 text-gray-500 dark:text-gray-400" />
              </div>
            </div>

            <h3 className="font-semibold text-center mb-4">Support Team</h3>
            
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                +1 234 567 890
              </a>
              <a href="mailto:support@example.com" className="flex items-center gap-2 text-sm">
                <Email className="w-4 h-4" />
                support@example.com
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <WhatsApp className="w-4 h-4" />
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation Bar */}
        <nav className="h-16 bg-white dark:bg-gray-800 shadow-sm px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Home className="w-4 h-4" />
            <span className="text-gray-400">/</span>
            <span className="text-sm">Lead-Management</span>
          </div>

          <div className="flex items-center gap-4">
            <IconButton 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-gray-600 dark:text-gray-300"
            >
              <DarkMode />
            </IconButton>
            
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-200 font-medium">C</span>
            </div>
          </div>
        </nav>

        {/* Greeting Section */}
        <div className="px-6 py-4 flex items-center gap-2">
          <span className="text-2xl">👋</span>
          <div>
            <span className="font-bold text-gray-900 dark:text-white">Grüzi Carlos</span>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Schön, dass du wieder da bist!
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Conversations Chart Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-80 h-36 p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Unterhaltungen & Leads
              </h3>
              <div className="h-16">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>

            {/* Solved Requests Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-80 h-36 p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Gelöste Anfragen
              </h3>
              <div className="flex flex-col items-center justify-center h-20">
                <div className="text-3xl font-bold text-[#34c759] dark:text-[#2da94c] mb-2">85%</div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#34c759] dark:bg-[#2da94c] rounded-full transition-all duration-500"
                    style={{ width: '85%' }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">234 von 275 Anfragen</p>
              </div>
            </div>

            {/* Interaction Rate Card */}
            <div className="bg-[#34c759] dark:bg-[#2da94c] rounded-lg shadow-md w-80 h-36 p-4 text-white">
              <h3 className="text-sm font-semibold mb-2">Interaktionsrate</h3>
              <div className="flex flex-col items-center justify-center h-20">
                <div className="text-3xl font-bold mb-1">92%</div>
                <p className="text-xs opacity-90">Durchschnittliche Antwortrate</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="h-12 flex gap-2">
            <button className="py-2 px-4 bg-[#34c759] hover:bg-[#34c759]/90 text-white rounded-md transition-colors text-sm font-semibold flex items-center gap-2">
              <span>KI-Widget</span>
            </button>
            <button className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors text-sm font-semibold">
              Rückrufformular
            </button>
            <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-semibold">
              Guides/Checklisten
            </button>
            <button className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors text-sm font-semibold">
              Preisanfrage
            </button>
          </div>

          {/* Main Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="max-w-full p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Letzte Aktivitäten
                </h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Suchen..."
                      className="w-64 h-9 pl-9 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#34c759] focus:border-transparent"
                    />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button className="h-9 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1">
                    <Sort className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Name
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Sort className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Zeitpunkt
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Sort className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Beschreibung
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Sort className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr 
                      key={index} 
                      className={`
                        border-b border-gray-200 dark:border-gray-700 h-12
                        ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}
                        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                      `}
                    >
                      <td className="py-3 px-6 text-sm text-gray-900 dark:text-gray-100">
                        Max Mustermann
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-500 dark:text-gray-400">
                        Heute, 14:30
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-900 dark:text-gray-100">
                        Neue Anfrage erstellt
                      </td>
                      <td className="py-3 px-6">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                          Aktiv
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <IconButton 
                            size="small" 
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <Edit className="w-4 h-4" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <Delete className="w-4 h-4" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <MoreVert className="w-4 h-4" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Zeige 1 bis 5 von 42 Einträgen
                </div>
                <div className="flex gap-2">
                  <button className="h-8 px-3 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                    Zurück
                  </button>
                  <button className="h-8 px-3 bg-[#34c759] text-white rounded text-sm hover:bg-[#34c759]/90 transition-colors">
                    1
                  </button>
                  <button className="h-8 px-3 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    2
                  </button>
                  <button className="h-8 px-3 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    3
                  </button>
                  <button className="h-8 px-3 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
                    Weiter
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 