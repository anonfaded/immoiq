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
} from '@mui/icons-material'

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
      <div className="flex-1">
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
        <main className="p-6">
          {/* Content will be added in next steps */}
          <div className="text-gray-500">Dashboard content will be implemented in next steps</div>
        </main>
      </div>
    </div>
  )
} 