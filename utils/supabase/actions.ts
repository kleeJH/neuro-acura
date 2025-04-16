"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthResponseStatusType } from "@common/enum";

export const signUpAction = async (formData: FormData) => {
  const supabase = await createClient();

  const origin = (await headers()).get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (!email) {
    return encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/sign-up",
      "Email is required"
    );
  }

  if (!password || !confirmPassword) {
    return encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/sign-up",
      "Password and password confirmation are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      AuthResponseStatusType.ERROR,
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
    console.error(error.code + " " + error.message);
    return encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/sign-up",
      error.message
    );
  } else {
    return encodedRedirect(
      AuthResponseStatusType.SUCCESS,
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
    return encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/sign-in",
      error.message
    );
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/forgot-password",
      "Email is required"
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    AuthResponseStatusType.SUCCESS,
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      AuthResponseStatusType.ERROR,
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect(
    AuthResponseStatusType.SUCCESS,
    "/protected/reset-password",
    "Password updated"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
