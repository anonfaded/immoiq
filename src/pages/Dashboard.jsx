import { useState, useEffect, useRef } from 'react'
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
  MenuBook,
  RequestQuote,
  Refresh,
  Archive,
  HelpOutline,
  AttachFile,
  Close,
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

          // Create vertical line element
          const line = document.createElement('div');
          line.id = 'chartjs-vertical-line';
          line.style.position = 'fixed';
          line.style.pointerEvents = 'none';
          line.style.zIndex = 9997;
          line.style.transition = 'all .15s ease';
          line.style.width = '1px';
          line.style.borderLeft = '2px dotted rgba(0, 0, 0, 0.2)';
          line.style.transform = 'translateX(-50%)';
          document.body.appendChild(line);
        }

        const verticalLineEl = document.getElementById('chartjs-vertical-line');

        if (context.tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          pointEl.style.opacity = 0;
          verticalLineEl.style.opacity = 0;
          return;
        }

        if (context.tooltip.body) {
          const titleLines = context.tooltip.title || [];
          const bodyLines = context.tooltip.body.map(b => b.lines);
          const color = context.tooltip.labelColors[0].borderColor;

          // Update point and line style
          pointEl.style.backgroundColor = color;
          pointEl.style.opacity = 1;
          verticalLineEl.style.opacity = 1;
          verticalLineEl.style.borderColor = 'rgba(0, 0, 0, 0.2)';

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

        // Position everything
        const position = context.chart.canvas.getBoundingClientRect();
        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipX = position.left + context.tooltip.caretX;
        const tooltipY = position.top + context.tooltip.caretY;
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

        // Position tooltip
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = xPosition + 'px';
        tooltipEl.style.top = (tooltipY - tooltipEl.offsetHeight / 2) + 'px';

        // Position the hover point
        pointEl.style.left = tooltipX + 'px';
        pointEl.style.top = tooltipY + 'px';

        // Position the vertical line
        verticalLineEl.style.left = tooltipX + 'px';
        verticalLineEl.style.top = position.top + 'px';
        verticalLineEl.style.height = position.height + 'px';
        verticalLineEl.style.opacity = 1;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [containerHeight, setContainerHeight] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const containerRef = useRef(null);

  const rows = [
    {
      name: "Bernd Eisenhammer",
      time: "Heute - 11:30",
      description: "Herr Eisenhammer wollte wissen, wie das Rückrufformular funktioniert und ob es mit ihrem aktuellen CRM-System verbunden werde ..."
    },
    {
      name: "Hanspeter Schmid",
      time: "Gestern - 21:10",
      description: "Herr Schmid hat sich für die Integration des KI-Widgets auf seiner Webseite interessiert. Er möchte mehr über die Lead-Management ..."
    },
    {
      name: "Ursula Müller",
      time: "Vor 2 Tagen",
      description: "Frau Müller hat nachgefragt, wie das KI-Tool für die Erstellung von Immobilienbeschreibungen genutzt werden kann, um Zeit zu spare."
    },
    {
      name: "Monika Zimmermann",
      time: "Vor 2 Tagen",
      description: "Frau Zimmermann hat sich über die Funktion für Kundenbewertungen informiert und gefragt, wie diese in ihre bestehende Webseite ..."
    },
    {
      name: "Bernd Eisenhammer",
      time: "Vor 2 Tagen",
      description: "Herr Eisenhammer wollte wissen, wie das Rückrufformular funktioniert und ob es mit ihrem aktuellen CRM-System verbunden werde."
    },
    {
      name: "Hanspeter Schmid",
      time: "Vor 4 Tagen",
      description: "Herr Schmid hat sich für die Integration des KI-Widgets auf seiner Webseite interessiert. Er möchte mehr über die Lead-Management ..."
    },
    {
      name: "Ursula Müller",
      time: "Vor 6 Tagen",
      description: "Frau Müller hat nachgefragt, wie das KI-Tool für die Erstellung von Immobilienbeschreibungen genutzt werden kann, um Zeit zu spare."
    },
    {
      name: "Monika Zimmermann",
      time: "Vor 1 Woche",
      description: "Frau Zimmermann hat sich über die Funktion für Kundenbewertungen informiert und gefragt, wie diese in ihre bestehende Webseite .."
    },
    {
      name: "Bernd Eisenhammer",
      time: "Vor 1 Woche",
      description: "Herr Eisenhammer wollte wissen, wie das Rückrufformular funktioniert und ob es mit ihrem aktuellen CRM-System verbunden werde .."
    },
    {
      name: "Hanspeter Schmid",
      time: "Vor 1 Woche",
      description: "Herr Schmid hat sich für die Integration des KI-Widgets auf seiner Webseite interessiert. Er möchte mehr über die Lead-Management ..."
    },
    {
      name: "Ursula Müller",
      time: "Vor 2 Wochen",
      description: "Frau Müller hat nachgefragt, wie das KI-Tool für die Erstellung von Immobilienbeschreibungen genutzt werden kann, um Zeit zu spare."
    }
  ];

  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const getCurrentPageRows = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return rows.slice(startIndex, startIndex + rowsPerPage);
  };

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

  // Calculate container height and rows based on viewport
  useEffect(() => {
    const calculateContainer = () => {
      const viewportHeight = window.innerHeight;
      const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
      const marginBottom = 1;
      const topOffset = 16;
      const availableHeight = viewportHeight - containerTop - marginBottom - topOffset;
      setContainerHeight(availableHeight);

      // Calculate rows that can fit
      const headerHeight = 180;
      const rowHeight = 48;
      const availableRowSpace = availableHeight - headerHeight;
      const possibleRows = Math.floor(availableRowSpace / rowHeight);
      setRowsPerPage(Math.max(6, Math.min(possibleRows, rows.length)));
    };

    calculateContainer();
    window.addEventListener('resize', calculateContainer);
    return () => window.removeEventListener('resize', calculateContainer);
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

          {/* New Section */}
          <div 
            ref={containerRef}
            className="bg-white rounded-lg shadow flex flex-col mb-4 mt-4"
            style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
          >
            {/* Top Section */}
            <div className="p-6">
              {/* Top Control Row */}
              <div className="flex items-center justify-between mb-4">
                {/* Left Controls */}
                <div className="flex items-center gap-2">
                  <div className="pl-3 pr-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                    />
                  </div>
                  <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100">
                    <Refresh className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="flex items-center gap-1.5 text-red-600 hover:text-red-700">
                    <Archive className="w-4 h-4" />
                    <span className="text-sm font-medium">Zum Archiv</span>
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Leads durchsuchen"
                      className="w-48 h-8 pl-3 pr-8 rounded-md border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                    />
                    <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100">
                    <Settings className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100">
                    <HelpOutline className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* First Divider */}
              <div className="h-px bg-gray-200 -mx-6 mb-4" />

              {/* Buttons Row with Pagination */}
              <div className="flex items-center justify-between mb-4">
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="h-8 px-3 flex items-center gap-1.5 bg-white border border-[#34C759] text-[#34C759] font-semibold rounded-md hover:bg-[#f8f8f8] transition-colors text-sm">
                    <SmartToy className="w-3.5 h-3.5" />
                    KI-Widget
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 bg-white border border-[#FFA726] text-[#FFA726] font-semibold rounded-md hover:bg-[#f8f8f8] transition-colors text-sm">
                    <Phone className="w-3.5 h-3.5" />
                    Rückrufformular
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 bg-white border border-[#1E88E5] text-[#1E88E5] font-semibold rounded-md hover:bg-[#f8f8f8] transition-colors text-sm">
                    <MenuBook className="w-3.5 h-3.5" />
                    Guides/Checklisten
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 bg-white border border-[#9C27B0] text-[#9C27B0] font-semibold rounded-md hover:bg-[#f8f8f8] transition-colors text-sm">
                    <RequestQuote className="w-3.5 h-3.5" />
                    Preisanfrage
                  </button>
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalRows)} von ${totalRows}`}
                  </span>
                  <div className="flex gap-0.5">
                    <button 
                      className={`w-7 h-7 flex items-center justify-center rounded-full ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      className={`w-7 h-7 flex items-center justify-center rounded-full ${
                        currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Second Divider */}
              <div className="h-px bg-gray-200 -mx-6" />
            </div>

            {/* Data Rows Section */}
            <div className="px-6 pb-4 flex-1 overflow-hidden">
              <div className="h-full">
                {getCurrentPageRows().map((row, index) => (
                  <div 
                    key={index}
                    className="h-12 flex items-center hover:bg-[#F9F9F9] transition-colors"
                  >
                    {/* Checkbox */}
                    <div className="pl-3 pr-2 shrink-0">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#1E88E5] focus:ring-[#1E88E5]"
                      />
                    </div>

                    {/* Name with Status */}
                    <div className="flex items-center gap-2 min-w-[140px] md:min-w-[180px] px-2 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#34C759] shrink-0" />
                      <span className="font-semibold text-black truncate">{row.name}</span>
                    </div>

                    {/* Time */}
                    <div className="px-2 min-w-[100px] md:min-w-[120px] font-semibold text-[#1E88E5] shrink-0">
                      {row.time}
                    </div>

                    {/* Description */}
                    <div className="px-2 flex-1 min-w-0 text-[14px] text-[#757575]">
                      <p className="truncate">{row.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="px-3 flex items-center gap-1.5 shrink-0">
                      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F3F3F3] hover:bg-[#D6D6D6] transition-colors">
                        <AttachFile className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F3F3F3] hover:bg-[#D6D6D6] transition-colors">
                        <Close className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 