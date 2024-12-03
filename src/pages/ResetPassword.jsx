import { useState } from 'react'
import { TextField } from '@mui/material'

export default function ResetPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle reset password logic here
  }

  const inputStyles = {
    width: '320px',
    marginBottom: '12px',
    '& .MuiOutlinedInput-root': {
      height: '48px',
      '& fieldset': {
        borderWidth: '2px',
        borderColor: '#e5e7eb',
      },
      '&:hover fieldset': {
        borderColor: '#e5e7eb',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0f6657',
        borderWidth: '2px',
      },
      '& input': {
        height: '48px',
        padding: '4px 14px !important',
        boxSizing: 'border-box',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#0f6657',
      },
      transform: 'translate(14px, 14px) scale(1)',
      '&.Mui-focused, &.MuiFormLabel-filled': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
    },
    '& .MuiOutlinedInput-input': {
      '&::placeholder': {
        opacity: 1,
      },
    },
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
                <h1 
                  className="text-[28px] font-bold text-gray-900 text-left tracking-[-0.04em] leading-[32px] font-inter whitespace-nowrap"
                  style={{ 
                    textUnderlinePosition: 'from-font',
                    textDecorationSkipInk: 'none'
                  }}
                >
                  Passwort zurücksetzen
                </h1>
                <p className="text-gray-500 mt-2 text-left text-base">
                  Geben Sie Ihre E-Mail-Adresse ein.
                </p>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="flex flex-col items-start">
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  sx={inputStyles}
                />

                <button
                  type="submit"
                  className="w-[320px] bg-[#0f6657] text-white font-medium py-3 px-4 rounded-md hover:bg-[#0f6657]/90 transition-colors"
                >
                  Link senden
                </button>
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