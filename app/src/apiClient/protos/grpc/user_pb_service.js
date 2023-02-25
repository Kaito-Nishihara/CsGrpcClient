// package: login
// file: grpc/user.proto

var grpc_user_pb = require("../grpc/user_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var user = (function () {
  function user() {}
  user.serviceName = "login.user";
  return user;
}());

user.Login = {
  methodName: "Login",
  service: user,
  requestStream: false,
  responseStream: false,
  requestType: grpc_user_pb.LoginRequest,
  responseType: grpc_user_pb.LoginResponse
};

exports.user = user;

function userClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

userClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(user.Login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.userClient = userClient;

