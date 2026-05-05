import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { RioAdobeMark } from "./Brand";

export function Footer() {
  return (
    <footer className="bg-[#1A1614] text-white pt-20 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-2 group">
              <img 
              src="https://rioadobe.com/RA-Red.gif" 
              alt="Rio Adobe" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />

            </Link>
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-60 mt-1">Southwest Cafe · Est. 2007</p>

            <p className="font-body text-sm text-white/60 mt-6 leading-relaxed">
              Authentic Southwestern Mexican fare in the heart of Cupertino since 2007.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition"><Facebook size={16} /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition"><Instagram size={16} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-xs font-bold uppercase tracking-[0.25em] mb-5 text-white/90">Explore</h3>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/menu" className="text-white/55 hover:text-primary">Full Menu</Link></li>
              <li><Link to="/heritage" className="text-white/55 hover:text-primary">Heritage</Link></li>
              <li><Link to="/contact" className="text-white/55 hover:text-primary">Contact</Link></li>
              <li><a href="https://rioadobe.com/Rio_Adobe_Employment_Application.doc" target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-primary">Job Application</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-xs font-bold uppercase tracking-[0.25em] mb-5 text-white/90">Visit</h3>
            <ul className="space-y-3 font-body text-sm text-white/60">
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0 text-primary" />10525 S. De Anza Blvd #100<br/>Cupertino, CA 95014</li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /><a href="tel:4088731600" className="hover:text-primary">(408) 873-1600</a></li>
              <li className="flex items-center gap-2"><Clock size={14} className="text-primary" />Daily 11am – 9pm</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-xs font-bold uppercase tracking-[0.25em] mb-5 text-white/90">Order</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:4088731600" className="bg-primary text-on-primary text-center py-3 rounded-full font-body text-xs font-bold uppercase tracking-widest hover:opacity-90 transition">Call for Take-Out</a>
              <a href="https://www.rioadobe.com/Rio_Adobe_Menu.pdf" target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-primary text-center font-body text-xs uppercase tracking-widest pt-2">Download Menu PDF</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">© {new Date().getFullYear()} Rio Adobe Southwest Cafe. All rights reserved.</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">Crafted with care in Cupertino, CA</p>
        </div>
      </div>
    </footer>
  );
}
