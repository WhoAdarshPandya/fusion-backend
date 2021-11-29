"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestsController = exports.deleteRequestController = exports.addRequestController = exports.updateTodoController = exports.getTodosController = exports.deleteTodoController = exports.addTodoController = exports.getChatsController = exports.deleteChatController = exports.addChatController = exports.addFriendController = exports.getFriendsController = exports.deleteFriendController = exports.updateUserProfileController = exports.updateUserNotificationController = exports.updateUserInfoController = exports.updateUserDndController = exports.updateUserPasswordController = exports.deleteUserController = exports.userController = exports.signUpHandler = exports.loginHandler = void 0;
var login_controller_1 = require("./login.controller");
Object.defineProperty(exports, "loginHandler", { enumerable: true, get: function () { return login_controller_1.loginHandler; } });
var signup_controller_1 = require("./signup.controller");
Object.defineProperty(exports, "signUpHandler", { enumerable: true, get: function () { return signup_controller_1.signUpHandler; } });
var user_controller_1 = require("./user.controller");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return user_controller_1.userController; } });
Object.defineProperty(exports, "deleteUserController", { enumerable: true, get: function () { return user_controller_1.deleteUserController; } });
Object.defineProperty(exports, "updateUserPasswordController", { enumerable: true, get: function () { return user_controller_1.updateUserPasswordController; } });
Object.defineProperty(exports, "updateUserDndController", { enumerable: true, get: function () { return user_controller_1.updateUserDndController; } });
Object.defineProperty(exports, "updateUserInfoController", { enumerable: true, get: function () { return user_controller_1.updateUserInfoController; } });
Object.defineProperty(exports, "updateUserNotificationController", { enumerable: true, get: function () { return user_controller_1.updateUserNotificationController; } });
Object.defineProperty(exports, "updateUserProfileController", { enumerable: true, get: function () { return user_controller_1.updateUserProfileController; } });
var friends_controller_1 = require("./friends.controller");
Object.defineProperty(exports, "deleteFriendController", { enumerable: true, get: function () { return friends_controller_1.deleteFriendController; } });
Object.defineProperty(exports, "getFriendsController", { enumerable: true, get: function () { return friends_controller_1.getFriendsController; } });
Object.defineProperty(exports, "addFriendController", { enumerable: true, get: function () { return friends_controller_1.addFriendController; } });
var chat_controller_1 = require("./chat.controller");
Object.defineProperty(exports, "addChatController", { enumerable: true, get: function () { return chat_controller_1.addChatController; } });
Object.defineProperty(exports, "deleteChatController", { enumerable: true, get: function () { return chat_controller_1.deleteChatController; } });
Object.defineProperty(exports, "getChatsController", { enumerable: true, get: function () { return chat_controller_1.getChatsController; } });
var todo_controller_1 = require("./todo.controller");
Object.defineProperty(exports, "addTodoController", { enumerable: true, get: function () { return todo_controller_1.addTodoController; } });
Object.defineProperty(exports, "deleteTodoController", { enumerable: true, get: function () { return todo_controller_1.deleteTodoController; } });
Object.defineProperty(exports, "getTodosController", { enumerable: true, get: function () { return todo_controller_1.getTodosController; } });
Object.defineProperty(exports, "updateTodoController", { enumerable: true, get: function () { return todo_controller_1.updateTodoController; } });
var request_controller_1 = require("./request.controller");
Object.defineProperty(exports, "addRequestController", { enumerable: true, get: function () { return request_controller_1.addRequestController; } });
Object.defineProperty(exports, "deleteRequestController", { enumerable: true, get: function () { return request_controller_1.deleteRequestController; } });
Object.defineProperty(exports, "getRequestsController", { enumerable: true, get: function () { return request_controller_1.getRequestsController; } });
//# sourceMappingURL=index.js.map