import { DashboardHeader } from '@/components/dashboard-header';

export default function FindProviderPage() {
  return (
    <>
      <DashboardHeader title="Find a Provider" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Find a Provider</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Coming Soon
            </h3>
            <p className="text-sm text-muted-foreground">
              Our localized provider finder with smart recommendations is being built.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
