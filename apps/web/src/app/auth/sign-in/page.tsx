import { SignInForm } from './sign-in-form'

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-foreground">Sign in</h1>
      <SignInForm />
    </div>
  )
}
