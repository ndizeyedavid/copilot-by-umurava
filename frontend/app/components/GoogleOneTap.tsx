"use client";

import { useGoogleOneTapLogin } from "@react-oauth/google";

export default function GoogleOneTap() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });
    },
    onError: () => {
      console.log("One Tap failed");
    },
  });

  return null;
}
