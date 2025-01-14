import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Gradient Background */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05),transparent_50%)] animate-pulse-slower"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-delay-1">
            Let's discuss how we can help transform your digital presence and accelerate your business growth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12 animate-fade-in-delay-1">
            {/* CEO Profile */}
            <div className="bg-white/5 backdrop-blur-[10px] rounded-xl p-8 border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="https://res.cloudinary.com/dytjes69s/image/upload/v1736579806/IMG_20241214_141119_lw5fq4.jpg"
                  alt="CEO"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">Gajanand Sharma</h2>
                  <p className="text-gray-400">Digital Nomad</p>
                  <div className="flex gap-4 mt-3">
                    <a 
                      href="https://www.linkedin.com/in/gajuhere/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://x.com/const_gaju91" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://github.com/gaju91" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed space-y-4">
              {/* Gradient Title */}
              <span className="block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                🚀 Driven Software Developer & Digital Nomad
              </span>

              {/* First Paragraph */}
              <span className="block">
                Passionate about turning bold ideas into 
                <strong className="text-white"> dynamic solutions </strong> 
                that push the boundaries of technology. 
                I relish the challenges of 
                <strong className="text-white"> front-end artistry </strong> 
                and 
                <strong className="text-white"> back-end architecture</strong>, 
                shaping experiences that are both intuitive and scalable.
              </span>

              {/* Second Paragraph */}
              <span className="block">
                As an aspiring entrepreneur, I’m constantly exploring 
                <span className="font-semibold text-blue-400"> cutting-edge tech</span>, 
                adopting a 
                <em className="italic text-white/80"> user-first mindset </em> 
                to build products that truly matter. Let’s join forces and drive digital transformation together!<br />
                <br />
                Visit my website{" "}
                <a 
                  href="https://gajanand.info" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  gajanand.info
                </a>{" "}
                to explore more of my work.
              </span>
            </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <a href="mailto:hello@pragatidigital.com" className="text-gray-400 hover:text-white transition-colors">
                    gajanand742@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <a href="tel:+919875763585" className="text-gray-400 hover:text-white transition-colors">
                    +91 9875763585
                  </a>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white/5 backdrop-blur-[10px] rounded-xl p-6 border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-[10px] rounded-xl p-8 border border-white/10 animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            {/* Status Messages */}
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <p>Your message has been sent successfully!</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p>There was an error sending your message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                      errors.firstName ? 'border-red-500' : 'border-white/10 hover:border-white/20'
                    }`}
                    disabled={status === 'submitting'}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                      errors.lastName ? 'border-red-500' : 'border-white/10 hover:border-white/20'
                    }`}
                    disabled={status === 'submitting'}
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-white/10 hover:border-white/20'
                  }`}
                  disabled={status === 'submitting'}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                    errors.subject ? 'border-red-500' : 'border-white/10 hover:border-white/20'
                  }`}
                  disabled={status === 'submitting'}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 ${
                    errors.message ? 'border-red-500' : 'border-white/10 hover:border-white/20'
                  }`}
                  disabled={status === 'submitting'}
                  aria-invalid={errors.message ? 'true' : 'false'}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="nav-button group w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center">
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}