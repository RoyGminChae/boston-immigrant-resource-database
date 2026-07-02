'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Play } from 'lucide-react'
import Sidebar from '@/components/marketing/Sidebar'

export default function ContactPage() {
  const [sidebarOpen] = useState(true)
  const [formData, setFormData] = useState({
    organization: '',
    firstName: '',
    lastName: '',
    preferredMethod: 'email',
    email: '',
    phone: '',
    purposeMethod: 'more-information',
    media: null as File | null,
  })

  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, media: e.dataTransfer.files[0] }))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, media: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  const handleCancel = () => {
    setFormData({
      organization: '',
      firstName: '',
      lastName: '',
      preferredMethod: 'email',
      email: '',
      phone: '',
      purposeMethod: 'more-information',
      media: null,
    })
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} activePage="Contact us" />
      <main className="flex-1 bg-white px-8 py-12 ml-52">
        <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-semibold text-[#4c8cc9]">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-6 text-sm font-medium text-[#4c8cc9]">
              Basic information
            </h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="organization" className="mb-2 block text-xs font-medium text-slate-800">
                  Organization
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Organization Name *"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="h-10 border-[#a8d0e6] bg-white text-sm placeholder:text-slate-400"
                />
              </div>

              <div>
                <Label htmlFor="firstName" className="mb-2 block text-xs font-medium text-slate-800">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="h-10 border-[#a8d0e6] bg-white text-sm placeholder:text-slate-400"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="mb-2 block text-xs font-medium text-slate-800">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="h-10 border-[#a8d0e6] bg-white text-sm placeholder:text-slate-400"
                />
              </div>

              <div>
                <Label className="mb-3 block text-xs font-medium text-slate-800">
                  Preferred Method of Contact
                </Label>
                <div className="flex gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded border border-[#a8d0e6] px-3 py-2 text-sm">
                    <input
                      type="radio"
                      name="preferredMethod"
                      value="email"
                      checked={formData.preferredMethod === 'email'}
                      onChange={(e) => handleRadioChange('preferredMethod', e.target.value)}
                      className="h-4 w-4 cursor-pointer"
                    />
                    <span className="text-slate-700">Email</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded border border-[#a8d0e6] px-3 py-2 text-sm">
                    <input
                      type="radio"
                      name="preferredMethod"
                      value="phone"
                      checked={formData.preferredMethod === 'phone'}
                      onChange={(e) => handleRadioChange('preferredMethod', e.target.value)}
                      className="h-4 w-4 cursor-pointer"
                    />
                    <span className="text-slate-700">Phone</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-800">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-10 border-[#a8d0e6] bg-white text-sm placeholder:text-slate-400"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2 block text-xs font-medium text-slate-800">
                  Phone{' '}
                  <span className="font-normal italic text-slate-500">
                    (not required, unless preferred method of contact)
                  </span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="• Email Address *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-10 border-[#a8d0e6] bg-white text-sm placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Purpose Section */}
          <div>
            <Label className="mb-3 block text-xs font-medium text-slate-800">
              Preferred Method of Contact
            </Label>
            <div className="flex gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded border border-[#a8d0e6] px-3 py-2 text-sm">
                <input
                  type="radio"
                  name="purposeMethod"
                  value="more-information"
                  checked={formData.purposeMethod === 'more-information'}
                  onChange={(e) => handleRadioChange('purposeMethod', e.target.value)}
                  className="h-4 w-4 cursor-pointer"
                />
                <span className="text-slate-700">More Information</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded border border-[#a8d0e6] px-3 py-2 text-sm">
                <input
                  type="radio"
                  name="purposeMethod"
                  value="requesting-access"
                  checked={formData.purposeMethod === 'requesting-access'}
                  onChange={(e) => handleRadioChange('purposeMethod', e.target.value)}
                  className="h-4 w-4 cursor-pointer"
                />
                <span className="text-slate-700">Requesting Access</span>
              </label>
            </div>
          </div>

          {/* Link & Media Section */}
          <div>
            <Label className="mb-3 block text-xs font-medium text-slate-800">
              Link & Media
            </Label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex min-h-28 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed transition-colors ${
                dragActive
                  ? 'border-[#4c8cc9] bg-blue-50'
                  : 'border-[#d0dce6] bg-white'
              }`}
            >
              <input
                type="file"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center gap-2 text-center"
              >
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                  />
                </svg>
                <span className="text-xs text-slate-600">
                  {formData.media
                    ? `Selected: ${formData.media.name}`
                    : 'Drag and Drop or upload media'}
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              onClick={handleCancel}
              className="h-10 rounded bg-[#4c8cc9] px-6 text-sm font-medium text-white hover:bg-[#3d6fa8]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-auto flex h-10 items-center gap-2 rounded bg-[#4c8cc9] px-6 text-sm font-medium text-white hover:bg-[#3d6fa8]"
            >
              <Play className="h-4 w-4 fill-white" />
              Submit
            </Button>
          </div>
        </form>
      </div>
    </main>
    </div>
  )
}
