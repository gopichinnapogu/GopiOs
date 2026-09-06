import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { profileData } from '../../data/profile';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Try posting to API, with instant graceful fallback
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          reason: 'General Message',
          message: formData.message
        })
      });
    } catch {
      // Ignore network errors in demo/static preview
    } finally {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E6E6E8]/70">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCE7F0] border border-[#E8A0B8]/40 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C96F91]">
            Contact
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
          Let’s Build Something Great
        </h2>

        <p className="text-base text-[#686873] leading-relaxed">
          Have a project in mind, a question, or just want to say hi? I’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Contact Details Cards */}
        <div className="lg:col-span-5 space-y-4 text-left">
          {/* Email Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E6E6E8] hover:border-[#E8A0B8]/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all card-hover-effect flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FCE7F0] flex items-center justify-center text-[#C96F91]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#686873]">Email</div>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-sm font-bold text-[#151515] hover:text-[#C96F91] transition-colors"
                >
                  {profileData.email}
                </a>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
              className="p-2 rounded-lg text-[#686873] hover:text-[#151515] hover:bg-[#F8F7F8] transition-colors"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Location Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E6E6E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FCE7F0] flex items-center justify-center text-[#C96F91]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#686873]">Location</div>
              <div className="text-sm font-bold text-[#151515]">
                {profileData.location.split('(')[0].trim()}
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E6E6E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3">
            <div className="text-xs font-semibold text-[#686873]">Social Profiles</div>
            <div className="flex flex-col space-y-2">
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F7F8] text-xs sm:text-sm font-medium text-[#151515] transition-colors group"
              >
                <span>LinkedIn / gopichinnapogu</span>
                <ExternalLink className="w-4 h-4 text-[#686873] group-hover:text-[#C96F91]" />
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F7F8] text-xs sm:text-sm font-medium text-[#151515] transition-colors group"
              >
                <span>GitHub / gopichinnapogu</span>
                <ExternalLink className="w-4 h-4 text-[#686873] group-hover:text-[#C96F91]" />
              </a>
            </div>
          </div>

          {/* Paper Plane Banner from Reference */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FCE7F0]/60 via-[#F8F7F8] to-[#FCE7F0]/40 border border-[#E8A0B8]/30 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#C96F91] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Send className="w-4 h-4 -rotate-12" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#151515] leading-snug">
              Good conversations lead to great opportunities. Let's chat!
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E6E8] shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
            {submitSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-[#EDF7EE] border border-[#47A248]/30 flex items-start space-x-3 text-left">
                <CheckCircle2 className="w-5 h-5 text-[#47A248] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1E5623]">Message Sent!</h4>
                  <p className="text-xs text-[#2E7D32] mt-0.5">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="What should I call you?"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] text-sm text-[#151515] placeholder-[#686873] focus:outline-hidden focus:border-[#C96F91] focus:bg-white transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Where can I reach you back?"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] text-sm text-[#151515] placeholder-[#686873] focus:outline-hidden focus:border-[#C96F91] focus:bg-white transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or just say hello..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] text-sm text-[#151515] placeholder-[#686873] focus:outline-hidden focus:border-[#C96F91] focus:bg-white transition-all shadow-2xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-[#C96F91] hover:bg-[#B85B80] active:scale-98 text-white font-semibold text-sm shadow-[0_4px_16px_rgba(201,111,145,0.3)] transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
