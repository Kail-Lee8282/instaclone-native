import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentCount
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    payload
    isMine
    createAt
    user {
      userName
      avatar
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    userName
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_FRAGMENT = gql`
  fragment FeedFragment on Photo {
    ...PhotoFragment
    user {
      id
      userName
      avatar
    }
    caption
    commentCount
    createAt
    isMine
  }

  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unReadTotal
    users {
      avatar
      userName
    }
  }
`;
