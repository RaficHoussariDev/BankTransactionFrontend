import { HttpStatusCode } from "@angular/common/http";

export interface ErrorData {
  messages: string[],
  httpStatus: HttpStatusCode
}
