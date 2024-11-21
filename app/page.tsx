'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '@/app/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function SplitLandingPage() {
  // Login state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/start')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred during login')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">LookBack</h1>
      </header>
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left section - Information */}
        <div className="w-1/2 p-8">
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Bienvenido a LookBack</h2>
            
            <p className="mb-4 text-gray-700">
              Lookback es una plataforma innovadora diseñada para mejorar las retrospectivas de sprint en equipos ágiles. Facilitamos la reflexión y el aprendizaje continuo a través de preguntas aleatorias y un sistema de respuestas estructurado.
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Características principales:</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li className="pl-2">Generación de preguntas aleatorias</li>
                <li className="pl-2">Selección de meses para organizar las retrospectivas</li>
                <li className="pl-2">Sistema de respuestas de miembros del equipo para fomentar la confianza</li>
                <li className="pl-2">Historial de Retrospectiva</li>
                <li className="pl-2">Análisis de Estado del Equipo</li>
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/info" className="text-blue-500 hover:underline">
                Aprende más sobre cómo LookBack puede mejorar tus retrospectivas
              </Link>
            </div>
          </div>
        </div>

        {/* Right section - Login */}
        <div className="w-1/2 bg-gray-50 p-8 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
                Sign in to your account
              </h1>

              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    disabled={loading}
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>

                <div className="text-center">
                  <Link
                    href="/register"
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Don&apos;t have an account? Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}