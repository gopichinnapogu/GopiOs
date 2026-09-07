import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { profileData } from '../../data/profile';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Job Opportunity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    dispatched: boolean;
    method?: string;
    message: string;
    gmailUrl?: string;
    mailtoUrl?: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getGmailUrl = (name: string, senderEmail: string, reason: string, msg: string) => {
    const subject = `[Portfolio Contact] ${reason || 'Inquiry'}: from ${name || 'Visitor'}`;
    const body = `Hi Gopi,\n\n${msg}\n\nBest regards,\n${name}\n${senderEmail}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profileData.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getMailtoUrl = (name: string, senderEmail: string, reason: string, msg: string) => {
    const subject = `[Portfolio Contact] ${reason || 'Inquiry'}: from ${name || 'Visitor'}`;
    const body = `Hi Gopi,\n\n${msg}\n\nBest regards,\n${name}\n${senderEmail}`;
    return `mailto:${encodeURIComponent(profileData.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    const gmailUrl = getGmailUrl(formData.name, formData.email, formData.reason, formData.message);
    const mailtoUrl = getMailtoUrl(formData.name, formData.email, formData.reason, formData.message);

    try {
      // 1. Primary: Submit to live backend API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setSubmitResult({
          success: true,
          dispatched: !!data.emailDispatched,
          method: data.dispatchMethod,
          message: data.emailDispatched
            ? "Your message has been delivered directly to Gopi's inbox!"
            : "Message received and logged on the server. Gopi will follow up soon.",
          gmailUrl: data.gmailWebUrl || gmailUrl,
          mailtoUrl: data.mailtoUrl || mailtoUrl
        });
        setFormData({ name: '', email: '', reason: 'Job Opportunity', message: '' });
      } else {
        // Fallback for Netlify / Static hosting: attempt Netlify form post
        const formPayload = new URLSearchParams();
        formPayload.append('form-name', 'contact');
        formPayload.append('name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('reason', formData.reason);
        formPayload.append('message', formData.message);

        try {
          await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formPayload.toString()
          });
        } catch {
          // Continue to fallback
        }

        setSubmitResult({
          success: true,
          dispatched: false,
          message: "Message submitted! You can also send a direct copy to Gopi's Gmail below for immediate receipt.",
          gmailUrl,
          mailtoUrl
        });
      }
    } catch {
      // Offline / network failure: provide instant 1-click email client fallback
      setSubmitResult({
        success: true,
        dispatched: false,
        message: "Message prepared! Click below to send directly via Gmail or your mail app.",
        gmailUrl,
        mailtoUrl
      });
    } finally {
      setIsSubmitting(false);
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
                  className="text-sm font-bold text-[#151515] hover:text-[#C96F91] transition-colors block"
                >
                  {profileData.email}
                </a>
                <div className="flex items-center space-x-2 mt-1">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profileData.email)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-[#C96F91] hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Open in Gmail</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
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
            {submitResult && (
              <div className={`mb-6 p-4 rounded-2xl border text-left ${
                submitResult.dispatched 
                  ? 'bg-[#EDF7EE] border-[#47A248]/30' 
                  : 'bg-[#FCE7F0]/60 border-[#E8A0B8]/50'
              }`}>
                <div className="flex items-start space-x-3">
                  {submitResult.dispatched ? (
                    <CheckCircle2 className="w-5 h-5 text-[#47A248] shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-[#C96F91] shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold ${
                      submitResult.dispatched ? 'text-[#1E5623]' : 'text-[#151515]'
                    }`}>
                      {submitResult.dispatched ? 'Message Dispatched to Inbox!' : 'Message Recorded!'}
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${
                      submitResult.dispatched ? 'text-[#2E7D32]' : 'text-[#686873]'
                    }`}>
                      {submitResult.message}
                    </p>

                    {/* 1-Click Direct Email Options */}
                    <div className="mt-3.5 pt-3 border-t border-black/5 flex flex-wrap items-center gap-2.5">
                      <span className="text-[11px] font-semibold text-[#686873]">
                        Prefer direct webmail?
                      </span>
                      {submitResult.gmailUrl && (
                        <a
                          href={submitResult.gmailUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6E6E8] hover:border-[#C96F91] text-xs font-semibold text-[#151515] transition-colors shadow-2xs"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#C96F91]" />
                          <span>Open in Gmail</span>
                          <ExternalLink className="w-3 h-3 text-[#686873]" />
                        </a>
                      )}
                      {submitResult.mailtoUrl && (
                        <a
                          href={submitResult.mailtoUrl}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6E6E8] hover:border-[#C96F91] text-xs font-semibold text-[#151515] transition-colors shadow-2xs"
                        >
                          <Send className="w-3.5 h-3.5 text-[#C96F91]" />
                          <span>Open Mail App</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
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
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] text-sm text-[#151515] placeholder-[#686873] focus:outline-hidden focus:border-[#C96F91] focus:bg-white transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
                  Topic / Reason
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] text-sm text-[#151515] focus:outline-hidden focus:border-[#C96F91] focus:bg-white transition-all shadow-2xs"
                >
                  <option value="Job Opportunity">Job Opportunity / Engineering Role</option>
                  <option value="Project Collaboration">Project Collaboration / Freelance</option>
                  <option value="Technical Discussion">Technical Inquiry / System Design</option>
                  <option value="Casual Greeting">General Connection &amp; Hello</option>
                </select>
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
                  placeholder="Tell me about your project, team opportunity, or what you're building..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F8] border border-[#E6E6E8] text-sm text-[#151515] placeholder-[#686873] focus:outline-hidden focus:border-[#C96F91] focus:bg-white transition-all shadow-2xs resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-[#C96F91] hover:bg-[#B85B80] active:scale-98 text-white font-semibold text-sm shadow-[0_4px_16px_rgba(201,111,145,0.3)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Dispatching Message...' : 'Send Message'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-3 text-xs text-[#686873]">
                  <span>Or directly:</span>
                  <a
                    href={getGmailUrl(formData.name, formData.email, formData.reason, formData.message)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#151515] hover:text-[#C96F91] transition-colors inline-flex items-center space-x-1"
                  >
                    <span>Gmail Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a
                    href={getMailtoUrl(formData.name, formData.email, formData.reason, formData.message)}
                    className="font-semibold text-[#151515] hover:text-[#C96F91] transition-colors"
                  >
                    Mail App
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
