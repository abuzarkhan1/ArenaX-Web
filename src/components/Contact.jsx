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
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF7F] to-[#00BFFF]">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is
            always ready to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] hover:border-[#00FF7F]/50 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
            <p className="text-gray-400 mb-4">
              Send us an email anytime
            </p>
            <a
              href="mailto:support@arenax.com"
              className="text-[#00FF7F] hover:text-[#00BFFF] transition-colors"
            >
              arenasupprt@gmail.com
            </a>
          </div>

          <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] hover:border-[#00BFFF]/50 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
            <p className="text-gray-400 mb-4">
              Mon-Sat, 9 AM to 6 PM IST
            </p>
            <a
              href="tel:+911234567890"
              className="text-[#00FF7F] hover:text-[#00BFFF] transition-colors"
            >
              +92 336 7135319
            </a>
          </div>

          <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-[#2A2A2A] hover:border-[#00FF7F]/50 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FF6B6B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
            <p className="text-gray-400 mb-4">
              24/7 support available
            </p>
            <button className="text-[#00FF7F] hover:text-[#00BFFF] transition-colors font-semibold">
              Start Chat
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#1E1E1E] p-8 md:p-10 rounded-3xl border border-[#2A2A2A]">
            <h2 className="text-3xl font-bold text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF7F] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF7F] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF7F] transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF7F] transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00BFFF] text-black px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00FF7F]/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1E1E1E] p-8 md:p-10 rounded-3xl border border-[#2A2A2A]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00FF7F] to-[#00BFFF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#00FF7F]/10 to-[#00BFFF]/10 p-8 md:p-10 rounded-3xl border border-[#2A2A2A]">
              <h3 className="text-2xl font-bold text-white mb-4">
                Business Inquiries
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Interested in partnerships, sponsorships, or business
                collaborations? Get in touch with our business development team.
              </p>
              <a
                href="mailto:business@arenax.com"
                className="inline-block bg-[#1E1E1E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A2A2A] transition-colors border border-[#2A2A2A]"
              >
                arenasupprt@gmail.com
              </a>
            </div>

            <div className="bg-[#1E1E1E] p-8 md:p-10 rounded-3xl border border-[#2A2A2A]">
              <h3 className="text-2xl font-bold text-white mb-4">
                Follow Us
              </h3>
              <p className="text-gray-400 mb-6">
                Stay updated with the latest tournaments and news
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center hover:bg-[#00FF7F] transition-colors group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    📘
                  </span>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center hover:bg-[#00BFFF] transition-colors group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    🐦
                  </span>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center hover:bg-[#FF6B6B] transition-colors group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    📸
                  </span>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
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
