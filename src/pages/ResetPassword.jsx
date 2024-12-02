import { useState } from 'react'

export default function ResetPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle reset password logic here
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center p-0">
      {/* Main Container */}
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden w-[1200px] h-[800px] flex"
      >
        {/* Left Column - Form Section */}
        <div className="w-[400px] flex flex-col px-12">
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
            <div className="w-full">
              {/* Title Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Passwort zurücksetzen
                </h1>
                <p className="text-base text-gray-500">
                  Geben Sie Ihre E-Mail-Adresse ein.
                </p>
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
                    placeholder="jonas_kahnwald@gmail.com"
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Link senden
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Image Section */}
        <div className="w-[800px] bg-white pl-10">
          <div className="h-full w-full relative p-3">
            <img
              src="/building.png"
              alt="Modern building with greenery"
              className="w-full h-full object-contain"
              style={{ objectPosition: 'center center' }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
} 