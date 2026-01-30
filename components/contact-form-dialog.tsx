'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

const BRAND_GREEN = '#2D4A3E'
const BRAND_LIGHT = '#D4F78E'

type ContactFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactFormDialog({ open, onOpenChange }: ContactFormDialogProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setMessage('')
    setStatus('idle')
    setErrorMessage('')
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm()
    onOpenChange(next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md border-gray-200/80 shadow-xl"
        style={{ backgroundColor: '#FAFAF9' }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-light tracking-tight"
            style={{ color: BRAND_GREEN }}
          >
            Get in touch
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Send us a message and we&apos;ll get back to you at your email.
          </DialogDescription>
        </DialogHeader>

        {status === 'success' ? (
          <div className="py-6 text-center space-y-4">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white"
              style={{ backgroundColor: BRAND_GREEN }}
              aria-hidden
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Message sent</p>
              <p className="text-sm text-gray-600 mt-1">
                Thanks for reaching out. We&apos;ll reply to {email} soon.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="text-sm font-medium hover:underline"
              style={{ color: BRAND_GREEN }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-gray-700">
                Name
              </Label>
              <Input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'sending'}
                className="bg-white border-gray-300 focus-visible:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'sending'}
                className="bg-white border-gray-300 focus-visible:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message" className="text-gray-700">
                Message
              </Label>
              <Textarea
                id="contact-message"
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === 'sending'}
                rows={4}
                className="bg-white border-gray-300 focus-visible:ring-gray-400 resize-none"
              />
            </div>

            {status === 'error' && errorMessage && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {errorMessage}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full text-gray-900 transition-all duration-200 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </button>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                disabled={status === 'sending'}
                className="px-6 py-3 text-sm font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-70"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
