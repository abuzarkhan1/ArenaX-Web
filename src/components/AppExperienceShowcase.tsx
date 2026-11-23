import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Crosshair, ShieldCheck, Trophy, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const CHAPTERS = [
  { title: 'Find your match.', label: 'DISCOVER', text: 'Choose a format and read the event details.', icon: Crosshair },
  { title: 'Get your squad ready.', label: 'PREPARE', text: 'Confirm your lineup and match instructions.', icon: Users },
  { title: 'Make your game count.', label: 'COMPETE', text: 'Play, submit your result, and review standings.', icon: Trophy },
  { title: 'Know what comes next.', label: 'RESULTS', text: 'Check your result and wallet activity.', icon: ShieldCheck },
];

export default function AppExperienceShowcase() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        root.current?.querySelectorAll('[data-journey-step]').forEach((element, index) => {
          ScrollTrigger.create({ trigger: element, start: 'top 60%', end: 'bottom 60%', onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  const previewStep = (index: number) => {
    setActive(index);
    if (window.innerWidth < 1024) root.current?.querySelector('.ax-journey-demo')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };
  return (
    <section className="ax-section ax-journey" id="app-showcase" ref={root} aria-labelledby="journey-title">
      <div className="ax-section-heading"><div><h2 id="journey-title">From lobby to leaderboard.</h2></div></div>
      <div className="ax-journey-grid">
        <div className="ax-journey-demo">
          <div className="ax-demo-caption"><span>THE PLAYER JOURNEY</span><span>0{active + 1} / 04</span></div>
          <div className="ax-device">
            <div className="ax-device-bar"><span>ARENA<span>X</span></span><span>PLAYER GUIDE</span></div>
            <div className="ax-device-screen" key={active}>
              <p className="ax-kicker">{CHAPTERS[active].label}</p>
              <h3>{['Pick your arena.', 'Your team. Ready.', 'Every point counts.', 'Your match, recorded.'][active]}</h3>
              {active === 0 && <><div className="ax-demo-match"><Crosshair size={42} strokeWidth={1} /><span>BERMUDA</span><strong>Battle Royale</strong><small>Solo · Duo · Squad</small></div><div className="ax-demo-row"><span>Clash Squad</span><strong>4v4 <ArrowUpRight size={15}/></strong></div><p className="ax-demo-help">Review the match details before joining.</p></>}
              {active === 1 && <><div className="ax-demo-team">{['YOU','02','03','04'].map((player,i) => <div key={player}><Users size={24} strokeWidth={1}/><span>{player}</span><small>{i === 0 ? 'Captain' : 'Teammate'}</small></div>)}</div><div className="ax-demo-row"><span>Player details</span><Check size={17}/></div><div className="ax-demo-row"><span>Match instructions</span><ArrowUpRight size={17}/></div><p className="ax-demo-help">Use your actual Free Fire UID and the event’s room information.</p></>}
              {active === 2 && <><div className="ax-demo-result"><Trophy size={50} strokeWidth={1}/><span>RESULTS</span><strong>Play. Submit.<br/>Review.</strong></div><div className="ax-demo-row"><span>Placement</span><span>Match result</span></div><div className="ax-demo-row"><span>Eliminations</span><span>Match result</span></div><p className="ax-demo-help">Scoring and submission requirements are set by the event rules.</p></>}
              {active === 3 && <><div className="ax-demo-wallet"><ShieldCheck size={35} strokeWidth={1}/><span>KEEP TRACK</span><strong>Clarity after<br/>the competition.</strong></div>{['Result history','Wallet activity','Withdrawal details'].map(label => <div className="ax-demo-row" key={label}><span>{label}</span><ArrowUpRight size={16}/></div>)}<p className="ax-demo-help">Review eligibility, amounts, and processing details in the app.</p></>}
            </div>
            <div className="ax-device-foot">ILLUSTRATIVE GUIDE · NOT A LIVE APP SCREEN</div>
          </div>
          <div className="ax-demo-controls" role="group" aria-label="Player journey preview">{CHAPTERS.map((chapter,i) => <button type="button" key={chapter.label} aria-label={`Preview step ${i+1}: ${chapter.label.toLowerCase()}`} aria-pressed={active === i} onClick={() => setActive(i)}>0{i+1}</button>)}</div>
        </div>
        <div className="ax-journey-steps">{CHAPTERS.map((chapter,i) => { const Icon=chapter.icon; return <article className="ax-journey-step" data-journey-step key={chapter.label} data-active={active === i}><span className="ax-step-number">0{i+1}</span><Icon size={26} strokeWidth={1}/><h3>{chapter.title}</h3><p>{chapter.text}</p><button type="button" onClick={() => previewStep(i)} aria-pressed={active === i}>View this step <ArrowUpRight size={15}/></button></article>; })}<a className="ax-text-link" href="#download">Ready for your first match? <ArrowDown size={16}/></a></div>
      </div>
    </section>
  );
}


