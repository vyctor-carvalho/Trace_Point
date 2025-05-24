import { TokenPayload } from "../../utils/TokenManager";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}