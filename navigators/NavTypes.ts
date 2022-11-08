import { User } from "../src/gql/graphql";

export type TNav = {
  TabsNav: undefined;
  UploadNav: undefined;
  UploadForm: {
    id: string;
    uri: string;
  };

  Select: undefined;
  TaskPhoto: undefined;
  SelectPhoto: undefined;

  Profile: {
    id: string;
    userName: string;
  };
  Photo: {
    photoId: number;
  };
  Feed: undefined;
  Search: undefined;
  Notification: undefined;
  Me: undefined;
  Camera: undefined;
  Likes: {
    photoId?: number;
  };
  Comments: undefined;

  TabFeed: {};
  TabSearch: undefined;
  TabNotification: undefined;
  TabMe: undefined;
  TabCamera: undefined;

  Messages: undefined;
  Rooms: undefined;
  Room: {
    id: number;
    talkingTo: User;
  };
};
