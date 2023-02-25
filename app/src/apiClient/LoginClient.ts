import { grpc } from "@improbable-eng/grpc-web";

import { callbackWrapper } from "./CallbackWrapper";
import { userClient } from "./protos/grpc/user_pb_service";
import { LoginRequest, LoginResponse } from "./protos/grpc/user_pb";

export type resultType = "COMPLETE" | "ERROR" | "INFO";

export namespace LoginClient {
  const client = new userClient(
    "https://" + window.location.hostname + ":7170",
    {
      transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
    }
  );

  export async function login(
    loginRequest: LoginRequest
  ): Promise<LoginResponse> {
    return callbackWrapper(client.login.bind(client), loginRequest);
  }
}
