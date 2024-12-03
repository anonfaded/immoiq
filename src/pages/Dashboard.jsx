import { useState } from 'react'
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

// Chart data
const lineChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Gesamt Unterhaltungen',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#0f6657',
      tension: 0.4,
    },
    {
      label: 'Leads Konvertiert',
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: '#9333ea',
      tension: 0.4,
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

// Sample table data
const tableData = [
  {
    id: 1,
    name: 'Max Mustermann',
    timestamp: '2024-01-20 14:30',
    description: 'Neue Anfrage erstellt',
    status: 'Aktiv'
  },
  {
    id: 2,
    name: 'Anna Schmidt',
    timestamp: '2024-01-20 13:15',
    description: 'Dokument hochgeladen',
    status: 'Abgeschlossen'
  },
  // Add more rows as needed
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('leistungsubersicht')
  const [expandedSections, setExpandedSections] = useState({
    mandatscout: true,
    kiwidget: false,
    kontoeinstellungen: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        {/* Logo Section */}
        <div className="p-4 border-b flex items-center justify-between">
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
        <div className="flex-1 overflow-y-auto py-4">
          {/* MandatScout Section */}
          <div className="px-4 mb-6">
            <button
              onClick={() => toggleSection('mandatscout')}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-400 uppercase mb-2"
            >
              <span>MandatScout</span>
              {expandedSections.mandatscout ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </button>
            
            {expandedSections.mandatscout && (
              <div className="space-y-1">
                <Link
                  to="#"
                  className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                    activeSection === 'leistungsubersicht'
                      ? 'bg-[#0f6657]/10 text-[#0f6657]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveSection('leistungsubersicht')}
                >
                  Leistungsübersicht
                </Link>
                <Link
                  to="#"
                  className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                    activeSection === 'erfasste-leads'
                      ? 'bg-[#0f6657]/10 text-[#0f6657]'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveSection('erfasste-leads')}
                >
                  Erfasste Leads
                </Link>
              </div>
            )}
          </div>

          {/* KI-Widget Section */}
          <div className="px-4 mb-6">
            <button
              onClick={() => toggleSection('kiwidget')}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-400 uppercase mb-2"
            >
              <span>KI-Widget</span>
              {expandedSections.kiwidget ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </button>
            
            {expandedSections.kiwidget && (
              <div className="space-y-1">
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Widget-Einstellungen
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Chatbot Training
                </Link>
              </div>
            )}
          </div>

          {/* Kontoeinstellungen Section */}
          <div className="px-4">
            <button
              onClick={() => toggleSection('kontoeinstellungen')}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-400 uppercase mb-2"
            >
              <span>Kontoeinstellungen</span>
              {expandedSections.kontoeinstellungen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </button>
            
            {expandedSections.kontoeinstellungen && (
              <div className="space-y-1">
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Profil
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Benachrichtigungen
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="p-4 border-t">
          <div className="bg-[#0f6657] text-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Brauchen Sie Hilfe?</h3>
            <p className="text-sm mb-4">Unser Support-Team ist für Sie da!</p>
            <div className="space-y-2">
              <a
                href="mailto:support@example.com"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Email className="w-4 h-4" />
                support@example.com
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-white text-[#0f6657] px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <WhatsApp className="w-4 h-4" />
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Home className="w-5 h-5" />
            <span className="text-sm">Lead-Management</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-gray-700">
              <span className="mr-2">👋</span>
              <span className="font-medium">Grüzi Carlos</span>
              <p className="text-sm text-gray-500">Schön, dass du wieder da bist!</p>
            </div>

            <div className="flex items-center gap-4">
              <IconButton className="text-gray-600">
                <DarkMode />
              </IconButton>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">C</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="p-6 space-y-6">
          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* Conversations Chart Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Unterhaltungen & Leads</h3>
              <div className="h-64">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>

            {/* Solved Requests Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gelöste Anfragen</h3>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-4xl font-bold text-[#0f6657] mb-2">85%</div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0f6657] rounded-full"
                    style={{ width: '85%' }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">234 von 275 Anfragen</p>
              </div>
            </div>

            {/* Interaction Rate Card */}
            <div className="bg-[#0f6657] rounded-lg shadow p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Interaktionsrate</h3>
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-6xl font-bold mb-2">92%</div>
                <p className="text-sm opacity-80">Durchschnittliche Antwortrate</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-[#0f6657] text-white rounded-md hover:bg-[#0f6657]/90 transition-colors flex items-center gap-2">
              <span>KI-Widget</span>
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Rückrufformular
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Guides/Checklisten
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
              Preisanfrage
            </button>
          </div>

          {/* Main Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Letzte Aktivitäten</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Suchen..."
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f6657] focus:border-transparent"
                  />
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    Filter
                  </button>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Zeitpunkt</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Beschreibung</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{row.name}</td>
                      <td className="py-3 px-4 text-gray-500">{row.timestamp}</td>
                      <td className="py-3 px-4">{row.description}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          row.status === 'Aktiv' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <IconButton size="small" className="text-gray-400 hover:text-gray-600">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" className="text-gray-400 hover:text-gray-600">
                            <Delete fontSize="small" />
                          </IconButton>
                          <IconButton size="small" className="text-gray-400 hover:text-gray-600">
                            <MoreVert fontSize="small" />
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
                  Zeige 1 bis 10 von 42 Einträgen
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">
                    Zurück
                  </button>
                  <button className="px-3 py-1 bg-[#0f6657] text-white rounded hover:bg-[#0f6657]/90">
                    1
                  </button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border rounded hover:bg-gray-50">
                    Weiter
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