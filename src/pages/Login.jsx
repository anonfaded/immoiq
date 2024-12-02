import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center p-0">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[1000px] h-[700px] flex">
        {/* Left Column - Form Section */}
        <div className="w-[350px] flex flex-col px-10">
          {/* Logo Section */}
          <div className="flex items-center gap-2 pt-6">
            <img src="/logo-svg.svg" alt="Company Logo" className="h-8 w-auto" />
            <img src="/logo-text.svg" alt="Company Name" className="h-5 w-auto" />
          </div>
          
          {/* Center the form */}
          <div className="flex-1 flex items-center justify-center py-10">
            <div className="w-full">
              {/* Title Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 text-left">
                  Welcome Back
                </h1>
                <p className="text-gray-600 mt-2 text-left">
                  Please enter your details to sign in
                </p>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-200 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors peer placeholder-transparent"
                    id="email"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-200 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors peer placeholder-transparent"
                    id="password"
                  />
                  <label 
                    htmlFor="password"
                    className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Password
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Anmelden
                </button>

                <div className="text-center">
                  <Link 
                    to="/reset-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Passwort vergessen?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Image Section */}
        <div className="w-[650px] bg-white pl-8">
          <div className="h-full w-full relative p-3 flex justify-end">
            <img
              src="/building.png"
              alt="Modern building with greenery"
              className="h-full object-contain object-right"
              style={{ objectPosition: 'right center' }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
} 