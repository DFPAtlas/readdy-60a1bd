import type { WebhookEvent } from '@/mocks/subscriptionData';

interface WebhookLogsProps {
  events: WebhookEvent[];
}

export default function WebhookLogs({ events }: WebhookLogsProps) {
  const statusColors: Record<string, string> = {
    succeeded: 'text-accent-600 bg-accent-100',
    failed: 'text-red-600 bg-red-100',
    pending: 'text-amber-600 bg-amber-100',
  };

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Stripe Webhook Logs</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-background-200/70">
              <th className="text-left py-2 font-medium text-foreground-500">Event ID</th>
              <th className="text-left py-2 font-medium text-foreground-500">Type</th>
              <th className="text-left py-2 font-medium text-foreground-500">Time</th>
              <th className="text-left py-2 font-medium text-foreground-500">Summary</th>
              <th className="text-right py-2 font-medium text-foreground-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-background-100">
                <td className="py-2 text-foreground-500 font-mono">{event.id}</td>
                <td className="py-2 text-foreground-700 font-mono text-xs">{event.type}</td>
                <td className="py-2 text-foreground-500 whitespace-nowrap">{new Date(event.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                <td className="py-2 text-foreground-800">{event.summary}</td>
                <td className="py-2 text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[event.status]}`}>{event.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}