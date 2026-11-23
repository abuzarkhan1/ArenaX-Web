import { ArrowUpRight, FileText, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  { title: 'Install ArenaX.', text: 'Download the Android app and set up your player profile.' },
  { title: 'Choose a match.', text: 'Review the schedule, entry details, and event rules.' },
  { title: 'Play and review.', text: 'Follow the room instructions, then check your recorded result.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="ax-section ax-start" aria-labelledby="start-title">
      <div className="ax-section-heading">
        <div><h2 id="start-title">How it works.</h2><a className="ax-text-link" href="#download">Get the app <ArrowUpRight size={17}/></a></div>
      </div>
      <ol className="ax-start-grid">{STEPS.map((step, i) => <li key={step.title}><span>0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      <nav className="ax-start-links" aria-label="Help and policies">
        <Link to="/fair-play"><ShieldCheck size={19}/>Fair play</Link>
        <Link to="/refund-policy"><FileText size={19}/>Refunds</Link>
        <Link to="/contact"><MessageCircle size={19}/>Support</Link>
      </nav>
    </section>
  );
}
