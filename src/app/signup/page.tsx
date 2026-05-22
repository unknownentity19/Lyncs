import PageWrapper from "@/components/PageWrapper";
import SignupForm from "@/components/SignupForm";

const plans = ["starter", "pro", "power"] as const;
const billingOptions = ["monthly", "annual"] as const;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{
    plan?: string | string[];
    billing?: string | string[];
    surface?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const planParam = firstParam(params.plan)?.toLowerCase();
  const billingParam = firstParam(params.billing)?.toLowerCase();
  const surfaceParam = firstParam(params.surface);
  const selectedPlan = plans.includes(planParam as (typeof plans)[number])
    ? planParam
    : "starter";
  const selectedBilling = billingOptions.includes(
    billingParam as (typeof billingOptions)[number]
  )
    ? billingParam
    : "monthly";

  return (
    <PageWrapper>
      <section className="min-h-[calc(100vh-4rem)] px-6 py-20 flex items-center">
        <div className="max-w-md mx-auto w-full">
          <SignupForm
            selectedPlan={selectedPlan ?? "starter"}
            selectedBilling={selectedBilling ?? "monthly"}
            surface={surfaceParam}
          />
        </div>
      </section>
    </PageWrapper>
  );
}
