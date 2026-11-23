import { ArrowUpRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function OrganizerProgram() {
 return <section id="organizers" className="ax-section ax-organizers" aria-labelledby="organizer-title"><div className="ax-organizer-grid"><div><h2 id="organizer-title">Host a tournament.</h2><p>Bring your community to ArenaX.</p><Link className="ax-button" to="/contact">Contact ArenaX <ArrowUpRight size={18}/></Link></div><div className="ax-organizer-board"><div className="ax-demo-caption"><span>FOR ORGANIZERS</span><Trophy size={19}/></div>{[{name:'Set the stage',desc:'Choose a format and schedule.'},{name:'Prepare the lobby',desc:'Share entry details and room instructions.'},{name:'Finish it properly',desc:'Confirm results and next steps.'}].map((item,i)=><div className="ax-organizer-row" key={item.name}><span>0{i+1}</span><div><h3>{item.name}</h3><p>{item.desc}</p></div></div>)}</div></div></section>;
}
