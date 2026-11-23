import { ArrowUpRight, Download as DownloadIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { trackDownload } from '../utils/analytics';
const APK='https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk';
export default function Download() {
 return <section id="download" className="ax-section ax-download" aria-labelledby="download-title"><div className="ax-download-grid"><div><h2 id="download-title">Get ArenaX.</h2><a className="ax-button" href={APK} onClick={()=>trackDownload('ArenaX.apk','Android','2.6.0')}><DownloadIcon size={18}/> Download Android APK <ArrowUpRight size={19}/></a><div className="ax-download-meta"><span>ANDROID</span><span>VERSION 2.6.0</span></div><details className="ax-install"><summary>Installation help</summary><ol>{[{title:'Download the APK.',text:'Open the download link on your Android phone.'},{title:'Install ArenaX.',text:'Open the saved APK and follow Android’s prompts.'},{title:'Set up your player.',text:'Register and add your Free Fire player details.'}].map((step,i)=><li key={step.title}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></details></div><div className="ax-download-qr"><div><QRCodeSVG value={APK} size={172} bgColor="#d9f4e5" fgColor="#0b2113" level="M" includeMargin role="img" aria-label="Scan to download ArenaX Android APK"/></div><span>SCAN TO DOWNLOAD</span></div></div><div className="ax-download-bottom"><Link to="/faq">FAQs <ArrowUpRight size={16}/></Link><Link to="/contact">Support <ArrowUpRight size={16}/></Link></div></section>;
}

