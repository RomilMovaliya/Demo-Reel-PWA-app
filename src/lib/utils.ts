// import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export const OTP_VERIFICATION_STEP = {
//   ACCOUNT_CREATION: "account-creation",
//   RESET_PASSWORD: "reset-password",
// };

// JWT payload interface
export interface JwtPayload {
  user_id: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  is_verified?: boolean;
  is_onboarded?: boolean;
  exp: number;
  iat: number;
  [key: string]: any;
}

export const decodeJwtToken = (token: string): JwtPayload => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // // Check if token is expired
    // const currentTime = Math.floor(Date.now() / 1000);
    // if (decoded.exp < currentTime) {
    //   throw new Error("Token has expired");
    // }

    return decoded;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid JWT token: ${error.message}`);
    }
    throw new Error("Invalid JWT token");
  }
};
