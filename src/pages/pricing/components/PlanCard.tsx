import { Link } from 'react-router-dom';
import type { PricingPlan } from '@/services/entitlements';

interface PlanCardProps {
  plan: PricingPlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const isEnterprise = plan.slug === 'enterprise';
  const priceDisplay = isEnterprise ? 'From £999' : `£${plan.price}`;

  return (
    <div
      className={`rounded-lg overflow-hidden border transition-all duration-300 flex flex-col relative bg-background-50 ${
        plan.highlighted
          ? 'border-primary-300/60 ring-1 ring-primary-200/50 shadow-sm'
          : 'border-background-200/70 hover:border-background-300/60'
      }`}
    >
      {plan.tag && (
        <div
          className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap z-10 ${
            plan.tag === 'Most Popular'
              ? 'bg-primary-500 text-background-50'
              : plan.tag === 'AI Powered'
                ? 'bg-accent-500 text-background-50'
                : 'bg-foreground-900 text-background-50'
          }`}
        >
          {plan.tag}
        </div>
      )}

      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3 className="font-heading text-base md:text-lg font-semibold text-foreground-900 text-center">{plan.name}</h3>

        <div className="text-center mt-2 mb-1">
          <span className="font-heading text-2xl md:text-3xl font-bold text-foreground-950">{priceDisplay}</span>
          <span className="text-xs md:text-sm text-foreground-500 ml-1">{plan.period}</span>
        </div>

        {plan.perDesk && (
          <p className="text-xs text-foreground-500 text-center mb-1">
            + £{plan.perDesk.toFixed(2)} per active desk
          </p>
        )}
        {isEnterprise && (
          <p className="text-xs text-foreground-500 text-center mb-1">Custom desk pricing</p>
        )}

        <p className="text-xs text-foreground-600 text-center mb-4">{plan.description}</p>

        <ul className="space-y-1 md:space-y-1.5 mb-4 md:mb-5 flex-1 max-h-[220px] md:max-h-[320px] overflow-y-auto">
          {plan.includes.map((feat) => (
            <li key={feat} className="flex items-start gap-1.5 text-xs text-foreground-700">
              <i className="ri-check-line text-accent-600 text-xs mt-0.5 flex-shrink-0"></i>
              {feat}
            </li>
          ))}
        </ul>

        {isEnterprise ? (
          <Link
            to="/contact"
            className="w-full text-center py-2 md:py-2.5 rounded-md font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer bg-foreground-900 text-background-50 hover:bg-foreground-800"
          >
            Contact Sales
          </Link>
        ) : (
          <Link
            to={`/signup?plan=${plan.slug}`}
            className={`w-full text-center py-2 md:py-2.5 rounded-md font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer ${
              plan.highlighted
                ? 'bg-primary-500 text-background-50 hover:bg-primary-600'
                : 'border border-background-300/60 text-foreground-800 hover:bg-background-100'
            }`}
          >
            {plan.cta}
          </Link>
        )}

        {plan.addOns && plan.addOns.length > 0 && (
          <div className="mt-3 md:mt-4 pt-3 border-t border-background-200/70">
            <p className="text-xs font-semibold text-foreground-700 mb-1.5 md:mb-2">Available Add-ons:</p>
            <ul className="space-y-0.5 md:space-y-1">
              {plan.addOns.map((addon) => (
                <li key={addon} className="text-xs text-foreground-500 flex items-center gap-1.5">
                  <i className="ri-add-circle-line text-accent-500 text-xs"></i>
                  {addon}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}