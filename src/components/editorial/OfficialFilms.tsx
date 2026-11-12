"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import { Photo } from "./Primitives";
import { editorialImages } from "@/data/editorial";

import { keralaFilms } from "@/data/films";
type Player = {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
};
type YouTubeWindow = Window & {
  YT?: {
    Player: new (node: HTMLElement, options: Record<string, unknown>) => Player;
  };
  onYouTubeIframeAPIReady?: () => void;
};
let apiPromise: Promise<void> | undefined;
function loadAPI() {
  if ((window as YouTubeWindow).YT?.Player) return Promise.resolve();
  if (!apiPromise)
    apiPromise = new Promise<void>((resolve, reject) => {
      const w = window as YouTubeWindow;
      const previous = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = undefined;
        reject(new Error("Film service unavailable"));
      };
      document.head.appendChild(script);
    });
  return apiPromise;
}

export default function OfficialFilms() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<Player>();
  const film = keralaFilms[selected];
  useEffect(() => {
    if (reduced === false && window.matchMedia("(min-width: 1024px)").matches)
      setRequested(true);
  }, [reduced]);
  useEffect(() => {
    if (!requested || !mount.current) return;
    let cancelled = false;
    setReady(false);
    setPlaying(false);
    setFailed(false);
    setMuted(true);
    // The API replaces its mount node; give every film its own disposable child.
    const node = document.createElement("div");
    mount.current.appendChild(node);
    const timeout = window.setTimeout(() => {
      if (!cancelled) setFailed(true);
    }, 18000);
    loadAPI()
      .then(() => {
        if (cancelled) return;
        player.current = new (window as YouTubeWindow).YT!.Player(node, {
          host: "https://www.youtube-nocookie.com",
          videoId: film.id,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: { target: Player }) => {
              if (cancelled) return;
              clearTimeout(timeout);
              setReady(true);
              setFailed(false);
              event.target.getIframe().title = `${film.name} — official Kerala Tourism film`;
              event.target.mute();
              event.target.playVideo();
            },
            onStateChange: (event: { data: number }) => {
              if (!cancelled) setPlaying(event.data === 1);
            },
            onError: () => {
              if (!cancelled) {
                clearTimeout(timeout);
                setFailed(true);
                setPlaying(false);
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          clearTimeout(timeout);
          setFailed(true);
        }
      });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      player.current?.destroy();
      player.current = undefined;
      node.remove();
    };
  }, [requested, film.id, film.name]);
  useEffect(() => {
    if (reduced) player.current?.pauseVideo();
  }, [reduced]);
  return (
    <div className="official-cinema">
      <div className="film-selector wrap">
        <div>
          <span className="eyebrow">KERALA, IN MOTION</span>
          <p>Two films. One extraordinary place.</p>
        </div>
        <div role="group" aria-label="Choose a Kerala Tourism film">
          {keralaFilms.map((item, i) => (
            <button
              key={item.id}
              aria-pressed={selected === i}
              onClick={() => {
                setSelected(i);
                setRequested(true);
              }}
            >
              {String(i + 1).padStart(2, "0")}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        className={`field-hero-frame official-film-frame ${ready && !failed ? "player-ready" : ""}`}
      >
        <Photo
          src={editorialImages.waterfall.src}
          alt={editorialImages.waterfall.alt}
          priority
          sizes="100vw"
          className="hero-poster"
        />
        <div
          ref={mount}
          className="official-player"
          style={{ visibility: ready && !failed ? "visible" : "hidden" }}
        />
        {(!requested || !ready || failed) && (
          <div className="film-poster-content">
            <span className="eyebrow">OFFICIAL KERALA TOURISM FILMS</span>
            <h2>
              {film.name === "Athirappilly" ? (
                <>
                  Breathe
                  <br />
                  <em>it in.</em>
                </>
              ) : (
                <>
                  Human
                  <br />
                  <em>by Nature.</em>
                </>
              )}
            </h2>
            {failed ? (
              <p>
                Playback is unavailable here. Watch the film on Kerala Tourism.
              </p>
            ) : (
              <button
                className="film-start"
                onClick={() => setRequested(true)}
                disabled={requested && !failed}
              >
                <Play size={19} />
                {requested ? "Opening the film…" : `Watch ${film.name}`}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="film-caption wrap">
        <div>
          <strong>{film.name}</strong>
          <span>{film.caption} · Film by Kerala Tourism</span>
        </div>
        <div className="film-controls">
          {ready && !failed && (
            <>
              <button
                className="icon-button"
                aria-label={
                  playing ? "Pause official film" : "Play official film"
                }
                onClick={() =>
                  playing
                    ? player.current?.pauseVideo()
                    : player.current?.playVideo()
                }
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                className="icon-button"
                aria-label={muted ? "Turn film sound on" : "Mute film sound"}
                onClick={() => {
                  if (muted) player.current?.unMute();
                  else player.current?.mute();
                  setMuted(!muted);
                }}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </>
          )}
          <a
            href={film.source}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Official film <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
