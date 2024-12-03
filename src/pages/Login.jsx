import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center p-0">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[1000px] h-[700px] flex">
        {/* Left Column - Form Section */}
        <div className="w-[400px] flex flex-col px-10">
          {/* Logo Section */}
          <div className="flex items-center gap-2 pt-6">
            <img src="/logo-svg.svg" alt="Company Logo" className="h-8 w-auto" />
            <img src="/logo-text.svg" alt="Company Name" className="h-5 w-auto" />
          </div>
          
          {/* Center the form */}
          <div className="flex-1 flex items-center justify-center py-10">
            <div className="w-full pl-10">
              {/* Title Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 text-left">
                  Anmeldung
                </h1>
                <p className="text-gray-400 mt-2 text-left text-sm">
                  Bitte geben Sie Ihre Zugangsdaten ein.
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
                    className="w-[320px] px-4 py-2.5 rounded-md border-2 border-gray-200 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors peer placeholder-transparent"
                    id="email"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Passwort"
                    className="w-[320px] px-4 py-2.5 rounded-md border-2 border-gray-200 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors peer placeholder-transparent"
                    id="password"
                  />
                  <label 
                    htmlFor="password"
                    className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Passwort
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-900">
                    Angemeldet bleiben
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-[320px] bg-primary text-white font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Anmelden
                </button>

                <div className="flex justify-center w-[320px]">
                  <Link 
                    to="/reset-password" 
                    className="text-sm text-gray-900 hover:text-gray-700 underline transition-colors"
                  >
                    Passwort vergessen?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Image Section */}
        <div className="w-[600px] bg-white pl-8">
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