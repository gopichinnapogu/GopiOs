import React, { useState } from 'react';
import { 
  Terminal, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  GitBranch, 
  Globe,
  ExternalLink,
  Inbox
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { ContactPayload } from '../../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    reason: 'Job Opportunity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [successDetails, setSuccessDetails] = useState<{
    message: string;
    mailtoUrl?: string;
    gmailWebUrl?: string;
    emailDispatched?: boolean;
    lastSentData?: ContactPayload;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    const currentPayload = { ...formData };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitStatus('success');
        setSuccessDetails({
          message: data.message || 'Message recorded successfully.',
          mailtoUrl: data.mailtoUrl,
          gmailWebUrl: data.gmailWebUrl,
          emailDispatched: data.emailDispatched,
          lastSentData: currentPayload
        });
        setFormData({ name: '', email: '', reason: 'Job Opportunity', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to transmit message. Please email directly.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Network transmission error. Please contact via direct email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const directMailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(`[Inquiry] ${formData.reason || 'Opportunity'}: from ${formData.name || 'Visitor'}`)}&body=${encodeURIComponent(formData.message ? `Hi Gopi,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})` : `Hi Gopi,\n\nI came across your portfolio and wanted to reach out regarding a software engineering opportunity.`)}`;
  const directGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}&su=${encodeURIComponent(`[Opportunity] Software Engineering: Reach Out`)}`;

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-10">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Module 08 // Verified Direct Communication Gateway</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-100 tracking-tight">
          Initiate Contact & Collaboration
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Open to software engineering roles, distributed systems collaborations, and technical discussions. Messages submitted below are logged directly and can be sent to Gopi's email instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-[#0b1120] border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100 font-display">
              Direct Contact Channels
            </h3>

            {/* Email Box */}
            <div className="p-3.5 rounded-lg bg-[#070e1b] border border-cyan-900/40 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-cyan-950 flex items-center justify-center text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Primary Email</div>
                  <div className="text-xs font-mono text-cyan-300 font-semibold">{profileData.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <a
                  href={`mailto:${profileData.email}`}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
                  title="Send Email Directly"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Availability */}
            <div className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-slate-200">Hyderabad, India (Relocation Ready)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Response SLA:</span>
                <span className="text-emerald-400">&lt; 24 Hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-cyan-400">Available for Interviews</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={directGmailUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 font-mono text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Compose in Gmail Directly</span>
                <ExternalLink className="w-3 h-3 text-cyan-400 ml-1" />
              </a>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="p-5 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Verified Profiles
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-[#070e1b] hover:bg-slate-800/80 text-slate-300 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <span>GitHub (@gopichinnapogu)</span>
                </div>
                <span className="text-slate-500 font-mono">&rarr;</span>
              </a>

              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-[#070e1b] hover:bg-slate-800/80 text-slate-300 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <span className="text-slate-500 font-mono">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-xl bg-[#0b1120] border border-cyan-900/60 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-display text-slate-100">
                Send a Direct Message
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                Direct to {profileData.email}
              </span>
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-800 text-slate-200 text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successDetails?.message || 'Message safely logged in the server inbox!'}</span>
                </div>
                
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Your message has been saved to the server message inbox. To guarantee instant personal delivery right into Gopi's Gmail inbox, you can also send it with 1-click via your email client:
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {successDetails?.gmailWebUrl && (
                    <a
                      href={successDetails.gmailWebUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-[11px] flex items-center space-x-1.5 transition-colors shadow"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail (Pre-filled)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {successDetails?.mailtoUrl && (
                    <a
                      href={successDetails.mailtoUrl}
                      className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] flex items-center space-x-1.5 transition-colors border border-slate-700"
                    >
                      <Inbox className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Send with Default Mail App</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
                <div>
                  <a
                    href={directMailtoUrl}
                    className="underline text-cyan-300 hover:text-cyan-200"
                  >
                    Click here to open your email app and send directly to {profileData.email} &rarr;
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              {/* Reason Selector */}
              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium">INQUIRY REASON</label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg bg-[#070e1b] border border-slate-800 text-slate-200 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Job Opportunity">Job Opportunity (Full-Time / Internship)</option>
                  <option value="Collaboration">Open-Source / Project Collaboration</option>
                  <option value="Project Discussion">System Architecture & Technical Discussion</option>
                  <option value="General Message">General Inquiry / Message</option>
                </select>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full p-2.5 rounded-lg bg-[#070e1b] border border-slate-800 text-slate-200 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">YOUR EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full p-2.5 rounded-lg bg-[#070e1b] border border-slate-800 text-slate-200 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message Area */}
              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium">MESSAGE BODY</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding the role, problem statement, or technical inquiry..."
                  className="w-full p-2.5 rounded-lg bg-[#070e1b] border border-slate-800 text-slate-200 focus:border-cyan-500 focus:outline-none font-sans text-xs"
                />
              </div>

              {/* Submit Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-sans text-xs sm:text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Message via Portal'}</span>
                </button>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <span>Prefer your own email client?</span>
                  <a
                    href={directMailtoUrl}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>Send via Mailto</span>
                    <ExternalLink className="w-3 h-3" />
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
