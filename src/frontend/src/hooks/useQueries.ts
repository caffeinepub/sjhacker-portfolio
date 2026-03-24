import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useSubmitContact() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (!actor) throw new Error("Not connected");
      await actor.submit({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
    },
  });
}
