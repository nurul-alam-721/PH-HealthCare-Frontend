"use client";

import Link from "next/link";
import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";

export default function PublicFooter() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">PH HealthCare</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A modern, intelligent healthcare management ecosystem. Easily book appointments with qualified medical specialists, request instant prescriptions, and track your clinical diagnostics history all in one secure portal.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors text-slate-400">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors text-slate-400">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors text-slate-400">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors text-slate-400">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Specialties */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Specialties</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/consultation?specialty=Cardiology" className="hover:text-white transition-colors text-slate-400">Cardiology</Link></li>
              <li><Link href="/consultation?specialty=Pediatrics" className="hover:text-white transition-colors text-slate-400">Pediatrics</Link></li>
              <li><Link href="/consultation?specialty=Neurology" className="hover:text-white transition-colors text-slate-400">Neurology</Link></li>
              <li><Link href="/consultation?specialty=Orthopedics" className="hover:text-white transition-colors text-slate-400">Orthopedics</Link></li>
              <li><Link href="/consultation?specialty=Dermatology" className="hover:text-white transition-colors text-slate-400">Dermatology</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors text-slate-400">Home</Link></li>
              <li><Link href="/consultation" className="hover:text-white transition-colors text-slate-400">Consultations</Link></li>
              <li><Link href="/diagnostics" className="hover:text-white transition-colors text-slate-400">Diagnostics</Link></li>
              <li><Link href="/health-plans" className="hover:text-white transition-colors text-slate-400">Health Plans</Link></li>
              <li><Link href="/medicine" className="hover:text-white transition-colors text-slate-400">Medicine Store</Link></li>
              <li><Link href="/ngos" className="hover:text-white transition-colors text-slate-400">NGO Partners</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Contact & Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <span className="text-slate-400">120 Healthcare Boulevard, Suite 500, Medical District, NY 10016</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors text-slate-400">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:support@ph-healthcare.com" className="hover:text-white transition-colors text-slate-400">support@ph-healthcare.com</a>
              </li>
              <li className="border-t border-slate-900 pt-3 text-xs text-slate-500">
                Support Hours: Monday - Sunday, 24/7 Availability
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PH HealthCare Management System. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
          <button 
            onClick={handleScrollToTop}
            className="p-2 rounded bg-slate-900 hover:bg-primary text-slate-400 hover:text-white transition-all shadow-md group shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
