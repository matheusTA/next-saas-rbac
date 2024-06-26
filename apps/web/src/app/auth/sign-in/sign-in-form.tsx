'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import githubIcon from '@/assets/github-icon.svg'
import { useFormState } from '@/hooks/use-form-state'
import { signInWithEmailAndPassword } from './actions'
import { signInWithGithub } from '../actions'

export function SignInForm() {
  const router = useRouter()
  const [{ success, message, errors }, handleSubmit, isPeding] = useFormState(
    signInWithEmailAndPassword,
    {
      onSuccess: () => {
        router.push('/')
      },
    }
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="text" />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />

          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPeding}>
          {isPeding ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button className="w-full" variant="link" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" variant="outline" className="w-full">
          <Image
            alt="GitHub icon"
            src={githubIcon}
            className="mr-2 size-4 dark:invert"
          />
          Sign in with GitHub
        </Button>
      </form>
    </div>
  )
}
