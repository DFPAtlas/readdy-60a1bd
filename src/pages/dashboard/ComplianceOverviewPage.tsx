import { useState } from 'react';
import { Link } from 'react-router-dom';
import { complianceOverviewCards, complianceChecklistItems } from '@/mocks/complianceData';
import { getComplianceReadinessScore } from '@/services/complianceService';

const statusBadgeClasses: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  enabled: 'bg-emerald-100 text-emerald-800',
  needs_review: 'bg-amber-100 text-amber-800',
  draft: 'bg-secondary-100 text-secondary-800',
  disabled: 'bg-foreground-100 text-foreground-600',
  not_started: 'bg-foreground-100 text-foreground-600',
};

export default function ComplianceOverviewPage() {
  const score = getComplianceReadinessScore();
  const scorePercent = Math.round((score.completed / score.total) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground-950">Privacy & Compliance</h1>
          <p className="mt-1 text-sm text-foreground-600">Manage privacy policies, data controls, and compliance settings for your workplace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground-700">Privacy Setup Readiness</span>
            <span className="text-lg font-semibold text-foreground-950">{score.completed}/{score.total}</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-foreground-100">
            <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${scorePercent}%` }} />
          </div>
          <p className="mt-3 text-xs text-foreground-500">Complete all items to ensure your workplace is privacy-ready.</p>
          <div className="mt-4 space-y-2">
            {complianceChecklistItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <i className={`text-base ${item.done ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-checkbox-blank-circle-line text-foreground-400'}`}></i>
                <span className={item.done ? 'text-foreground-700' : 'text-foreground-500'}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
          {complianceOverviewCards.map((card) => (
            <Link
              key={card.id}
              to={card.href}
              className="group flex flex-col rounded-lg border border-foreground-200/60 bg-background-50 p-5 transition-all hover:border-foreground-300/80"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                  <i className={`${card.icon} text-lg text-primary-600`}></i>
                </div>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClasses[card.status] || 'bg-foreground-100 text-foreground-600'}`}>
                  {card.statusLabel}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground-950 group-hover:text-primary-600">{card.title}</h3>
              <p className="mt-1 text-xs text-foreground-500 line-clamp-2">{card.description}</p>
              <div className="mt-auto flex items-center gap-1 pt-3 text-xs font-medium text-primary-600">
                Manage <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}