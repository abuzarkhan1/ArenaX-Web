import { ArrowUpRight, Play } from 'lucide-react';

const WATCH = 'https://www.youtube.com/watch?v=elUyN6iXPDk';

export default function ArenaFilm() {
  return (
    <section id="arena-film" className="ax-section ax-film" aria-labelledby="film-title">
      <div className="ax-film-heading">
        <h2 id="film-title">Inside Bermuda.</h2>
        <a href={WATCH} target="_blank" rel="noopener noreferrer" aria-label="Watch the official Free Fire film on YouTube">
          <Play size={17} fill="currentColor" /> Watch film <ArrowUpRight size={16} />
        </a>
      </div>
      <a className="ax-film-player" href={WATCH} target="_blank" rel="noopener noreferrer" aria-label="Open Bermuda Remastered, the official Free Fire story film on YouTube">
        <span className="ax-film-word" aria-hidden="true">BERMUDA</span>
        <img src="/hero-character-tactical.webp" alt="" width="600" height="620" loading="lazy" />
        <span className="ax-film-play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
      </a>
      <p className="ax-film-credit">Official Free Fire story film · Garena Free Fire Global</p>
    </section>
  );
}
