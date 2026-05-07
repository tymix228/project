'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { loginSchema, type LoginValues } from '@/lib/validations'
import { SITE_NAME } from '@/lib/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginValues) {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast.success('Zalogowano!')
        router.push(redirect)
      } else {
        toast.error('Nieprawidłowe hasło')
      }
    } catch {
      toast.error('Błąd połączenia')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-5"
    >
      <h2 className="font-semibold text-gray-200 text-center">Zaloguj się</h2>

      <Input
        label="Hasło administratora"
        type="password"
        placeholder="Wpisz hasło..."
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
        Zaloguj →
      </Button>

      <p className="text-center text-xs text-gray-600">
        Hasło znajdziesz w zmiennej środowiskowej <code className="text-neon-cyan">ADMIN_KEY</code>
      </p>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gaming flex items-center justify-center text-white font-bold text-2xl font-display mx-auto mb-4">
            NF
          </div>
          <h1 className="font-display text-2xl font-bold gradient-text">{SITE_NAME}</h1>
          <p className="text-gray-500 text-sm mt-1">Panel Administratora</p>
        </div>

        <Suspense fallback={<div className="h-48 bg-dark-surface rounded-2xl animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
