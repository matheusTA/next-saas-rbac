import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import githubIcon from '@/assets/github-icon.svg'

import Link from 'next/link'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign in with e-mail
      </Button>

      <Separator />

      <Button type="button" variant="outline" className="w-full">
        <Image
          alt="GitHub icon"
          src={githubIcon}
          className="mr-2 size-4 dark:invert"
        />
        Sign in with GitHub
      </Button>
    </form>
  )
}
