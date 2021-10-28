export interface FriendList {
  friend_id: String;
  friends: [
    {
      user_id: String;
      friendship_id: String;
      date: String;
      time: String;
    }
  ];
}
