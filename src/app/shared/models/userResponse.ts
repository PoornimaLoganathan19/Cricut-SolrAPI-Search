import { User } from "src/app/shared/models/user";

export class UserResponse {
  data: User;
  technicalError: string;
  businessError: string;
}
