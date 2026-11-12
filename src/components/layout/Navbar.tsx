"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  ChevronDown,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/types";
import Modal from "@/components/editorial/Modal";
import { Emblem } from "@/components/editorial/Primitives";

const groups = [
  {
    title: "Explore",
    links: [
      ["/destinations", "Destinations"],
      ["/experiences", "Experiences"],
    ],
  },
  {
    title: "Culture & Stories",
    links: [
      ["/gods-own-flavours", "At the Kerala table"],
      ["/events", "Festivals & gatherings"],
      ["/blog", "The journal"],
    ],
  },
  {
    title: "Visit",
    links: [
      ["/accommodation", "Places to stay"],
      ["/monsoon-mode", "The monsoon chapter"],
      ["/trip-planner", "Curated journeys"],
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [utility, setUtility] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const hasHero =
    /^\/(destinations|experiences|gods-own-flavours)\/.+/.test(pathname) ||
    pathname === "/monsoon-mode";
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  useEffect(() => {
    setMenu(false);
    setUtility(false);
    setActiveGroup(null);
  }, [pathname]);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setActiveGroup(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const label = (href: string, fallback: string) => {
    const keys: Record<string, string> = {
      "/destinations": "nav.destinations",
      "/experiences": "nav.experiences",
      "/gods-own-flavours": "nav.godsOwnFlavours",
      "/blog": "nav.blog",
      "/accommodation": "nav.accommodation",
      "/trip-planner": "nav.tripPlanner",
    };
    return language === "en" ? fallback : keys[href] ? t(keys[href]) : fallback;
  };
  return (
    <>
      <nav
        ref={navRef}
        className={`site-nav ${!hasHero || scrolled ? "nav-solid" : "nav-over-hero"} ${scrolled ? "nav-scrolled" : ""}`}
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            const group = activeGroup;
            setActiveGroup(null);
            if (group)
              navRef.current
                ?.querySelector<HTMLButtonElement>(`[data-group="${group}"]`)
                ?.focus();
          }
        }}
      >
        <div className="nav-inner">
          <Link href="/" className="wordmark">
            <Emblem />
            <span>
              kerala<span className="wordmark-note">AT ITS OWN PACE</span>
            </span>
          </Link>
          <div className="desktop-nav">
            {groups.map((group) => (
              <div className="nav-group" key={group.title}>
                <button
                  data-group={group.title}
                  className="nav-trigger"
                  aria-expanded={activeGroup === group.title}
                  aria-controls={`nav-${group.title.replaceAll(" ", "-")}`}
                  onClick={() =>
                    setActiveGroup(
                      activeGroup === group.title ? null : group.title,
                    )
                  }
                >
                  {group.title}
                  <ChevronDown size={13} />
                </button>
                {activeGroup === group.title && (
                  <div
                    className="nav-dropdown"
                    id={`nav-${group.title.replaceAll(" ", "-")}`}
                  >
                    <p className="eyebrow">
                      A LITTLE CURIOSITY GOES A LONG WAY
                    </p>
                    {group.links.map(([href, text], index) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setActiveGroup(null)}
                        aria-current={pathname === href ? "page" : undefined}
                      >
                        <span className="nav-link-index">0{index + 1}</span>
                        {label(href, text)}
                        <ArrowUpRight size={16} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="nav-actions">
            <Link className="nav-plan" href="/trip-planner">
              {label("/trip-planner", "Plan your trip")}
              <ArrowUpRight size={16} />
            </Link>
            <button
              className="icon-button utility-trigger"
              aria-label="Language and appearance"
              onClick={() => setUtility(true)}
            >
              <SlidersHorizontal size={18} />
            </button>
            <button
              className="icon-button mobile-trigger"
              aria-label="Open navigation"
              onClick={() => setMenu(true)}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </nav>
      <Modal
        open={menu}
        onClose={() => setMenu(false)}
        title="Navigation"
        className="menu-modal"
      >
        <div className="mobile-menu-groups">
          {groups.map((group, index) => (
            <section key={group.title}>
              <p className="eyebrow">
                0{index + 1} / {group.title}
              </p>
              {group.links.map(([href, text]) => (
                <Link key={href} href={href} onClick={() => setMenu(false)}>
                  {label(href, text)}
                  <ArrowUpRight size={20} />
                </Link>
              ))}
            </section>
          ))}
        </div>
        <button
          className="text-link"
          onClick={() => {
            setMenu(false);
            setUtility(true);
          }}
        >
          Language & appearance
          <SlidersHorizontal size={18} />
        </button>
      </Modal>
      <Modal
        open={utility}
        onClose={() => setUtility(false)}
        title="Make yourself at home"
      >
        <div className="utility-fields">
          <label>
            Language
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              <option value="en">English</option>
              <option value="ml">മലയാളം</option>
              <option value="hi">हिन्दी</option>
              <option value="ar">العربية</option>
            </select>
          </label>
          <label>
            Appearance
            <select
              value={resolvedTheme || "light"}
              onChange={(event) => setTheme(event.target.value)}
            >
              <option value="light">Warm daylight</option>
              <option value="dark">After dusk</option>
            </select>
          </label>
          <p className="muted">
            Navigation translations are available. Destination names and
            editorial stories retain their original language.
          </p>
        </div>
      </Modal>
    </>
  );
}
