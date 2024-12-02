import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex items-start justify-start p-0">
      {/* Main Container */}
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden absolute w-[1440px] h-[800px] flex"
        style={{ 
          left: '253px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        {/* Left Column - Form Section */}
        <div className="w-1/2 flex flex-col px-20">
          {/* Logo Section */}
          <div className="flex items-center gap-2 pt-6">
            <img 
              src="/logo-svg.svg" 
              alt="Company Logo" 
              className="h-10 w-auto" 
            />
            <img 
              src="/logo-text.svg" 
              alt="Company Name" 
              className="h-6 w-auto" 
            />
          </div>
          
          {/* Center the form */}
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="w-full max-w-md">
              {/* Title Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Login
                </h1>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex justify-end">
                  <Link 
                    to="/reset-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Passwort vergessen?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Anmelden
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Image Section */}
        <div className="w-1/2 bg-white p-3 pr-3">
          <div className="h-full relative">
            <img
              src="/building.png"
              alt="Modern building with greenery"
              className="w-full h-full object-contain object-right"
              style={{ objectPosition: '98% center' }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
} 