import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
   <div className="min-h-screen flex flex-col items-center justify-between bg-linear-to-br from-gray-900 via-gray-800 to-black text-white px-6! py-12!">
      <main className="flex flex-col items-center text-center max-w-3xl">
        {/* Logo */}
      

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 mb-4">
          Reel PWA App
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8!">
          Experience Instagram-like reels with seamless video playback, 
          background/foreground handling, and intuitive swipe navigation.
        </p>

        {/* Features Section */}
        <div className="grid sm:grid-cols-3 gap-6! mb-10! w-full">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4! hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2!">📱 PWA Ready</h3>
            <p className="text-gray-400 text-sm">
              Install on your device for a native app-like experience.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4! hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2!">🎥 Smart Video</h3>
            <p className="text-gray-400 text-sm">
              Auto-pause in background, resume when you return.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4! hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2!">👆 Touch Controls</h3>
            <p className="text-gray-400 text-sm">
              Long press to pause, swipe to navigate.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
          <Link
            href="/reels"
            className="flex items-center gap-2 w-full px-6! justify-center py-3! bg-linear-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-3xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Reels
          </Link>

          <Link
            href="/upload"
            className="flex items-center justify-center gap-2 w-full px-9! py-3! bg-linear-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-3xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
            Upload Reels
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm border-t border-gray-700 pt-4">
        <p>Built with Next.js 15 + PWA</p>
      </footer>
    </div>
  );
}