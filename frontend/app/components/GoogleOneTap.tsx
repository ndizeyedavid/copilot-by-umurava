"use client";

import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/lib/api/client";
import { useDispatch } from "react-redux";
import { setAuth } from "@/lib/store/authSlice";
import { useRouter } from "next/navigation";

type OneTapResponse = {
  user: any;
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
};

export default function GoogleOneTap() {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMutation = useMutation<OneTapResponse, unknown, string>({
    mutationFn: async (credential: string) => {
      const res = await api.post("/auth/google/one-tap", { credential });
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setAuth({ user: data.user, tokens: data.tokens }));
      toast.success("Logged in");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      if (!credentialResponse.credential) {
        toast.error("Missing Google credential");
        return;
      }

      loginMutation.mutate(credentialResponse.credential);
    },
    onError: () => {
      toast.error("One Tap failed");
    },
  });

  return null;
}
