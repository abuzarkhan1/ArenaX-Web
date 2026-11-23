import { ArrowUpRight, ShieldCheck, FileText, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GUIDES = [
  { number:'01', title:'Fair play', text:'Player conduct and competition rules.', href:'/fair-play', label:'Read policy', icon:ShieldCheck },
  { number:'02', title:'Refunds', text:'Cancellations and entry balance terms.', href:'/refund-policy', label:'Refund policy', icon:FileText },
  { number:'03', title:'Support', text:'Account, match, and payment questions.', href:'/contact', label:'Contact support', icon:MessageCircle },
];
export default function PlatformComparison() {
  return <section id="comparison" className="ax-section ax-trust" aria-labelledby="trust-title"><div className="ax-section-heading"><div><h2 id="trust-title">Help and policies.</h2></div></div><div className="ax-trust-grid">{GUIDES.map(guide => {const Icon=guide.icon;return <article key={guide.number}><div className="ax-trust-top"><span>{guide.number}</span><Icon size={25} strokeWidth={1}/></div><h3>{guide.title}</h3><p>{guide.text}</p><Link to={guide.href}>{guide.label}<ArrowUpRight size={17}/></Link></article>;})}</div><Link className="ax-text-link" to="/terms">Terms <ArrowUpRight size={16}/></Link></section>;
}
