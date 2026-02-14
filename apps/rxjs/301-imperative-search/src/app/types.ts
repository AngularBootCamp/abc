export interface ImageMetadata {
  thumbnail: string;
  title: string;
}

export interface RedditResponse {
  data: {
    children: RedditResponseChild[];
  };
}

interface RedditResponseChild {
  data?: ImageMetadata;
}
