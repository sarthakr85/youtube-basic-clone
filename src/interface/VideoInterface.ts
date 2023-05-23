export interface VideoInterface {
  readonly postId: string;
  readonly creator: {
    name: string;
    id: string;
    handle: string;
    pic: string;
  };
  readonly comment: {
    count: number;
    commentingAllowed: boolean;
  };
  readonly reaction: {
    count: number;
    voted: boolean;
  };
  readonly submission: {
    title: string;
    description: string;
    mediaUrl: string;
    thumbnail: string;
    hyperlink: string;
    placeholderUrl: string;
  };
}
