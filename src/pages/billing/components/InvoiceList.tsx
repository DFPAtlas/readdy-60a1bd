import type { ClientInvoice } from '@/mocks/subscriptionData';

interface InvoiceListProps {
  invoices: ClientInvoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const statusColors: Record<string, string> = {
    paid: 'text-accent-600 bg-accent-100',
    pending: 'text-amber-600 bg-amber-100',
    failed: 'text-red-600 bg-red-100',
  };

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Invoice History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-background-200/70">
              <th className="text-left py-2 font-medium text-foreground-500">Date</th>
              <th className="text-left py-2 font-medium text-foreground-500">Description</th>
              <th className="text-right py-2 font-medium text-foreground-500">Amount</th>
              <th className="text-right py-2 font-medium text-foreground-500">Status</th>
              <th className="text-right py-2 font-medium text-foreground-500"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-background-100">
                <td className="py-2.5 text-foreground-700">{new Date(inv.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="py-2.5 text-foreground-800">{inv.description}</td>
                <td className="py-2.5 text-right font-medium text-foreground-900">£{inv.amount.toFixed(2)}</td>
                <td className="py-2.5 text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[inv.status]}`}>{inv.status}</span>
                </td>
                <td className="py-2.5 text-right">
                  <button className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer whitespace-nowrap">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}