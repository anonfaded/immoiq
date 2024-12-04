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
  ArrowUpward as ArrowUpIcon,
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

const greenChartData = {
  labels: (() => {
    const today = new Date();
    return Array.from({ length: 15 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (14 - i));
      return date.toISOString().split('T')[0];
    });
  })(),
  datasets: [{
    label: 'Gesamt Unterhaltungen',
    data: [25, 65, 30, 75, 40, 85, 35, 80, 45, 90, 50, 95, 60, 100, 70],
    borderColor: '#34c759',
    tension: 0.4,
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 0,
    pointHitRadius: 30,
    cubicInterpolationMode: 'monotone',
    spanGaps: true
  }]
};

const yellowChartData = {
  labels: (() => {
    const today = new Date();
    return Array.from({ length: 9 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (8 - i));
      return date.toISOString().split('T')[0];
    });
  })(),
  datasets: [{
    label: 'Leads Konvertiert',
    data: [25, 60, 35, 70, 45, 80, 55, 90, 65],
    borderColor: '#FFB800',
    tension: 0.4,
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 0,
    pointHitRadius: 30,
    cubicInterpolationMode: 'monotone',
    spanGaps: true
  }]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: function(context) {
        const tooltipEl = document.getElementById('chartjs-tooltip');
        const pointEl = document.getElementById('chartjs-point');
        
        if (!tooltipEl) {
          const div = document.createElement('div');
          div.id = 'chartjs-tooltip';
          div.style.opacity = 1;
          div.style.pointerEvents = 'none';
          div.style.position = 'fixed';
          div.style.zIndex = 9999;
          div.style.transition = 'all .1s ease';
          document.body.appendChild(div);
        }

        if (!pointEl) {
          const div = document.createElement('div');
          div.id = 'chartjs-point';
          div.style.position = 'fixed';
          div.style.pointerEvents = 'none';
          div.style.zIndex = 9998;
          div.style.transition = 'all .15s ease';
          div.style.width = '10px';
          div.style.height = '10px';
          div.style.borderRadius = '50%';
          div.style.border = '2px solid white';
          div.style.transform = 'translate(-50%, -50%)';
          document.body.appendChild(div);
        }

        if (context.tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          pointEl.style.opacity = 0;
          return;
        }

        if (context.tooltip.body) {
          const titleLines = context.tooltip.title || [];
          const bodyLines = context.tooltip.body.map(b => b.lines);
          const color = context.tooltip.labelColors[0].borderColor;

          // Update point style
          pointEl.style.backgroundColor = color;
          pointEl.style.opacity = 1;

          // Format the date
          const date = new Date(titleLines[0]);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;

          // Get value directly from the datapoint
          const value = Math.round(context.tooltip.dataPoints[0].raw);

          let innerHtml = `
            <div style="overflow: hidden; border-radius: 6px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: inline-block;">
              <div style="padding: 6px 10px; background: #1f2937; white-space: nowrap;">
                <div style="color: white; font-size: 12px; font-weight: 500;">${formattedDate}</div>
              </div>
              <div style="padding: 6px 10px; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; gap: 12px; white-space: nowrap;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: ${color};"></div>
                <div style="color: white; font-size: 12px;">${value}</div>
              </div>
            </div>
          `;

          tooltipEl.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipX = position.left + context.tooltip.caretX;
        const chartWidth = position.width;
        const padding = 100;
        
        let xPosition;
        if (tooltipX < position.left + padding) {
          xPosition = tooltipX + 20;
        } else if (tooltipX > position.left + chartWidth - padding) {
          xPosition = tooltipX - tooltipWidth - 20;
        } else {
          xPosition = tooltipX > position.left + chartWidth / 2 ? 
            tooltipX - tooltipWidth - 20 : 
            tooltipX + 20;
        }

        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = xPosition + 'px';
        tooltipEl.style.top = (position.top + context.tooltip.caretY - tooltipEl.offsetHeight / 2) + 'px';

        // Position the point
        pointEl.style.left = (position.left + context.tooltip.caretX) + 'px';
        pointEl.style.top = (position.top + context.tooltip.caretY) + 'px';
      }
    },
  },
  scales: {
    y: {
      display: false,
      beginAtZero: true,
      suggestedMax: 100,
    },
    x: {
      display: false,
    }
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      cubicInterpolationMode: 'monotone',
    },
    point: {
      radius: 0,
      hitRadius: 30,
      hoverRadius: 0,
    }
  }
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div 
        className={`fixed h-screen bg-white shadow-lg transition-all duration-300 z-20
          ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}
      >
        {/* Logo Section */}
        <div className="h-20 p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-svg.svg" alt="Company Logo" className="h-8 w-auto" />
            {isSidebarOpen && (
              <img src="/logo-text.svg" alt="Company Name" className="h-5 w-auto" />
            )}
          </div>
          <IconButton 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500"
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
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded-md hover:bg-gray-200 transition-colors mb-2"
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
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className="text-gray-400">-</span>
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="p-4 border-t border-gray-200 relative">
          <div className="bg-[#34c759] text-white rounded-lg p-4 h-auto pt-12">
            {/* Profile Picture */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                <AccountCircle className="w-14 h-14 text-gray-500" />
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
        <nav className="h-16 bg-white shadow-sm px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-gray-600">
            <Home className="w-4 h-4" />
            <span className="text-gray-400">/</span>
            <span className="text-sm">Lead-Management</span>
          </div>

          <div className="flex items-center gap-4">
            <IconButton 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-gray-600"
            >
              <DarkMode />
            </IconButton>
            
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">C</span>
            </div>
          </div>
        </nav>

        {/* Greeting Section */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">👋</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  Grüzi Carlos
                </span>
                <span className="text-gray-400 text-2xl">-</span>
                <span className="text-2xl text-gray-500">
                  Lass uns heute mehr Verkaufsmandate gewinnen!
                </span>
              </div>
            </div>
          </div>

          <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
            <span className="text-gray-700">
              Vorschlag einreichen
            </span>
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Main Content Area */}
        <main className="p-4 space-y-4">
          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Conversations Chart Card */}
            <div className="bg-white rounded-lg shadow-md p-3 min-h-[10.5rem] flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                KI-Widget Performance
              </h3>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {/* Left Column */}
                <div className="flex flex-col h-[6rem]">
                  <h4 className="text-xs font-medium text-gray-500 mb-1">
                    Gesamt Unterhaltungen
                  </h4>
                  <span className="text-base font-bold text-[#FF3366]">
                    318
                  </span>
                  <div className="h-[3rem] mt-1">
                    <Line 
                      data={greenChartData}
                      options={chartOptions}
                    />
                  </div>
                </div>
                {/* Right Column */}
                <div className="flex flex-col h-[6rem]">
                  <h4 className="text-xs font-medium text-gray-500 mb-1">
                    Leads Konvertiert
                  </h4>
                  <span className="text-base font-bold text-[#FF3366]">
                    64
                  </span>
                  <div className="h-[3rem] mt-1">
                    <Line 
                      data={yellowChartData}
                      options={chartOptions}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Solved Requests Card */}
            <div className="bg-white rounded-lg shadow-md p-3 min-h-[10.5rem] flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Gelöste Anfragen
              </h3>
              <div className="flex-1 flex flex-col">
                <div className="flex items-center pt-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#0e6854]">89%</span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span>diesen Monat</span>
                      <svg className="w-3 h-3 text-[#0e6854]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="relative flex items-center px-1 mb-1">
                    <div className="relative flex-1 h-2.5 bg-[#0e6854]/10 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#0e6854] rounded-full transition-all duration-500"
                        style={{ width: '89%' }}
                      />
                      <div 
                        className="absolute top-[10%] left-0 h-[80%] bg-[#0e6854] rounded-full transition-all duration-500"
                        style={{ width: '89%' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 ml-4">89%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Rate Card */}
            <div className="bg-[#0e6854] rounded-lg shadow-md p-3 min-h-[10.5rem] flex flex-col relative overflow-hidden">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#12705b]"></div>
              <h3 className="text-sm font-semibold text-white mb-3 relative">
                Interaktionsrate
              </h3>
              <div className="flex-1 flex flex-col relative">
                <div className="flex-1 flex items-center">
                  <div className="text-2xl font-bold text-white">76%</div>
                </div>
                <div className="flex items-end justify-between mb-1">
                  <p className="text-xs text-gray-100/70 max-w-[70%]">
                    Der Besucher haben mit dem Widget interagiert
                  </p>
                  <button className="px-2 py-0.5 text-xs text-white border border-white/40 rounded hover:bg-white/10 transition-colors">
                    Oktober
                  </button>
                </div>
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
          <div className="bg-white rounded-lg shadow-md">
            <div className="max-w-full p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Letzte Aktivitäten
                </h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Suchen..."
                      className="w-64 h-9 pl-9 pr-4 rounded-md border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34c759] focus:border-transparent"
                    />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button className="h-9 px-3 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1">
                    <Sort className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                      Name
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Sort className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                      Zeitpunkt
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Sort className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                      Beschreibung
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                      Status
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Sort className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-gray-500">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr 
                      key={index} 
                      className={`
                        border-b border-gray-200 h-12
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        hover:bg-gray-100 transition-colors
                      `}
                    >
                      <td className="py-3 px-6 text-sm text-gray-900">
                        Max Mustermann
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-500">
                        Heute, 14:30
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-900">
                        Neue Anfrage erstellt
                      </td>
                      <td className="py-3 px-6">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Aktiv
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <IconButton 
                            size="small" 
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Edit className="w-4 h-4" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Delete className="w-4 h-4" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            className="text-gray-400 hover:text-gray-600"
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
                <div className="text-sm text-gray-500">
                  Zeige 1 bis 5 von 42 Einträgen
                </div>
                <div className="flex gap-2">
                  <button className="h-8 px-3 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1 disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                    Zurück
                  </button>
                  <button className="h-8 px-3 bg-[#34c759] text-white rounded text-sm hover:bg-[#34c759]/90 transition-colors">
                    1
                  </button>
                  <button className="h-8 px-3 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                    2
                  </button>
                  <button className="h-8 px-3 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                    3
                  </button>
                  <button className="h-8 px-3 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1">
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