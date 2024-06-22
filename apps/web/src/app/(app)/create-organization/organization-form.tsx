'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createOrganizationAction } from './actions'

export default function OrganizationForm() {
  const router = useRouter()
  const [{ success, message, errors }, handleSubmit, isPeding] = useFormState(
    createOrganizationAction,
    {
      onSuccess: () => {
        router.push('/')
      },
    }
  )
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input id="name" name="name" />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">Email domain</Label>
        <Input
          id="domain"
          name="domain"
          type="text"
          inputMode="url"
          placeholder="example.com"
        />

        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="items-top flex space-x-2">
          <Checkbox
            id="shouldAttachUsersByDomain"
            name="shouldAttachUsersByDomain"
          />

          <div className="grid gap-1.5 leading-none">
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              Auto-join new members
            </label>

            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization
            </p>
          </div>
        </div>

        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPeding}>
        {isPeding ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
