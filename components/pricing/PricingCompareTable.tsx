"use client";

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import {
  getComparisonFeatureSections,
  getFeatureCompareValue,
  pricingPage,
  pricingPlans,
  type PricingFeatureDefinition,
} from "@/content/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const featureRowBackground = (index: number) =>
  index % 2 === 0 ? "bg-background" : "bg-surface";

function CompareValue({
  feature,
  planId,
}: {
  feature: PricingFeatureDefinition;
  planId: (typeof pricingPlans)[number]["id"];
}) {
  const cell = getFeatureCompareValue(feature, planId);

  if (cell.kind === "value") {
    return (
      <span className="text-sm font-medium text-portal-navy">
        {cell.text ?? "—"}
      </span>
    );
  }

  if (cell.included) {
    return (
      <span className="inline-flex items-center justify-center text-portal-teal">
        <Check className="size-4" strokeWidth={2.5} aria-label="Included" />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center text-muted">
      <Minus className="size-4" strokeWidth={2} aria-label="Not included" />
    </span>
  );
}

function CompareFeatureRow({
  feature,
  rowIndex,
}: {
  feature: PricingFeatureDefinition;
  rowIndex: number;
}) {
  const rowBg = featureRowBackground(rowIndex);

  return (
    <tr className={rowBg}>
      <th
        scope="row"
        className={`sticky left-0 z-10 px-4 py-2.5 text-left text-sm font-normal leading-snug text-portal-navy/80 sm:px-6 ${rowBg}`}
      >
        {feature.name}
      </th>
      {pricingPlans.map((plan) => (
        <td
          key={`${plan.id}-${feature.id}`}
          className="px-4 py-2.5 text-center sm:px-6"
        >
          <CompareValue feature={feature} planId={plan.id} />
        </td>
      ))}
    </tr>
  );
}

function MobileStatus({
  feature,
  planId,
  planName,
}: {
  feature: PricingFeatureDefinition;
  planId: (typeof pricingPlans)[number]["id"];
  planName: string;
}) {
  const cell = getFeatureCompareValue(feature, planId);

  let status: ReactNode;
  if (cell.kind === "value") {
    status = (
      <span className="ml-1.5 text-[11px] font-semibold text-portal-navy">
        {cell.text ?? "—"}
      </span>
    );
  } else if (cell.included) {
    status = (
      <Check
        className="ml-1.5 size-3.5 shrink-0 text-portal-teal"
        strokeWidth={2.5}
        aria-label="Included"
      />
    );
  } else {
    status = (
      <span
        className="ml-1.5 text-sm font-medium leading-none text-muted"
        aria-label="Not included"
      >
        —
      </span>
    );
  }

  return (
    <div className="flex min-w-0 items-center">
      <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-portal-navy/45">
        {planName}
      </span>
      {status}
    </div>
  );
}

function MobileCompare() {
  const sections = getComparisonFeatureSections();

  return (
    <div className="mt-8 space-y-4 md:hidden">
      {sections.map((section) => (
        <div
          key={section.id}
          className="overflow-hidden rounded-card border border-muted/20 bg-surface"
        >
          <h3 className="bg-portal-blue/[0.06] px-5 py-3.5 text-base font-semibold leading-snug text-portal-blue">
            {section.title}
          </h3>
          <ul>
            {section.features.map((feature, index) => (
              <li
                key={feature.id}
                className={`border-t border-muted/10 px-5 py-4 ${
                  index % 2 === 0 ? "bg-surface" : "bg-portal-blue/[0.03]"
                }`}
              >
                <p className="text-base font-medium leading-snug text-portal-navy">
                  {feature.name}
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-x-3">
                  {pricingPlans.map((plan) => (
                    <MobileStatus
                      key={`${plan.id}-${feature.id}`}
                      feature={feature}
                      planId={plan.id}
                      planName={plan.name}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PricingCompareTable() {
  const sections = getComparisonFeatureSections();
  const { compare } = pricingPage;

  const sectionStartIndices = sections.reduce<number[]>((indices, section, index) => {
    const previousCount =
      index === 0 ? 0 : indices[index - 1] + sections[index - 1].features.length;
    return [...indices, previousCount];
  }, []);

  const sectionsWithRowIndices = sections.map((section, sectionIndex) => ({
    section,
    features: section.features.map((feature, featureIndex) => ({
      feature,
      rowIndex: sectionStartIndices[sectionIndex] + featureIndex,
    })),
  }));

  return (
    <section className="bg-surface py-12 md:py-20 lg:py-24">
      <Container>
        <SectionHeader
          title={compare.headline}
          description={compare.description}
          align="left"
          className="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
        />

        {compare.relatedLink ? (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm sm:text-base md:mx-0 md:text-left">
            <Link
              href={compare.relatedLink.href}
              className="font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
            >
              {compare.relatedLink.label}
            </Link>
          </p>
        ) : null}

        <MobileCompare />

        <div className="mt-10 hidden overflow-x-auto rounded-card border border-muted/20 bg-surface md:block">
          <table className="w-full min-w-[36rem] table-fixed border-collapse text-left text-sm">
            <caption className="sr-only">
              Feature comparison across Premium and Advanced plans
            </caption>
            <colgroup>
              <col className="w-[50%]" />
              <col className="w-[25%]" />
              <col className="w-[25%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-muted/20 bg-surface">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-surface px-4 py-4 text-sm font-semibold text-portal-navy sm:px-6"
                >
                  Feature
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className="px-4 py-4 text-center text-sm font-semibold text-portal-navy sm:px-6"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectionsWithRowIndices.map(({ section, features }, sectionIndex) => (
                <Fragment key={section.id}>
                  <tr
                    className={
                      sectionIndex > 0 ? "border-t border-muted/15" : undefined
                    }
                  >
                    <th
                      colSpan={pricingPlans.length + 1}
                      scope="colgroup"
                      className="bg-portal-blue/[0.06] px-4 py-2.5 text-left text-sm font-semibold text-portal-blue sm:px-6"
                    >
                      {section.title}
                    </th>
                  </tr>
                  {features.map(({ feature, rowIndex }) => (
                    <CompareFeatureRow
                      key={feature.id}
                      feature={feature}
                      rowIndex={rowIndex}
                    />
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
