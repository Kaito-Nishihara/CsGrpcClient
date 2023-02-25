import { grpc } from "@improbable-eng/grpc-web";
import { ServiceError } from "./protos/grpc/user_pb_service";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

type Callback = (err: ServiceError | null, data: any) => any;
type ParamRequiredCallable = (
  param: any,
  metaData: grpc.Metadata,
  callback: Callback
) => any;

export function callbackWrapper(
  callable: ParamRequiredCallable,
  param: any = new Empty()
): Promise<any> {
  return new Promise(async function (resolve, reject) {
    const metadata = new grpc.Metadata({
      Authorization: `Bearer sample`,
    });
    const callback = function (err: ServiceError | null, data: any) {
      if (err !== null) reject(err);
      else resolve(data);
    };
    callable(param, metadata, callback);
  });
}
