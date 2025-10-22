import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Reel App logo"
          width={120}
          height={120}
          priority
        />
        <h1 className={styles.title}>Reel PWA App</h1>
        <p className={styles.description}>
          Experience Instagram-like reels with seamless video playback, 
          background/foreground handling, and intuitive swipe navigation.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>📱 PWA Ready</h3>
            <p>Install on your device for native app experience</p>
          </div>
          <div className={styles.feature}>
            <h3>🎥 Smart Video</h3>
            <p>Auto-pause on background, resume on foreground</p>
          </div>
          <div className={styles.feature}>
            <h3>👆 Touch Controls</h3>
            <p>Long press to pause, swipe to navigate</p>
          </div>
        </div>

        <div className={styles.ctas}>
          <Link href="/reels" className={styles.primary}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Watch Reels
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            View Source
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Built with Next.js 15 + PWA</p>
      </footer>
    </div>
  );
}