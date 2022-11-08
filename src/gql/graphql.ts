/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  createAt: Scalars['String'];
  id: Scalars['Int'];
  isMine: Scalars['Boolean'];
  payload: Scalars['String'];
  photo: Photo;
  updatedAt: Scalars['String'];
  user: User;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createAt: Scalars['String'];
  hashtag: Scalars['String'];
  id: Scalars['Int'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalPhotos?: Maybe<Scalars['Int']>;
  updateAt: Scalars['String'];
};


export type HashtagPhotosArgs = {
  page: Scalars['Int'];
};

export type Like = {
  __typename?: 'Like';
  createAt: Scalars['String'];
  id: Scalars['Int'];
  photo: Photo;
  updateAt: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  createAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  read: Scalars['Boolean'];
  room: Room;
  roomId?: Maybe<Scalars['Int']>;
  updateAt: Scalars['String'];
  user: User;
  userId?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<MutationResponse>;
  createComment: MutationResponse;
  deleteComment?: Maybe<MutationResponse>;
  deletePhoto?: Maybe<MutationResponse>;
  editComment?: Maybe<MutationResponse>;
  editPhoto: MutationResponse;
  editProfile?: Maybe<MutationResponse>;
  followUser?: Maybe<MutationResponse>;
  login?: Maybe<LoginResult>;
  readMessage?: Maybe<MutationResponse>;
  sendMessage?: Maybe<MutationResponse>;
  toggleLike?: Maybe<MutationResponse>;
  unfollowUser?: Maybe<MutationResponse>;
  uploadPhoto?: Maybe<Photo>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String'];
  photoId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int'];
};


export type MutationEditCommentArgs = {
  id: Scalars['Int'];
  payload: Scalars['String'];
};


export type MutationEditPhotoArgs = {
  caption: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  userName: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationToggleLikeArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  userName: Scalars['String'];
};


export type MutationUploadPhotoArgs = {
  caption?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
};

