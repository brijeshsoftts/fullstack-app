import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { notifyError } from "@/lib/notification";
import { authService } from "../auth.service";
import { LoginSchema, type Login } from "../schema/login.schema";

const useLogin = () => {
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: authService.login,
    onSuccess: () => {
      window.location.href = "/profile";
    },
    onError: notifyError,
  });
};

export const useLoginFacade = () => {
  const { mutate, isPending, isSuccess } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  return {
    submit: (data: Login) => mutate(data),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
  };
};
