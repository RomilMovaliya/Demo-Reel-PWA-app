export interface ReelData {
  id: string;
  videoUrl: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  author?: {
    name: string;
    avatar?: string;
    username: string;
  };
  likes?: number;
  comments?: number;
  shares?: number;
  isLiked?: boolean;
}

export interface VideoPlayerProps {
  reel: ReelData;
  isActive: boolean;
  onVideoEnd?: () => void;
}

export interface ReelItemProps extends VideoPlayerProps {
  index: number;
}