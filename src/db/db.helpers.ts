import { Document } from "mongoose";
import {
  chatModel,
  friendListModel,
  requestsModel,
  todoModel,
  User,
  userModel,
} from "../models";
import { v4 } from "uuid";

export const findUserByEmailOrUserName = async (data: any) => {
  let result: any = { res: [], success: false };
  if (data.type === "email") {
    await userModel.find({ email: data.value }, (err, res) => {
      if (err) {
        result = { err, success: false };
      } else {
        result = { res, success: true, count: res.length };
      }
    });
  } else if (data.type === "user_name") {
    await userModel.find({ user_name: data.value }, (err, res) => {
      if (err) {
        result = { err, success: false };
      } else {
        result = { res, success: true, count: res.length };
      }
    });
  } else {
    await userModel.find(
      {
        $or: [{ email: data.value.email }, { user_name: data.value.user_name }],
      },
      (err, res) => {
        if (err) {
          result = { err, success: false };
        } else {
          result = { res, success: true, count: res.length };
        }
      }
    );
  }
  return result;
};

export const insertUser = async (data: {
  name: string;
  user_name: string;
  email: string;
  password: string;
  profile_url: string;
  joined_at: string;
}) => {
  const user_id = v4();
  const todo_id = v4();
  const request_id = v4();
  const chat_id = v4();
  const friend_id = v4();
  const user: Document<User> = new userModel({
    user_id,
    name: data.name,
    user_name: data.user_name,
    email: data.email,
    friend_id,
    chat_id,
    todo_id,
    request_id,
    theme: "orange",
    password: data.password,
    profile_url: data.profile_url,
    joined_at: data.joined_at,
    dnd: false,
    notification: true,
  });
  const resp = await user
    .save()
    .then((res) => ({ msg: "inserted", success: true, res }))
    .catch((err) => ({ msg: "inserted", success: false, err }));
  await todoModel.insertMany([{ todo_id }]);
  await friendListModel.insertMany([{ friend_id }]);
  await requestsModel.insertMany([{ request_id }]);
  await chatModel.insertMany([{ chat_id }]);

  return resp;
};

export const insertTodo = async (data: {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isStarred: boolean;
  color: string;
}) => {
  const { id, isStarred, title, description, date, time, color } = data;
  const todo = { title, description, data, time, color, isStarred };
  const resp = await todoModel
    .updateMany({ todo_id: id }, { $push: { todos: todo } })
    .then((result) => ({ success: true, result }))
    .catch((err) => ({ success: false, err }));
  return resp;
};

export const insertFriend = async (data: {
  id: string;
  user_id: string;
  friendship_id: string;
  date: string;
  time: string;
}) => {
  const { id, user_id, friendship_id, date, time } = data;
  const friend = { id, user_id, friendship_id, date, time };
  const resp = await friendListModel
    .updateMany({ friend_id: id }, { $push: { friends: friend } })
    .then((result) => ({ success: true, result }))
    .catch((err) => ({ success: false, err }));
  return resp;
};

export const insertRequest = async (data: {
  id: string;
  req_id: string;
  req_for_id: string;
  date: string;
  time: string;
  username: string;
  user_profile: string;
}) => {
  const { id, req_id, req_for_id, date, time, username, user_profile } = data;
  const request = { req_id, req_for_id, date, time, username, user_profile };
  const resp = await requestsModel
    .updateMany({ request_id: id }, { $push: { requests: request } })
    .then((result) => ({ success: true, result }))
    .catch((err) => ({ success: false, err }));
  return resp;
};

export const insertChat = async (data: {
  id: string;
  chat_id: string;
  msg: string;
  sender_id: string;
  receiver_id: string;
  friendship_id: string;
  date: string;
  time: string;
}) => {
  const {
    id,
    chat_id,
    msg,
    sender_id,
    receiver_id,
    friendship_id,
    date,
    time,
  } = data;
  const chat = {
    chat_id,
    msg,
    sender_id,
    receiver_id,
    friendship_id,
    date,
    time,
  };
  const resp = await chatModel
    .updateMany({ chat_id: id }, { $push: { chats: chat } })
    .then((result) => ({ success: true, result }))
    .catch((err) => ({ success: false, err }));
  return resp;
};

