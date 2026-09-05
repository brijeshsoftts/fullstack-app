import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { notifyError } from "@/lib/notification";
import { authService } from "../auth.service";
import { RegisterSchema, type Register } from "../schema/register.schema";

const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: authService.register,
    onSuccess: (res) => {
      toast.success(res?.message || "Account created successfully.");
      navigate("/login");
    },
    onError: notifyError,
  });
};

export const useRegisterFacade = () => {
  const { mutate, isPending, isSuccess } = useRegister();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
  });

  return {
    submit: (data: Register) => mutate(data),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
  };
};
