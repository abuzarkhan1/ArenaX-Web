import { useState } from 'react';
import { ArrowUpRight, Crosshair, Swords } from 'lucide-react';
import { Reveal } from './primitives';

const FORMATS = {
  squad: { label: 'Squad', teams: '12 squads', description: 'Four players. One plan. Bring your squad into a 48-player battle royale.' },
  duo: { label: 'Duo', teams: '24 duos', description: 'Find your partner and coordinate your next move in a 48-player field.' },
  solo: { label: 'Solo', teams: '48 players', description: 'Every decision is yours. Take on the battlefield on your own.' },
};

export default function TournamentModes() {
  const [format, setFormat] = useState<keyof typeof FORMATS>('squad');
  return (
    <section id="tournaments" className="ax-section ax-competition" aria-labelledby="competition-title">
      <div className="ax-section-heading"><div><h2 id="competition-title">Choose your arena.</h2></div></div>
      <div className="ax-format-grid">
        <Reveal className="ax-format ax-format-br">
          <div className="ax-format-art" aria-hidden="true"><div className="ax-crosshair"><Crosshair strokeWidth={0.5} /></div><span className="ax-format-number">48</span><span className="ax-format-type">THE LAST TEAM STANDING.</span></div>
          <div className="ax-format-content"><h3>Bermuda</h3>
            <div className="ax-format-switch" role="group" aria-label="Bermuda team format">{(Object.keys(FORMATS) as (keyof typeof FORMATS)[]).map(key => <button key={key} type="button" aria-pressed={format === key} onClick={() => setFormat(key)}>{FORMATS[key].label}</button>)}</div>
            <div aria-live="polite"><p className="ax-format-description">{FORMATS[format].description}</p><div className="ax-format-facts"><span>{FORMATS[format].teams}</span></div></div>
            <a href="#download" className="ax-format-link">Find Bermuda matches in the app <ArrowUpRight size={19} /></a>
          </div>
        </Reveal>
        <Reveal className="ax-format ax-format-cs" delay={100}>
          <div className="ax-format-art" aria-hidden="true"><div className="ax-clash-lines" /><Swords className="ax-swords" strokeWidth={0.6} /><span className="ax-format-number">4<span>v</span>4</span><span className="ax-format-type">ONE SQUAD. EVERY ROUND.</span></div>
          <div className="ax-format-content"><h3>Clash Squad</h3><p className="ax-format-description">Two squads. Head-to-head rounds. Bring your four and make every call, trade, and comeback count.</p><div className="ax-format-facts"><span>4 players per squad</span></div><a href="#download" className="ax-format-link">Explore Clash Squad <ArrowUpRight size={19} /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
