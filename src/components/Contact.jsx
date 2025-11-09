import { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'Thank you for your message! Our team will get back to you within 24 hours.'
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00FF7F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get in <span className="text-[#00FF7F]">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Our team is
            always ready to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 hover:border-[#00FF7F]/40 transition-all text-center shadow-xl hover:shadow-[#00FF7F]/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
              <Mail className="w-10 h-10 text-[#00FF7F]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
            <p className="text-gray-400 mb-5 text-base">
              Send us an email anytime
            </p>
            <a
              href="mailto:arenasupprt@gmail.com"
              className="text-[#00FF7F] hover:text-[#00BFFF] transition-colors font-medium"
            >
              arenasupprt@gmail.com
            </a>
          </div>

          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 hover:border-[#00BFFF]/40 transition-all text-center shadow-xl hover:shadow-[#00BFFF]/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#00BFFF]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00BFFF]/30 shadow-lg shadow-[#00BFFF]/20">
              <Phone className="w-10 h-10 text-[#00BFFF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
            <p className="text-gray-400 mb-5 text-base">
              Mon-Sat, 9 AM to 6 PM IST
            </p>
            <a
              href="tel:+923367135319"
              className="text-[#00FF7F] hover:text-[#00BFFF] transition-colors font-medium"
            >
              +92 336 7135319
            </a>
          </div>

          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 hover:border-[#00FF7F]/40 transition-all text-center shadow-xl hover:shadow-[#00FF7F]/20 hover:-translate-y-2">
            <div className="w-20 h-20 bg-[#00FF7F]/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#00FF7F]/30 shadow-lg shadow-[#00FF7F]/20">
              <MessageSquare className="w-10 h-10 text-[#00FF7F]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Live Chat</h3>
            <p className="text-gray-400 mb-5 text-base">
              24/7 support available
            </p>
            <button className="text-[#00FF7F] hover:text-[#00BFFF] transition-colors font-semibold">
              Start Chat
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-3 font-medium text-base">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00FF7F]/50 transition-colors text-base"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-3 font-medium text-base">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00FF7F]/50 transition-colors text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-3 font-medium text-base">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00FF7F]/50 transition-colors text-base"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-3 font-medium text-base">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00FF7F]/50 transition-colors resize-none text-base"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00FF7F]/90 backdrop-blur-xl text-black px-8 py-5 rounded-2xl font-bold text-lg hover:bg-[#00FF7F] transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-[#00FF7F]/30 hover:shadow-[#00FF7F]/50 border border-[#00FF7F]/30 hover:scale-105"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-5">
                Business Inquiries
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-base">
                Interested in partnerships, sponsorships, or business
                collaborations? Get in touch with our business development team.
              </p>
              <a
                href="mailto:arenasupprt@gmail.com"
                className="inline-block bg-[#121212]/60 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#121212]/80 transition-colors border border-white/10 hover:border-white/20"
              >
                arenasupprt@gmail.com
              </a>
            </div>

            <div className="bg-[#1E1E1E]/40 backdrop-blur-2xl p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-5">
                Follow Us
              </h3>
              <p className="text-gray-400 mb-8 text-base">
                Stay updated with the latest tournaments and news
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-14 h-14 bg-[#0A0A0A]/60 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-[#00FF7F]/20 transition-all group border border-white/10 hover:border-[#00FF7F]/30 shadow-lg"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    📘
                  </span>
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-[#0A0A0A]/60 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-[#00BFFF]/20 transition-all group border border-white/10 hover:border-[#00BFFF]/30 shadow-lg"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    🐦
                  </span>
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-[#0A0A0A]/60 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-[#00FF7F]/20 transition-all group border border-white/10 hover:border-[#00FF7F]/30 shadow-lg"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    📸
                  </span>
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-[#0A0A0A]/60 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-[#00BFFF]/20 transition-all group border border-white/10 hover:border-[#00BFFF]/30 shadow-lg"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    💬
                  </span>
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