export interface Requests {
  request_id: String;
  requests: [
    {
      req_id: String;
      req_by_id: String;
      req_for_id: String;
      date: String;
      time: String;
      name: String;
      username: String;
      user_profile: String;
    }
  ];
}
