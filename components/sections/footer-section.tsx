"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ArrowUp,
  Send,
  Shield,
  FileText,
  ScrollText,
} from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Our Fleet", href: "/fleet" },
    { label: "Features", href: "/features" },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
  ],
  about: [
    { label: "About Us", href: "/#about" },
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/pricing" },
  ],
  service: [
    { label: "FAQ", href: "#" },
    { label: "Booking", href: "/fleet" },
    { label: "Cancellation", href: "#" },
    { label: "Support", href: "/pricing" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook, hoverColor: "hover:text-blue-500 hover:border-blue-500" },
  { label: "Instagram", href: "#", icon: Instagram, hoverColor: "hover:text-pink-500 hover:border-pink-500" },
  { label: "X", href: "#", icon: Twitter, hoverColor: "hover:text-sky-400 hover:border-sky-400" },
  { label: "YouTube", href: "#", icon: Youtube, hoverColor: "hover:text-red-500 hover:border-red-500" },
  { label: "LinkedIn", href: "#", icon: Linkedin, hoverColor: "hover:text-blue-600 hover:border-blue-600" },
];

const contactInfo = [
  { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, text: "info@rohittours.com", href: "mailto:info@rohittours.com" },
  { icon: MapPin, text: "Mumbai, Maharashtra, India", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#", icon: Shield },
  { label: "Terms of Service", href: "#", icon: FileText },
  { label: "Cookie Policy", href: "#", icon: ScrollText },
];

function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="group fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background shadow-lg transition-all hover:-translate-y-1 hover:border-foreground hover:bg-foreground hover:text-background"
    >
      <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <BackToTop />
      <footer className="relative bg-background">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        <div className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h3 className="text-lg font-semibold text-foreground">Stay in the Loop</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get exclusive deals and updates straight to your inbox.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mx-auto mt-5 flex max-w-md items-center gap-2"
            >
              <div className="relative flex-1">
                <Mail
                  size={14}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-95"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && <Send size={14} />}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 md:col-span-2 lg:col-span-2">
              <Link
                href="/"
                className="text-lg font-semibold text-foreground transition-opacity hover:opacity-70"
              >
                ROHIT TOURS & TRAVELS
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Premium car rentals for every journey. Wide selection of vehicles,
                competitive pricing, and 24/7 support.
              </p>

              <div className="mt-6 space-y-3">
                {contactInfo.map((item) => (
                  <Link
                    key={item.text}
                    href={item.href}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-all hover:text-foreground"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground">
                      <item.icon size={12} className="shrink-0" />
                    </span>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-foreground">
                  {key}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-all hover:text-foreground"
                      >
                        <ChevronRight
                          size={12}
                          className="-ml-4 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100"
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border">
          <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Rohit Tours and Travels. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:scale-110 hover:shadow-sm ${social.hoverColor}`}
                >
                  <social.icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border/50 px-6 pb-6 pt-4 md:px-12 lg:px-20">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon size={11} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
