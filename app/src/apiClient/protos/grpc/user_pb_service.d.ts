// package: login
// file: grpc/user.proto

import * as grpc_user_pb from "../grpc/user_pb";
import {grpc} from "@improbable-eng/grpc-web";

type userLogin = {
  readonly methodName: string;
  readonly service: typeof user;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof grpc_user_pb.LoginRequest;
  readonly responseType: typeof grpc_user_pb.LoginResponse;
};

export class user {
  static readonly serviceName: string;
  static readonly Login: userLogin;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class userClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  login(
    requestMessage: grpc_user_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: grpc_user_pb.LoginResponse|null) => void
  ): UnaryResponse;
  login(
    requestMessage: grpc_user_pb.LoginRequest,
    callback: (error: ServiceError|null, responseMessage: grpc_user_pb.LoginResponse|null) => void
  ): UnaryResponse;
}

