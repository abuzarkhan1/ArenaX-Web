import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Pill } from './primitives/Pill';
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

  return (
    <>
      <SEO
        title="Contact ArenaX - Official Esports Helpdesk"
        description="Get in touch with the official ArenaX tournament team. 24/7 support for Free Fire match inquiries, deposit assistance, and guild partnerships."
        canonical="https://marenax.site/contact"
      />

      <div className="pt-28 sm:pt-36 pb-20 bg-bg-1 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <Pill dot={true} label="24/7 PLAYER HELPDESK" />
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-text-2 mt-3 leading-relaxed">
              Have questions about a Free Fire tournament, need deposit assistance, or interested in organizing community scrims? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
            {/* Contact Channels Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="hud-card p-6 rounded-card">
                <Mail className="w-5 h-5 text-accent mb-3 stroke-[2]" />
                <h3 className="text-base font-bold font-heading text-text-1">Official Support Email</h3>
                <p className="text-xs text-text-3 font-mono mt-1 mb-3">Direct helpdesk & dispute escalation</p>
                <a
                  href="mailto:arenasupport@gmail.com"
                  className="text-sm font-bold text-accent hover:underline font-mono"
                >
                  arenasupport@gmail.com
                </a>
              </div>

              <div className="hud-card p-6 rounded-card">
                <MessageSquare className="w-5 h-5 text-accent mb-3 stroke-[2]" />
                <h3 className="text-base font-bold font-heading text-text-1">WhatsApp Live Support</h3>
                <p className="text-xs text-text-3 font-mono mt-1 mb-3">Instant answers for tournament registrations</p>
                <a
                  href="https://wa.me/+923367135319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-accent hover:underline font-mono"
                >
                  +92 336 7135319
                </a>
              </div>

              <div className="hud-card p-6 rounded-card">
                <Phone className="w-5 h-5 text-accent mb-3 stroke-[2]" />
                <h3 className="text-base font-bold font-heading text-text-1">Operational Response SLA</h3>
                <p className="text-xs text-text-3 font-mono mt-1">Ticket turnaround within 2 hours</p>
                <span className="text-xs font-mono text-text-2 block mt-2">Active: Monday – Sunday (24/7 PKT)</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 hud-card p-6 sm:p-8 rounded-card">
              <h2 className="text-2xl font-bold font-heading text-text-1 mb-2">Send Direct Message</h2>
              <p className="text-sm text-text-2 mb-6">
                Fill out the form below. Your ticket connects directly to our tournament support desk.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-control bg-accent-dim border border-line-accent flex items-start gap-3 text-accent text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-[2]" />
                  <div>
                    <span className="font-bold block">Message Prepared</span>
                    <span>Your inquiry has been queued or transferred to your email client. Our team will review promptly.</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-control bg-danger/15 border border-danger/40 flex items-start gap-3 text-danger text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-[2]" />
                  <div>
                    <span className="font-bold block">Submission Error</span>
                    <span>{errorMessage || 'Unable to submit form. Please use WhatsApp or email directly.'}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-text-3 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Asad Khan"
                      className="w-full min-h-[48px] px-4 rounded-control bg-bg-1 border border-line text-text-1 text-sm focus:border-line-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-text-3 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full min-h-[48px] px-4 rounded-control bg-bg-1 border border-line text-text-1 text-sm focus:border-line-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-text-3 mb-1.5">
                    Subject / Topic *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full min-h-[48px] px-4 rounded-control bg-bg-1 border border-line text-text-1 text-sm focus:border-line-accent focus:outline-none cursor-pointer"
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
                  <label className="block text-xs font-mono uppercase text-text-3 mb-1.5">
                    Message Description *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue or inquiry with relevant match IDs..."
                    className="w-full p-4 rounded-control bg-bg-1 border border-line text-text-1 text-sm focus:border-line-accent focus:outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={status === 'submitting'}
                  icon={<Send className="w-4 h-4 stroke-[2]" />}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
