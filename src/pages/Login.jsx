import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
  }

  const inputStyles = {
    width: '320px',
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
                  className="text-[32px] font-bold text-gray-900 text-left tracking-[-0.04em] leading-[36px] font-inter"
                  style={{ 
                    textUnderlinePosition: 'from-font',
                    textDecorationSkipInk: 'none'
                  }}
                >
                  Anmeldung
                </h1>
                <p className="text-gray-400 mt-2 text-left text-sm">
                  Bitte geben Sie Ihre Zugangsdaten ein.
                </p>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="Passwort"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ 
                            color: 'gray',
                            padding: '4px',
                            marginRight: '-4px'
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{
                        color: '#d1d5db',
                        '&.Mui-checked': {
                          color: '#0f6657',
                        },
                      }}
                    />
                  }
                  label="Angemeldet bleiben"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.875rem',
                      color: '#111827',
                    },
                  }}
                />

                <button
                  type="submit"
                  className="w-[320px] bg-[#0f6657] text-white font-medium py-3 px-4 rounded-md hover:bg-[#0f6657]/90 transition-colors"
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