import AuthForm from "@/components/auth-form";

export default function Home({ searchParams }: { searchParams: { mode?: string } }) {
  const mode = searchParams?.mode || "login"

  return (
    <AuthForm mode={mode}/>
  );
}
