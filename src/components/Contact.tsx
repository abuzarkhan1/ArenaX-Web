import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './primitives/Button';
import { SEO } from './SEO';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Server returned an error status.');
        }
      } catch (err: unknown) {
        setStatus('error');
        setErrorMessage(
          err instanceof Error ? err.message : 'Unable to transmit message. Please use WhatsApp or email directly.'
        );
      }
    } else {
      // Direct mailto fallback when no external webhook is configured
      const mailtoUrl = `mailto:arenasupport@gmail.com?subject=${encodeURIComponent(
        `[ArenaX Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClassName =
    'w-full h-[44px] px-3.5 rounded-md bg-[#121212] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm placeholder:text-[#707070] transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20 focus:outline-none';

  return (
    <>
      <SEO
        title="Contact ArenaX - Official Esports Helpdesk"
        description="Get in touch with the official ArenaX tournament team. 24/7 support for Free Fire match inquiries, deposit assistance, and guild partnerships."
        canonical="https://marenax.site/contact"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-20 sm:pt-36">
        {/* Supabase ambient atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-16 h-72 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
              Get in <span className="text-[#3ECF8E]">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A0A0] mt-3 leading-relaxed">
              Have questions about a Free Fire tournament, need deposit assistance, or interested in organizing community scrims? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            {/* Contact Channels (3 Carbon Cards) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="group relative overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0] font-medium">Email Support</h3>
                    <a
                      href="mailto:arenasupport@gmail.com"
                      className="inline-block text-sm font-semibold font-mono tracking-tight tabular-nums text-[#3ECF8E] hover:text-[#34B27B] transition-colors mt-1 break-all"
                    >
                      arenasupport@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0] font-medium">WhatsApp Live Support</h3>
                    <a
                      href="https://wa.me/+923367135319"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-semibold font-mono tracking-tight tabular-nums text-[#3ECF8E] hover:text-[#34B27B] transition-colors mt-1"
                    >
                      +92 336 7135319
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0] font-medium">Helpdesk Availability</h3>
                    <span className="text-xs font-mono text-[#EDEDED] block mt-1 tracking-tight tabular-nums">
                      Monday – Sunday (24/7 PKT)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Container (Supabase Carbon Surface) */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-[#171717] border border-white/[0.08] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)]">
              <h2 className="text-2xl font-bold font-heading text-[#EDEDED] mb-2">Send Direct Message</h2>
              <p className="text-sm text-[#A0A0A0] mb-6 leading-relaxed">
                Fill out the form below. Your ticket connects directly to our tournament support desk.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-start gap-3 text-[#3ECF8E] text-sm shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold block">Message Prepared</span>
                    <span className="text-[#A0A0A0]">Your inquiry has been queued or transferred to your email client. Our team will review promptly.</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-[#1F0A0A] border border-red-500/30 flex items-start gap-3 text-red-400 text-sm shadow-[inset_0_1px_0_rgba(239,68,68,0.15)]">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold block">Submission Error</span>
                    <span>{errorMessage || 'Unable to submit form. Please use WhatsApp or email directly.'}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Asad Khan"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                    Subject / Topic *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClassName} cursor-pointer [&>option]:bg-[#171717] [&>option]:text-[#EDEDED]`}
                  >
                    <option value="">Select a topic</option>
                    <option value="Deposit & Wallet Issue">Deposit & Wallet Issue</option>
                    <option value="Tournament Scoreboard Dispute">Tournament Scoreboard Dispute</option>
                    <option value="Organizer Application">Organizer Application</option>
                    <option value="UID Verification Help">UID Verification Help</option>
                    <option value="Other">Other Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                    Message Description *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue or inquiry with relevant match IDs..."
                    className="w-full px-3.5 py-3 rounded-md bg-[#121212] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm placeholder:text-[#707070] transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={status === 'submitting'}
                    icon={<Send className="w-4 h-4" strokeWidth={1.5} />}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
