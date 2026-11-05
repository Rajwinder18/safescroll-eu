import { SafeScrollLogo } from '@/components/marketing/SafeScrollLogo';
import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1220] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <SafeScrollLogo light />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#A1A1AA]">
            Scroll Less. Live More. Educational digital wellbeing tools with honest demo labels —
            never presented as verified device tracking or legal advice.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Product</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#A1A1AA]">
            <li><Link to="/digital-wellbeing" className="hover:text-white">Digital Wellbeing</Link></li>
            <li><Link to="/policies" className="hover:text-white">Explore Policies</Link></li>
            <li><Link to="/resources" className="hover:text-white">Research</Link></li>
            <li><Link to="/auth/sign-up" className="hover:text-white">Get Started</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Trust</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#A1A1AA]">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/app/settings/privacy" className="hover:text-white">Privacy</Link></li>
            <li>
              <a href="https://eur-lex.europa.eu/" target="_blank" rel="noreferrer" className="hover:text-white">
                EUR-Lex
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-[#A1A1AA]">
        © {new Date().getFullYear()} Safe Scroll. Sample testimonials and demo charts are labelled.
      </div>
    </footer>
  );
}
