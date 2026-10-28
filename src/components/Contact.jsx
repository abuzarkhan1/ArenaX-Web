import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, Facebook, Instagram, Youtube, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-[#101214] relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              24/7 Player Support Desk
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 font-heading tracking-tight">
            Get in <span className="text-[#00C878]">Touch</span>
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            Have questions about a Free Fire tournament, need deposit assistance, or interested in organizing community scrims? We are here to help.
          </p>
        </div>

        {/* 3 Contact Channels */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="premium-card p-6 sm:p-8 rounded-3xl text-center group">
            <div className="w-14 h-14 bg-[#00C878]/15 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00C878]/30 group-hover:scale-110 transition-transform shadow-md">
              <Mail className="w-7 h-7 text-[#00C878]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-heading">Official Email</h3>
            <p className="text-[#A1A1AA] mb-4 text-xs">Direct support & tournament help</p>
            <a
              href="mailto:arenasupport@gmail.com"
              className="text-[#00C878] hover:underline font-bold text-sm block"
            >
              arenasupport@gmail.com
            </a>
          </div>

          <div className="premium-card p-6 sm:p-8 rounded-3xl text-center group">
            <div className="w-14 h-14 bg-[#00D2FF]/15 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00D2FF]/30 group-hover:scale-110 transition-transform shadow-md">
              <Phone className="w-7 h-7 text-[#00D2FF]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-heading">WhatsApp Helpline</h3>
            <p className="text-[#A1A1AA] mb-4 text-xs">Mon–Sat, 9:00 AM to 6:00 PM PKT</p>
            <a
              href="https://wa.me/+923367135319"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D2FF] hover:underline font-bold text-sm block"
            >
              +92 336 7135319
            </a>
          </div>

          <div className="premium-card p-6 sm:p-8 rounded-3xl text-center group sm:col-span-2 md:col-span-1">
            <div className="w-14 h-14 bg-[#F59E0B]/15 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#F59E0B]/30 group-hover:scale-110 transition-transform shadow-md">
              <MessageSquare className="w-7 h-7 text-[#F59E0B]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-heading">In-App Live Chat</h3>
            <p className="text-[#A1A1AA] mb-4 text-xs">Instant match dispute resolution</p>
            <span className="text-[#F59E0B] font-bold text-sm block">
              Available in Mobile App
            </span>
          </div>
        </div>

        {/* Message Form & Business Column */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="premium-card p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">
              Send us a Message
            </h2>

            {submitted && (
              <div className="p-4 rounded-xl bg-[#00C878]/15 border border-[#00C878]/40 text-[#00C878] text-sm font-semibold flex items-center gap-2.5 mb-6 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Thank you for reaching out! Our support team will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all"
                  placeholder="e.g. Hamza Ali"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all"
                  placeholder="hamza@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all"
                  placeholder="e.g. Tournament Registration Inquiry"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 uppercase tracking-wider">
                  Message Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all resize-none"
                  placeholder="Describe your question or tournament details..."
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] bg-[#00C878] hover:bg-[#00A865] active:scale-[0.98] text-[#101214] py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00C878]/25 cursor-pointer border border-[#00C878]/40"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          </div>

          {/* Business & Social Channels */}
          <div className="space-y-6">
            <div className="premium-card p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-3 font-heading">
                Organizer & Guild Partnerships
              </h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
                Are you a Free Fire guild leader, university esports society, or content creator? Partner with ArenaX to host sponsored tournaments with customized branding and automated escrow payouts.
              </p>
              <a
                href="mailto:arenasupport@gmail.com?subject=Organizer%20Partnership"
                className="inline-flex min-h-[44px] items-center bg-white/[0.04] hover:bg-white/[0.08] text-[#00C878] px-6 py-3 rounded-xl font-bold text-xs border border-white/10 hover:border-[#00C878]/40 transition-all"
              >
                Inquire via arenasupport@gmail.com
              </a>
            </div>

            <div className="premium-card p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-2 font-heading">
                Follow ArenaX Online
              </h3>
              <p className="text-[#A1A1AA] text-xs mb-6">
                Get notified about major weekend tournaments, patch updates, and giveaway announcements:
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://www.facebook.com/share/17NfG8Syiq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/[0.04] hover:bg-[#1877F2]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#1877F2]/40 transition-all shadow-md group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#1877F2]" />
                </a>
                <a
                  href="https://www.instagram.com/arenaxbattlefield"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/[0.04] hover:bg-[#E4405F]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#E4405F]/40 transition-all shadow-md group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#E4405F]" />
                </a>
                <a
                  href="https://www.tiktok.com/@arenax_15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/[0.04] hover:bg-[#FF0050]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#FF0050]/40 transition-all shadow-md group"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#FF0050] fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@arenax_15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/[0.04] hover:bg-[#FF0000]/20 rounded-xl flex items-center justify-center border border-white/10 hover:border-[#FF0000]/40 transition-all shadow-md group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#FF0000]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
