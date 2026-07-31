import { featuresPage } from "@/content/features";
import { FeatureSection } from "@/components/features/FeatureSection";

export function FeatureSections() {
  return (
    <>
      {featuresPage.sections.map((section, index) => (
        <FeatureSection
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          benefits={section.benefits}
          screenshot={section.screenshot}
          imagePosition={index % 2 === 0 ? "right" : "left"}
          background={index % 2 === 0 ? "surface" : "background"}
        />
      ))}
    </>
  );
}
