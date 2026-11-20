"use client"

import { PenLineIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface EditProfileDialogProps {
  name: string
  email: string
  image?: string | null
}

/**
 * UI shell for editing the signed-in user's name and photo. The fields are
 * prefilled from the verified session; saving is intentionally disabled until
 * the `authClient.updateUser` call is wired up — no fake success behaviour.
 */
export function EditProfileDialog({ name, email, image }: EditProfileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" className="gap-2" />}
      >
        <PenLineIcon aria-hidden="true" className="size-4" />
        Edit Profile
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update how your name and photo appear across the community.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="gap-4">
          <Field className="gap-2">
            <FieldLabel htmlFor="profile-name" className="font-semibold">
              Name
            </FieldLabel>
            <Input
              id="profile-name"
              name="name"
              defaultValue={name}
              autoComplete="name"
              className="h-11 rounded-lg bg-background"
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="profile-image" className="font-semibold">
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

          <Field className="gap-2">
            <FieldLabel htmlFor="profile-email" className="font-semibold">
              Email
            </FieldLabel>
            <Input
              id="profile-email"
              value={email}
              readOnly
              disabled
              className="h-11 rounded-lg bg-background"
            />
            <FieldDescription>Your sign-in email can&apos;t be changed here.</FieldDescription>
          </Field>
        </FieldGroup>

        <p className="text-xs text-muted-foreground">
          Saving lands in the next step — the form is ready, the update call
          isn&apos;t wired up yet.
        </p>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" type="button" />}>
            Cancel
          </DialogClose>
          <Button type="button" disabled>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
