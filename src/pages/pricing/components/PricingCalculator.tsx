import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { pricingPlans, extraUsagePrices } from '@/mocks/billingData';
import type { PricingPlan } from '@/services/entitlements';

export default function PricingCalculator() {
  const [selectedPlanSlug, setSelectedPlanSlug] = useState('professional');
  const [desks, setDesks] = useState(50);
  const [staff, setStaff] = useState(80);
  const [sites, setSites] = useState(2);
  const [buildings, setBuildings] = useState(2);
  const [floors, setFloors] = useState(4);
  const [areas, setAreas] = useState(5);
  const [floorplans, setFloorplans] = useState(1);
  const [needAI, setNeedAI] = useState(false);
  const [needLocation, setNeedLocation] = useState(false);
  const [needProbe, setNeedProbe] = useState(false);
  const [needSmartBuilding, setNeedSmartBuilding] = useState(false);
  const [needGateway, setNeedGateway] = useState(false);

  const plan = useMemo(() => pricingPlans.find((p) => p.slug === selectedPlanSlug) || pricingPlans[1], [selectedPlanSlug]);
  const extraPrices = extraUsagePrices[selectedPlanSlug];

  const limits = plan.limits;
  const basePrice = typeof plan.price === 'number' ? plan.price : 999;
  const perDesk = typeof plan.perDesk === 'number' ? plan.perDesk : 0;
  const deskCost = Math.round(desks * perDesk);

  const extraUsers = Math.max(0, staff - limits.max_staff_users);
  const extraSites = Math.max(0, sites - limits.max_sites);
  const extraBuildings = Math.max(0, buildings - limits.max_buildings);
  const extraFloors = Math.max(0, floors - limits.max_floors);
  const extraAreas = Math.max(0, areas - limits.max_hot_desk_areas);
  const extraFloorplansCount = Math.max(0, floorplans - limits.floorplan_uploads);

  const extraUsersCost = extraPrices.extra_staff_user !== null ? Math.round(extraUsers * extraPrices.extra_staff_user) : 0;
  const extraSitesCost = extraPrices.extra_site !== null ? Math.round(extraSites * extraPrices.extra_site) : 0;
  const extraBuildingsCost = extraPrices.extra_building !== null ? Math.round(extraBuildings * extraPrices.extra_building) : 0;
  const extraFloorsCost = extraPrices.extra_floor !== null ? Math.round(extraFloors * extraPrices.extra_floor) : 0;
  const extraAreasCost = extraPrices.extra_hot_desk_area !== null ? Math.round(extraAreas * extraPrices.extra_hot_desk_area) : 0;
  const extraFloorplansCost = extraPrices.extra_floorplan !== null ? Math.round(extraFloorplansCount * extraPrices.extra_floorplan) : 0;

  const locationCost = needLocation && !['intelligence', 'enterprise'].includes(selectedPlanSlug) ? 25 * sites : 0;
  const probeCost = needProbe && selectedPlanSlug === 'intelligence' ? 99 * sites : 0;
  const smartBuildingCost = needSmartBuilding && selectedPlanSlug === 'enterprise' ? 250 * buildings : 0;
  const gatewayCost = needGateway && selectedPlanSlug === 'enterprise' ? 0 : 0;

  const addOnTotal = locationCost + probeCost + smartBuildingCost + gatewayCost;
  const extraTotal = extraUsersCost + extraSitesCost + extraBuildingsCost + extraFloorsCost + extraAreasCost + extraFloorplansCost;
  const estimatedTotal = basePrice + deskCost + extraTotal + addOnTotal;

  const warnings: string[] = [];

  if (selectedPlanSlug === 'basic') {
    if (needLocation) warnings.push('Location Check-in is not included in Basic. Upgrade to Professional or higher.');
    if (needProbe) warnings.push('Probe/Wi-Fi analytics is not included in Basic. Upgrade to Intelligence or Enterprise.');
    if (needSmartBuilding) warnings.push('Smart Building Integration is only available on Enterprise.');
    if (floorplans > 0) warnings.push('Floorplan uploads are not available on Basic. Upgrade to Professional or higher.');
  }
  if (selectedPlanSlug === 'professional') {
    if (needProbe) warnings.push('Probe/Wi-Fi analytics is not included in Professional. Upgrade to Intelligence or Enterprise.');
    if (needSmartBuilding) warnings.push('Smart Building Integration is only available on Enterprise.');
  }
  if (selectedPlanSlug === 'intelligence') {
    if (needSmartBuilding) warnings.push('Smart Building Integration is only available on Enterprise.');
  }

  if (selectedPlanSlug !== 'enterprise') {
    if (extraUsers > 0) warnings.push(`You have ${extraUsers} extra staff users beyond the ${plan.name} limit of ${limits.max_staff_users}.`);
    if (extraSites > 0) warnings.push(`You have ${extraSites} extra sites beyond the ${plan.name} limit of ${limits.max_sites}.`);
    if (extraAreas > 0) warnings.push(`You have ${extraAreas} extra hot desk areas beyond the ${plan.name} limit of ${limits.max_hot_desk_areas}.`);
    if (extraFloorplansCount > 0 && extraPrices.extra_floorplan === null) {
      warnings.push('Extra floorplans are not available on your plan. Upgrade to Professional or higher.');
    }
  }

  const isEnterprise = selectedPlanSlug === 'enterprise';

  return (
    <div className="bg-background-100 border border-background-200/70 rounded-2xl p-6 md:p-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground-800 mb-2">Select Plan</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {pricingPlans.map((p) => (
            <button
              key={p.slug}
              onClick={() => {
                setSelectedPlanSlug(p.slug);
                if (p.slug === 'enterprise') {
                  setDesks(200);
                  setStaff(500);
                  setSites(5);
                  setBuildings(5);
                  setFloors(10);
                  setAreas(10);
                  setFloorplans(10);
                }
              }}
              className={`text-xs font-semibold py-2 px-3 rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                selectedPlanSlug === p.slug
                  ? 'border-primary-500 bg-primary-500 text-background-50'
                  : 'border-background-200/70 text-foreground-700 hover:border-background-300/60 bg-background-50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-2">
            Active desks: <span className="text-primary-600 font-bold">{desks}</span>
          </label>
          <input type="range" min={1} max={isEnterprise ? 2000 : 500} value={desks} onChange={(e) => setDesks(parseInt(e.target.value))} className="w-full accent-primary-500" />
          <div className="flex justify-between text-xs text-foreground-400 mt-1"><span>1</span><span>{isEnterprise ? '2,000' : '500'}</span></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-2">
            Staff users: <span className={`font-bold ${staff > limits.max_staff_users ? 'text-accent-600' : 'text-primary-600'}`}>{staff}</span>
            {staff > limits.max_staff_users && <span className="text-xs text-accent-600 ml-1">(+{extraUsers})</span>}
          </label>
          <input type="range" min={1} max={isEnterprise ? 5000 : 1000} value={staff} onChange={(e) => setStaff(parseInt(e.target.value))} className="w-full accent-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-2">
            Sites: <span className={`font-bold ${sites > limits.max_sites ? 'text-accent-600' : 'text-primary-600'}`}>{sites}</span>
            {sites > limits.max_sites && <span className="text-xs text-accent-600 ml-1">(+{extraSites})</span>}
          </label>
          <input type="range" min={1} max={isEnterprise ? 100 : 20} value={sites} onChange={(e) => setSites(parseInt(e.target.value))} className="w-full accent-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-2">
            Buildings: <span className="font-bold text-primary-600">{buildings}</span>
          </label>
          <input type="range" min={1} max={isEnterprise ? 200 : 30} value={buildings} onChange={(e) => setBuildings(parseInt(e.target.value))} className="w-full accent-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-2">
            Floors: <span className="font-bold text-primary-600">{floors}</span>
          </label>
          <input type="range" min={1} max={isEnterprise ? 500 : 50} value={floors} onChange={(e) => setFloors(parseInt(e.target.value))} className="w-full accent-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-2">
            Hot desk areas: <span className={`font-bold ${areas > limits.max_hot_desk_areas ? 'text-accent-600' : 'text-primary-600'}`}>{areas}</span>
            {areas > limits.max_hot_desk_areas && <span className="text-xs text-accent-600 ml-1">(+{extraAreas})</span>}
          </label>
          <input type="range" min={1} max={isEnterprise ? 200 : 50} value={areas} onChange={(e) => setAreas(parseInt(e.target.value))} className="w-full accent-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-2">
            Floorplans: <span className={`font-bold ${floorplans > limits.floorplan_uploads ? 'text-accent-600' : 'text-primary-600'}`}>{floorplans}</span>
          </label>
          <input type="range" min={0} max={isEnterprise ? 100 : 20} value={floorplans} onChange={(e) => setFloorplans(parseInt(e.target.value))} className="w-full accent-primary-500" />
        </div>
      </div>

      {!isEnterprise && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground-800">Data-Flow Add-ons</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'AI Analytics', state: needAI, setter: setNeedAI, disabled: false, hint: selectedPlanSlug === 'basic' ? 'Professional+' : '' },
              { label: 'Location Check-in', state: needLocation, setter: setNeedLocation, disabled: selectedPlanSlug === 'basic', hint: selectedPlanSlug === 'basic' ? 'Professional+' : '£25/site/mo' },
              { label: 'Probe/Wi-Fi', state: needProbe, setter: setNeedProbe, disabled: selectedPlanSlug !== 'intelligence', hint: selectedPlanSlug !== 'intelligence' ? 'Intelligence+' : '£99/site/mo' },
              { label: 'Smart Building', state: needSmartBuilding, setter: setNeedSmartBuilding, disabled: true, hint: 'Enterprise only' },
            ].map((addon) => (
              <label
                key={addon.label}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-md border text-xs transition-colors ${
                  addon.disabled
                    ? 'border-background-200/70 bg-background-50/50 text-foreground-400 cursor-not-allowed'
                    : addon.state
                      ? 'border-primary-500 bg-primary-50 text-foreground-800 cursor-pointer'
                      : 'border-background-200/70 bg-background-50 hover:border-background-300/60 text-foreground-700 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addon.state}
                    onChange={() => !addon.disabled && addon.setter(!addon.state)}
                    disabled={addon.disabled}
                    className="rounded border-background-300 text-primary-500 focus:ring-primary-400"
                  />
                  <span className="font-medium">{addon.label}</span>
                </div>
                <span className="text-xs text-foreground-400">{addon.hint}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="bg-accent-50 border border-accent-200/70 rounded-lg p-4 space-y-1.5">
          <p className="text-xs font-semibold text-accent-700 flex items-center gap-1.5">
            <i className="ri-error-warning-line"></i>
            Plan Limit Warnings
          </p>
          {warnings.map((w, i) => (
            <p key={i} className="text-xs text-accent-600">{w}</p>
          ))}
        </div>
      )}

      <div className="border-t border-background-200/70 pt-4 md:pt-5">
        <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm">
          <span className="text-foreground-500">Base plan price</span>
          <span className="text-foreground-900 font-semibold text-right">£{basePrice.toLocaleString()}</span>
          <span className="text-foreground-500">Desk cost ({desks} × £{perDesk.toFixed(2)})</span>
          <span className="text-foreground-900 font-semibold text-right">£{deskCost.toLocaleString()}</span>
          {extraUsers > 0 && <><span className="text-foreground-500">Extra users ({extraUsers} × £{extraPrices.extra_staff_user?.toFixed(2)})</span><span className="text-foreground-900 font-semibold text-right">£{extraUsersCost.toLocaleString()}</span></>}
          {extraSites > 0 && <><span className="text-foreground-500">Extra sites ({extraSites} × £{extraPrices.extra_site})</span><span className="text-foreground-900 font-semibold text-right">£{extraSitesCost.toLocaleString()}</span></>}
          {extraBuildings > 0 && extraPrices.extra_building !== null && <><span className="text-foreground-500">Extra buildings ({extraBuildings} × £{extraPrices.extra_building})</span><span className="text-foreground-900 font-semibold text-right">£{extraBuildingsCost.toLocaleString()}</span></>}
          {extraFloors > 0 && extraPrices.extra_floor !== null && <><span className="text-foreground-500">Extra floors ({extraFloors} × £{extraPrices.extra_floor})</span><span className="text-foreground-900 font-semibold text-right">£{extraFloorsCost.toLocaleString()}</span></>}
          {extraAreas > 0 && extraPrices.extra_hot_desk_area !== null && <><span className="text-foreground-500">Extra areas ({extraAreas} × £{extraPrices.extra_hot_desk_area?.toFixed(2)})</span><span className="text-foreground-900 font-semibold text-right">£{extraAreasCost.toLocaleString()}</span></>}
          {extraFloorplansCount > 0 && extraPrices.extra_floorplan !== null && <><span className="text-foreground-500">Extra floorplans ({extraFloorplansCount} × £{extraPrices.extra_floorplan})</span><span className="text-foreground-900 font-semibold text-right">£{extraFloorplansCost.toLocaleString()}</span></>}
          {locationCost > 0 && <><span className="text-foreground-500">Location Check-in ({sites} sites)</span><span className="text-foreground-900 font-semibold text-right">£{locationCost.toLocaleString()}</span></>}
          {probeCost > 0 && <><span className="text-foreground-500">Probe/Wi-Fi ({sites} sites)</span><span className="text-foreground-900 font-semibold text-right">£{probeCost.toLocaleString()}</span></>}
          {smartBuildingCost > 0 && <><span className="text-foreground-500">Smart Building ({buildings} buildings)</span><span className="text-foreground-900 font-semibold text-right">£{smartBuildingCost.toLocaleString()}</span></>}
        </div>

        <div className="border-t border-background-200/70 mt-4 pt-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="font-heading text-lg font-bold text-foreground-950">Estimated monthly total</span>
            <p className="text-xs text-foreground-500 mt-0.5">Incl. {limits.ai_credits_monthly.toLocaleString()} AI credits</p>
          </div>
          <span className="font-heading text-2xl font-bold text-primary-600">£{estimatedTotal.toLocaleString()}</span>
        </div>

        <div className="mt-4">
          {isEnterprise ? (
            <Link
              to="/contact"
              className="block text-center w-full bg-foreground-900 text-background-50 font-semibold text-sm py-3 rounded-md hover:bg-foreground-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              Contact Sales
            </Link>
          ) : (
            <Link
              to={`/signup?plan=${selectedPlanSlug}&desks=${desks}`}
              className="block text-center w-full bg-primary-500 text-background-50 font-semibold text-sm py-3 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Get Started with {plan.name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}