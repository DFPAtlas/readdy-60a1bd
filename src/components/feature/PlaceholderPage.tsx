import DashboardShell from '@/pages/dashboard/Shell';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: string;
}

export function DashboardPlaceholder({ title, description, icon = 'ri-tools-line' }: PlaceholderPageProps) {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground-950 mb-1">{title}</h1>
      <p className="text-sm text-foreground-500 mb-6">{description || `${title} will be available after connecting to Supabase.`}</p>
      <div className="bg-background-100 border border-background-200/70 rounded-xl p-8 text-center">
        <i className={`${icon} text-3xl text-foreground-300 mb-3 block`}></i>
        <p className="text-sm text-foreground-500">This section is ready for backend connection.</p>
      </div>
    </div>
  );
}

export function AdminPlaceholder({ title, description, icon = 'ri-tools-line' }: PlaceholderPageProps) {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground-950 mb-1">{title}</h1>
      <p className="text-sm text-foreground-500 mb-6">{description || `${title} will be available after connecting to Supabase.`}</p>
      <div className="bg-background-100 border border-background-200/70 rounded-xl p-8 text-center">
        <i className={`${icon} text-3xl text-foreground-300 mb-3 block`}></i>
        <p className="text-sm text-foreground-500">This section is ready for backend connection.</p>
      </div>
    </div>
  );
}