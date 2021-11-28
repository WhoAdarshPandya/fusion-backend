"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = exports.todoRouter = exports.chatRouter = exports.friendsRouter = exports.userRouter = exports.signUpRouter = exports.loginRouter = void 0;
var login_route_1 = require("./login.route");
Object.defineProperty(exports, "loginRouter", { enumerable: true, get: function () { return login_route_1.loginRouter; } });
var signup_route_1 = require("./signup.route");
Object.defineProperty(exports, "signUpRouter", { enumerable: true, get: function () { return signup_route_1.signUpRouter; } });
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_route_1.userRouter; } });
var friends_route_1 = require("./friends.route");
Object.defineProperty(exports, "friendsRouter", { enumerable: true, get: function () { return friends_route_1.friendsRouter; } });
var chat_route_1 = require("./chat.route");
Object.defineProperty(exports, "chatRouter", { enumerable: true, get: function () { return chat_route_1.chatRouter; } });
var todo_route_1 = require("./todo.route");
Object.defineProperty(exports, "todoRouter", { enumerable: true, get: function () { return todo_route_1.todoRouter; } });
var requests_route_1 = require("./requests.route");
Object.defineProperty(exports, "requestRouter", { enumerable: true, get: function () { return requests_route_1.requestRouter; } });
//# sourceMappingURL=index.js.map