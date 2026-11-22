
"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { PenLineIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

interface EditProfileDialogProps {
  name: string;
  email: string;
  image?: string | null;
}

export function EditProfileDialog({
  name,
  email,
  image,
}: EditProfileDialogProps) {

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Handle profile update
  const handleUpdateUser = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const image = String(formData.get("image") || "").trim();

    // Validate name
    if (!name) {
      toast.add({
        type: "error",
        title: "Invalid Name",
        description: "Please enter your name.",
      });

      return;
    }

    setIsUpdating(true);

    try {
      // Update user profile using Better Auth
      const { data, error } = await authClient.updateUser({
        name,
        image: image || null,
      });

      if (error) {
        throw new Error(
          error.message || "Profile update failed."
        );
      }

      console.log("Updated User:", data);

      // Success toast
      toast.add({
        type: "success",
        title: "Profile Updated!",
        description:
          "Your profile information has been updated successfully.",
      });

      // Close Dialog
      setOpen(false);

      // Refresh profile after toast appears
      setTimeout(() => {
        router.refresh();
      }, 800);

    } catch (error) {
      console.error("Profile update error:", error);

      toast.add({
        type: "error",
        title: "Update Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });

    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {/* Dialog Trigger */}
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="gap-2"
          />
        }
      >
        <PenLineIcon
          aria-hidden="true"
          className="size-4"
        />

        Edit Profile
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-md">

        <form onSubmit={handleUpdateUser}>

          <DialogHeader>
            <DialogTitle>
              Edit Profile
            </DialogTitle>

            <DialogDescription>
              Update how your name and photo appear across the community.
            </DialogDescription>
          </DialogHeader>

          {/* Profile Fields */}
          <FieldGroup className="gap-4 mt-5">

            {/* Name */}
            <Field className="gap-2">

              <FieldLabel
                htmlFor="profile-name"
                className="font-semibold"
              >
                Name
              </FieldLabel>

              <Input
                id="profile-name"
                name="name"
                defaultValue={name}
                autoComplete="name"
                required
                maxLength={100}
                className="h-11 rounded-lg bg-background"
              />

            </Field>

            {/* Profile Image */}
            <Field className="gap-2">

              <FieldLabel
                htmlFor="profile-image"
                className="font-semibold"
              >
                Photo URL
              </FieldLabel>

              <Input
                id="profile-image"
                name="image"
                type="url"
                defaultValue={image ?? ""}
                placeholder="https://example.com/your-photo.jpg"
                className="h-11 rounded-lg bg-background"
              />

              <FieldDescription>
                Paste a link to a square image for the best result.
              </FieldDescription>

            </Field>

            {/* Email */}
            <Field className="gap-2">

              <FieldLabel
                htmlFor="profile-email"
                className="font-semibold"
              >
                Email
              </FieldLabel>

              <Input
                id="profile-email"
                name="email"
                value={email}
                readOnly
                disabled
                className="h-11 rounded-lg bg-muted"
              />

              <FieldDescription>
                Your sign-in email cannot be changed here.
              </FieldDescription>

            </Field>

          </FieldGroup>

          {/* Dialog Footer */}
          <DialogFooter className="mt-6">

            <DialogClose
              render={
                <Button
                  variant="outline"
                  type="button"
                  disabled={isUpdating}
                />
              }
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  );
}
