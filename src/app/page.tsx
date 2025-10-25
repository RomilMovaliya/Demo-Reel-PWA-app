'use client';

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function Home() {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
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

        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <Link href="/reels" className={styles.primary}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Reels
          </Link>
          
          {!isLoggedIn ? (
            <Link href="/signup" className={styles.secondary}>
              Create an account
            </Link>
          ) : (
            <div className="text-center mt-4">
              <p className="text-green-600 font-medium">
                Welcome back, {user?.email}!
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Built with Next.js 15 + PWA</p>
      </footer>
    </div>
  );
}