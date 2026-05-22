import PageWrapper from "@/components/PageWrapper";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <PageWrapper>
      <section className="min-h-[calc(100vh-4rem)] px-6 py-20 flex items-center">
        <div className="max-w-md mx-auto w-full">
          <LoginForm />
        </div>
      </section>
    </PageWrapper>
  );
}
