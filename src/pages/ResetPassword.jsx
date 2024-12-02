import { useState } from 'react'

export default function ResetPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle reset password logic here
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-white px-20">
        <div className="w-full max-w-md">
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

      {/* Right Column - Image Section */}
      <div className="w-1/2 h-full">
        <img
          src="/building.png"
          alt="Modern building with greenery"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
} 