export const getAllUserData = async (id: string) => {
  const data = await userModel
    .find({ user_id: id })
    .lean()
    .then((result) => {
      return { success: true, result };
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const getAllTodos = async (id: string) => {
  const data = await todoModel
    .find({ todo_id: id })
    .lean()
    .then((result) => {
      return { success: true, result };
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const getAllFriends = async (id: string) => {
  const data = await friendListModel
    .find({ friend_id: id })
    .lean()
    .then((result) => {
      console.log(result);
      return { success: true, result };
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const getAllRequests = async (id: string) => {
  const data = await requestsModel
    .find({ request_id: id })
    .lean()
    .then((result) => {
      return { success: true, result };
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const getAllChats = async (id: string) => {
  const data = await chatModel
    .find({ chat_id: id })
    .lean()
    .then((result) => {
      return { success: true, result };
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const deleteUser = async (id: string) => {
  const data = await userModel
    .deleteOne({ user_id: id })
    .then((result) => {
      if (result.deletedCount! > 0) {
        console.log("deleted" + result.deletedCount);
        return { success: true, count: result.deletedCount };
      } else {
        return { success: true, msg: "not deleted" };
      }
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const deleteFriend = async (master_id: string, id: string) => {
  const data = await friendListModel
    .updateOne(
      { friend_id: master_id },
      { $pull: { friends: { _id: id } } },
      { multi: false }
    )
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated" + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        return { success: true, msg: "not updated" };
      }
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const deleteChat = async (master_id: string, id: string) => {
  const data = await chatModel
    .updateOne(
      { chat_id: master_id },
      { $pull: { chats: { _id: id } } },
      { multi: false }
    )
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated chat: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        return { success: true, msg: "not updated chat" };
      }
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const deleteTodo = async (todo_master_id: string, id: string) => {
  const data = await todoModel
    .updateOne(
      { todo_id: todo_master_id },
      { $pull: { todos: { _id: id } } },
      { multi: false }
    )
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated todo: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated todo" };
      }
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const deleteRequest = async (request_master_id: string, id: string) => {
  const data = await requestsModel
    .updateOne(
      { request_id: request_master_id },
      { $pull: { requests: { _id: id } } },
      { multi: false }
    )
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated todo: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated request" };
      }
    })
    .catch((err) => ({ err, success: false }));
  return data;
};

export const updateTodo = async (
  todo_id: string,
  id: string,
  title: string,
  description: string,
  color: string,
  isStarred: boolean,
  time: string
) => {
  const data = await todoModel
    .updateOne(
      { todo_id: todo_id, "todos._id": id },
      {
        $set: {
          "todos.$._id": id,
          "todos.$.title": title,
          "todos.$.description": description,
          "todos.$.color": color,
          "todos.$.time": time,
          "todos.$.isStarred": isStarred,
        },
      }
    )
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated todo: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated todo" };
      }
    })
    .catch((err) => ({ success: false, err }));
  return data;
};

export const updateUserInfo = async (
  id: string,
  name: string,
  user_name: string,
  theme: string,
  email: string
) => {
  const data = await userModel
    .updateOne(
      { user_id: id },
      { $set: { name: name, user_name: user_name, theme: theme, email: email } }
    )
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated user info: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated user info" };
      }
    });
  return data;
};

export const updateUserProfile = async (id: string, url: string) => {
  const data = await userModel
    .updateOne({ user_id: id }, { $set: { profile_url: url } })
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated image: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated image" };
      }
    });
  return data;
};

export const updateUserNotification = async (
  id: string,
  notification: boolean
) => {
  const data = await userModel
    .updateOne({ user_id: id }, { $set: { notification: notification } })
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated notification: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated notification" };
      }
    });
  return data;
};

export const updateUserDND = async (id: string, DND: boolean) => {
  const data = await userModel
    .updateOne({ user_id: id }, { $set: { dnd: DND } })
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated dnd: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated dnd" };
      }
    });
  return data;
};

export const updatePassword = async (id: string, newPass: string) => {
  const data = await userModel
    .updateOne({ user_id: id }, { $set: { password: newPass } })
    .lean()
    .then((result) => {
      if (result.nModified) {
        console.log("updated password: " + result.nModified);
        return { success: true, count: result.nModified };
      } else {
        console.log(result.nModified);
        return { success: true, msg: "not updated password" };
      }
    });
  return data;
};
