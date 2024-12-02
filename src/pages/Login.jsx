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
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Column - Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-white px-20">
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

      {/* Right Column - Image Section */}
      <div className="w-1/2 bg-white py-3 pr-3">
        <div className="h-[calc(100vh-24px)] relative">
          <img
            src="/building.png"
            alt="Modern building with greenery"
            className="w-full h-full object-contain object-right"
            style={{ objectPosition: '98% center' }} 
          />
            {/* 98% center is the best position for the image */}

        </div>
      </div>
    </div>
  )
} 