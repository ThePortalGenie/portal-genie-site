"use client";

import { FormEvent, useState } from "react";
import { resourcesPage } from "@/content/resources";
import { ScrollReveal } from "@/components/features/ScrollReveal";
import { Container } from "@/components/ui/Container";

export function ResourcesNewsletter() {
  const { newsletter } = resourcesPage;
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmail("");
  }

  return (
    <section className="border-y border-muted/15 bg-surface py-12 md:py-20 lg:py-[120px]">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
              {newsletter.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {newsletter.description}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="resources-email" className="sr-only">
                Email address
              </label>
              <input
                id="resources-email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={newsletter.placeholder}
                required
                className="h-11 flex-1 rounded-button border border-muted/40 bg-background px-4 text-sm text-portal-navy placeholder:text-portal-navy/40 transition-colors duration-200 focus:border-portal-blue/50 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-button bg-portal-blue px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90"
              >
                {newsletter.buttonLabel}
              </button>
            </form>

            <p className="mt-4 text-xs text-portal-navy/50">
              {newsletter.disclaimer}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
