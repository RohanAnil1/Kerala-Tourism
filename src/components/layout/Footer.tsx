import Link from "next/link";
import { Emblem } from "@/components/editorial/Primitives";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Link href="/" className="wordmark">
            <Emblem />
            <span>
              kerala<span className="wordmark-note">AT ITS OWN PACE</span>
            </span>
          </Link>
          <p>
            Made for the curious.
            <br />
            And the beautifully unhurried.
          </p>
          <div className="footer-links">
            <Link href="/destinations">
              Explore
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/gods-own-flavours">
              Taste
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/blog">
              Read
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/trip-planner">
              Plan
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <div className="footer-colophon" aria-hidden="true">
          <span>See you</span>
          <span>in Kerala.</span>
          <ArrowUpRight strokeWidth={0.7} />
        </div>
        <div className="footer-bottom">
          <p>
            Independent travel & design portfolio concept.
            <br />
            Not affiliated with Kerala Tourism or the Government of Kerala.
          </p>
          <Link href="/credits">Photography & credits ↗</Link>
          <p>
            © {new Date().getFullYear()}
            <br />A place to come back to.
          </p>
        </div>
      </div>
    </footer>
  );
}
