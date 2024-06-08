import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import githubIcon from '@/assets/github-icon.svg'

import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password-confirmation">Confirm your password</Label>
        <Input
          id="password-confirmation"
          name="password-confirmation"
          type="password"
        />
      </div>

      <Button type="submit" className="w-full">
        Create account
      </Button>

      <Button className="w-full" variant="link" asChild>
        <Link href="/auth/sign-in">Already registered? Sign in</Link>
      </Button>

      <Separator />

      <Button type="button" variant="outline" size="sm" className="w-full">
        <Image
          alt="GitHub icon"
          src={githubIcon}
          className="mr-2 size-4 dark:invert"
        />
        Sign up with GitHub
      </Button>
    </form>
  )
}