export type Photo = {
  __typename?: 'Photo';
  caption?: Maybe<Scalars['String']>;
  commentCount: Scalars['Int'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  createAt: Scalars['String'];
  file: Scalars['String'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  likes: Scalars['Int'];
  updateAt: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  searchPhotos?: Maybe<Array<Maybe<Photo>>>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  seeFeed?: Maybe<Array<Maybe<Photo>>>;
  seeFollowers: SeeFollowersQuery;
  seeFollowing?: Maybe<SeeFollowingResult>;
  seeHashtag?: Maybe<Hashtag>;
  seePhoto: Photo;
  seePhotoComments?: Maybe<Array<Maybe<Comment>>>;
  seePhotoLikes?: Maybe<Array<Maybe<User>>>;
  seeProfile?: Maybe<User>;
  seeRoom?: Maybe<Room>;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
};


export type QuerySearchPhotosArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
};


export type QuerySeeFeedArgs = {
  offset: Scalars['Int'];
};


export type QuerySeeFollowersArgs = {
  page: Scalars['Int'];
  userName: Scalars['String'];
};


export type QuerySeeFollowingArgs = {
  lastId?: InputMaybe<Scalars['Int']>;
  userName: Scalars['String'];
};


export type QuerySeeHashtagArgs = {
  hashtag: Scalars['String'];
};


export type QuerySeePhotoArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySeePhotoCommentsArgs = {
  photoId: Scalars['Int'];
};


export type QuerySeePhotoLikesArgs = {
  id: Scalars['Int'];
};


export type QuerySeeProfileArgs = {
  userName: Scalars['String'];
};


export type QuerySeeRoomArgs = {
  id: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  messages?: Maybe<Array<Maybe<Message>>>;
  unReadTotal: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SeeFollowingResult = {
  __typename?: 'SeeFollowingResult';
  error?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  roomUpdates?: Maybe<UpdateMessage>;
};


export type SubscriptionRoomUpdatesArgs = {
  id: Scalars['Int'];
};

export type UpdateMessage = {
  __typename?: 'UpdateMessage';
  createAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  read: Scalars['Boolean'];
  roomId?: Maybe<Scalars['Int']>;
  updateAt: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['String'];
  isFollowing: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  totalPhotos: Scalars['Int'];
  updateAt: Scalars['String'];
  userName: Scalars['String'];
};

export type SeeFollowersQuery = {
  __typename?: 'seeFollowersQuery';
  error?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type PhotoFragmentFragment = { __typename?: 'Photo', id: number, file: string, likes: number, commentCount: number, isLiked: boolean } & { ' $fragmentName'?: 'PhotoFragmentFragment' };

export type CommentFragmentFragment = { __typename?: 'Comment', id: number, payload: string, isMine: boolean, createAt: string, user: { __typename?: 'User', userName: string, avatar?: string | null } } & { ' $fragmentName'?: 'CommentFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', id: string, userName: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type FeedFragmentFragment = (
  { __typename?: 'Photo', caption?: string | null, commentCount: number, createAt: string, isMine: boolean, user: { __typename?: 'User', id: string, userName: string, avatar?: string | null } }
  & { ' $fragmentRefs'?: { 'PhotoFragmentFragment': PhotoFragmentFragment } }
) & { ' $fragmentName'?: 'FeedFragmentFragment' };

export type RoomPartsFragment = { __typename?: 'Room', id: number, unReadTotal: number, users?: Array<{ __typename?: 'User', avatar?: string | null, userName: string } | null> | null } & { ' $fragmentName'?: 'RoomPartsFragment' };

export type ToggleLikeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', userName: string, avatar?: string | null, totalFollowing: number, totalFollowers: number } | null };

export type SearchPhotosQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type SearchPhotosQuery = { __typename?: 'Query', searchPhotos?: Array<{ __typename?: 'Photo', id: number, file: string } | null> | null };

export type CreateAccountMutationVariables = Exact<{
  firstName: Scalars['String'];
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'MutationResponse', ok: boolean, id?: number | null, error?: string | null } | null };

export type SeeFeedQueryVariables = Exact<{
  offset: Scalars['Int'];
}>;


export type SeeFeedQuery = { __typename?: 'Query', seeFeed?: Array<(
    { __typename?: 'Photo', caption?: string | null, commentCount: number, createAt: string, isMine: boolean, user: { __typename?: 'User', id: string, userName: string, avatar?: string | null }, comments?: Array<(
      { __typename?: 'Comment' }
      & { ' $fragmentRefs'?: { 'CommentFragmentFragment': CommentFragmentFragment } }
    ) | null> | null }
    & { ' $fragmentRefs'?: { 'PhotoFragmentFragment': PhotoFragmentFragment } }
  ) | null> | null };

export type SeePhotoLikesQueryVariables = Exact<{
  seePhotoLikesId: Scalars['Int'];
}>;


export type SeePhotoLikesQuery = { __typename?: 'Query', seePhotoLikes?: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null> | null };

export type LoginMutationVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResult', ok: boolean, token?: string | null, error?: string | null } | null };

export type SeePhotoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SeePhotoQuery = { __typename?: 'Query', seePhoto: (
    { __typename?: 'Photo', caption?: string | null, user: { __typename?: 'User', id: string, userName: string, avatar?: string | null } }
    & { ' $fragmentRefs'?: { 'PhotoFragmentFragment': PhotoFragmentFragment } }
  ) };

export type SeeRoomQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SeeRoomQuery = { __typename?: 'Query', seeRoom?: { __typename?: 'Room', id: number, messages?: Array<{ __typename?: 'Message', id: number, payload: string, read: boolean, user: { __typename?: 'User', userName: string, avatar?: string | null, isMe: boolean } } | null> | null } | null };

export type SendMessageMutationVariables = Exact<{
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'MutationResponse', ok: boolean, id?: number | null, error?: string | null } | null };

export type RoomUpdatesSubscriptionVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RoomUpdatesSubscription = { __typename?: 'Subscription', roomUpdates?: { __typename?: 'UpdateMessage', id: number, payload: string, userId?: number | null, read: boolean } | null };

export type NewMessageFragment = { __typename?: 'Message', id: number, payload: string, read: boolean, user: { __typename?: 'User', userName: string, avatar?: string | null, isMe: boolean } } & { ' $fragmentName'?: 'NewMessageFragment' };

export type SeeRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeRoomsQuery = { __typename?: 'Query', seeRooms?: Array<(
    { __typename?: 'Room' }
    & { ' $fragmentRefs'?: { 'RoomPartsFragment': RoomPartsFragment } }
  ) | null> | null };

export type UploadPhotoMutationVariables = Exact<{
  file: Scalars['Upload'];
  caption?: InputMaybe<Scalars['String']>;
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto?: (
    { __typename?: 'Photo' }
    & { ' $fragmentRefs'?: { 'FeedFragmentFragment': FeedFragmentFragment } }
  ) | null };

export const CommentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<CommentFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const PhotoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Photo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]} as unknown as DocumentNode<PhotoFragmentFragment, unknown>;
export const FeedFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeedFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Photo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}}]}},...PhotoFragmentFragmentDoc.definitions]} as unknown as DocumentNode<FeedFragmentFragment, unknown>;
export const RoomPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoomParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unReadTotal"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]} as unknown as DocumentNode<RoomPartsFragment, unknown>;
export const NewMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}}]}}]} as unknown as DocumentNode<NewMessageFragment, unknown>;
export const ToggleLikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleLike"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowers"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const SearchPhotosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchPhotos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchPhotos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file"}}]}}]}}]} as unknown as DocumentNode<SearchPhotosQuery, SearchPhotosQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const SeeFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeeFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}}]}},...PhotoFragmentFragmentDoc.definitions,...CommentFragmentFragmentDoc.definitions]} as unknown as DocumentNode<SeeFeedQuery, SeeFeedQueryVariables>;
export const SeePhotoLikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seePhotoLikes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seePhotoLikesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seePhotoLikes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seePhotoLikesId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},...UserFragmentFragmentDoc.definitions]} as unknown as DocumentNode<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userName"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SeePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}},...PhotoFragmentFragmentDoc.definitions]} as unknown as DocumentNode<SeePhotoQuery, SeePhotoQueryVariables>;
export const SeeRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}}]}}]}}]}}]} as unknown as DocumentNode<SeeRoomQuery, SeeRoomQueryVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}},{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const RoomUpdatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"roomUpdates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomUpdates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"read"}}]}}]}}]} as unknown as DocumentNode<RoomUpdatesSubscription, RoomUpdatesSubscriptionVariables>;
export const SeeRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoomParts"}}]}}]}},...RoomPartsFragmentDoc.definitions]} as unknown as DocumentNode<SeeRoomsQuery, SeeRoomsQueryVariables>;
export const UploadPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"caption"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"caption"},"value":{"kind":"Variable","name":{"kind":"Name","value":"caption"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedFragment"}}]}}]}},...FeedFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UploadPhotoMutation, UploadPhotoMutationVariables>;