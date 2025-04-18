"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import {
  CalloutQueryParameterType,
  SupabaseAuthErrorCodes,
} from "@common/enum";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case SupabaseAuthErrorCodes.INVALID_CREDENTIALS:
      return "Incorrect username or password. Please try again.";
    case SupabaseAuthErrorCodes.EMAIL_EXISTS:
      return "Email address is already registered.";
    case SupabaseAuthErrorCodes.WEAK_PASSWORD:
      return "Password does not meet security criteria.";
    case SupabaseAuthErrorCodes.EMAIL_NOT_CONFIRMED:
      return "Please check your inbox to confirm your email.";
    case SupabaseAuthErrorCodes.USER_NOT_FOUND:
      return "No account found with this email. Please check and try again.";
    case SupabaseAuthErrorCodes.USER_BANNED:
      return "Your account has been banned. Please contact support.";
    case SupabaseAuthErrorCodes.SIGNUP_DISABLED:
      return "Sign-ups are currently disabled.";
    case SupabaseAuthErrorCodes.EMAIL_PROVIDER_DISABLED:
      return "Email sign-ups are disabled.";
    case SupabaseAuthErrorCodes.PHONE_EXISTS:
      return "Phone number already registered.";
    case SupabaseAuthErrorCodes.PHONE_NOT_CONFIRMED:
      return "Phone number is not confirmed.";
    case SupabaseAuthErrorCodes.OTP_EXPIRED:
      return "The verification code has expired. Please try again.";
    case SupabaseAuthErrorCodes.OVER_EMAIL_SEND_RATE_LIMIT:
      return "You've requested too many password resets. Please wait a few minutes and try again.";
    case SupabaseAuthErrorCodes.SAME_PASSWORD:
      return "New password cannot be the same as the old one.";
    case SupabaseAuthErrorCodes.REAUTHENTICATION_NEEDED:
      return "Please reauthenticate to change your password.";
    case SupabaseAuthErrorCodes.REAUTHENTICATION_NOT_VALID:
      return "Invalid reauthentication code.";
    case SupabaseAuthErrorCodes.MFA_VERIFICATION_FAILED:
      return "Multi-factor authentication failed. Please try again.";
    case SupabaseAuthErrorCodes.NO_AUTHORIZATION:
      return "You must be logged in to perform this action.";
    case SupabaseAuthErrorCodes.BAD_JSON:
      return "There was an error processing your request. Please try again.";
    case SupabaseAuthErrorCodes.BAD_JWT:
      return "Invalid authentication token. Please log in again.";
    case SupabaseAuthErrorCodes.REQUEST_TIMEOUT:
      return "The request timed out. Please try again later.";
    case SupabaseAuthErrorCodes.INSUFFICIENT_AAL:
      return "Your authentication level is not sufficient. Please complete the MFA challenge.";
    case SupabaseAuthErrorCodes.CAPTCHA_FAILED:
      return "CAPTCHA verification failed. Please try again.";
    case SupabaseAuthErrorCodes.REFRESH_TOKEN_NOT_FOUND:
      return "The password reset token is invalid or has expired.";
    case SupabaseAuthErrorCodes.REFRESH_TOKEN_ALREADY_USED:
      return "This password reset token has already been used.";
    default:
      return "Something went wrong. Please try again. If the problem persists, please contact support.";
  }
};

export const signUpAction = async (formData: FormData) => {
  const supabase = await createClient();

  const origin = (await headers()).get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (!email) {
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/sign-up",
      "Email is required"
    );
  }

  if (!password || !confirmPassword) {
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/sign-up",
      "Password and password confirmation are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/sign-up",
      "Please make sure your passwords match"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    const errorMessage: string = getAuthErrorMessage(error.code!);
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/sign-up",
      errorMessage
    );
  } else {
    return encodedRedirect(
      CalloutQueryParameterType.SUCCESS,
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const supabase = await createClient();

  // user data
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    const errorMessage: string = getAuthErrorMessage(error.code!);
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/sign-in",
      errorMessage
    );
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/forgot-password",
      "Email is required"
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    const errorMessage: string = getAuthErrorMessage(error.code!);
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/forgot-password",
      errorMessage
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    CalloutQueryParameterType.SUCCESS,
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/reset-password",
      "Please make sure your passwords match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    const errorMessage: string = getAuthErrorMessage(error.code!);
    return encodedRedirect(
      CalloutQueryParameterType.ERROR,
      "/reset-password",
      errorMessage
    );
  }

  return encodedRedirect(
    CalloutQueryParameterType.SUCCESS,
    "/reset-password",
    "Password updated"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  supabase.auth.signOut();
  return redirect("/");
};
