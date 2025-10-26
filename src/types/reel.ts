export interface  ReelData {
  updated_at: string;
  created_at: string;
  likes: number;
  profile_image_url: string;
  uuid: string;
  views: number;
  username: string;
  video_url: string;
  description: string;
  tags: string[];
  shares: number;
}
        

export interface VideoPlayerProps {
  reel: ReelData;
  isActive: boolean;
  onVideoEnd?: () => void;
}

export interface ReelItemProps extends VideoPlayerProps {
  index: number;
}