# Reel PWA App 🎥

A modern Instagram-like reel application built with Next.js 15 and PWA capabilities. Features seamless video playback with smart background/foreground handling and intuitive touch controls.

## 🎬 Demo
Check out how it works:

![Demo Reel PWA App](https://github.com/RomilMovaliya/Demo-Reel-PWA-app/blob/main/demo_reel_app.gif)

## ✨ Features

- **📱 PWA Ready**: Install on any device for native app experience
- **🎥 Smart Video Controls**: Auto-pause on background, resume on foreground
- **👆 Touch Interactions**: Long press to pause, swipe to navigate
- **🔄 Seamless Navigation**: Smooth transitions between videos
- **📺 Full-Screen Experience**: Immersive video viewing
- **⚡ Optimized Performance**: Lazy loading and video caching
- **📱 Mobile-First Design**: Responsive and touch-friendly

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd reel-pwa-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

### Navigation
- **Swipe Up**: Next video
- **Swipe Down**: Previous video
- **Long Press**: Pause video (release to resume)
- **Tap**: Toggle play/pause
- **Keyboard**: Arrow keys for navigation

### PWA Installation
1. Visit the app in a supported browser
2. Look for the "Install" prompt or "Add to Home Screen"
3. Follow the installation steps
4. Launch from your device's home screen

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── VideoPlayer.tsx  # Main video player component
│   │   ├── ReelItem.tsx     # Individual reel item
│   │   └── ReelsContainer.tsx # Container with navigation
│   ├── reels/              # Reels page
│   │   └── page.tsx        # Main reels interface
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── hooks/
│   ├── useVideoControl.ts  # Video playback logic
│   └── useSwipeNavigation.ts # Swipe navigation logic
└── types/
    └── reel.ts            # TypeScript interfaces
```

## 🎯 Key Features Explained

### Background/Foreground Handling
The app automatically pauses videos when you switch to another app or tab, and resumes playback when you return - just like Instagram!

### Long Press Controls
Hold down on any video to pause it instantly. Release to resume playback. Perfect for taking screenshots or reading text overlays.

### Smart Video Management
Only the current video plays, while others are paused and reset. This ensures optimal performance and battery life.

### PWA Capabilities
- Offline support with service worker
- App-like experience when installed
- Video caching for better performance
- Native app feel with proper touch handling

## 🔧 Customization

### Adding Your Own Videos
Replace the sample videos in `src/app/reels/page.tsx`:

```typescript
const sampleReels: ReelData[] = [
  {
    id: '1',
    videoUrl: 'your-video-url.mp4',
    title: 'Your Video Title',
    description: 'Your description',
    author: {
      name: 'Author Name',
      username: 'username',
      avatar: 'avatar-url'
    },
    likes: 1234,
    comments: 56,
    shares: 12
  }
  // Add more videos...
];
```

### Styling
- Modify component CSS modules in `src/app/components/`
- Update global styles in `src/app/globals.css`
- Customize colors and themes in CSS custom properties

## 🛠️ Built With

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **PWA** - Progressive Web App capabilities
- **CSS Modules** - Scoped styling
- **React Hooks** - Modern React patterns

## 📦 Dependencies

- `next` - Next.js framework
- `react` - React library
- `next-pwa` - PWA functionality
- `react-swipeable` - Touch gesture handling
- `sharp` - Image optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- Your own server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Instagram Reels
- Sample videos from Google's test video collection
- Built with modern web technologies for the best user experience
