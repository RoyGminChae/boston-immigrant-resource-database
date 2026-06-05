"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  trigger: string;
  content: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
  defaultOpen?: string;
  centered?: boolean;
};

export default function FaqAccordion({
  items,
  defaultOpen = "0",
  centered = false,
}: FaqAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen}
      className={centered ? "mx-auto max-w-3xl" : undefined}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={item.trigger}
          value={`${index}`}
          className="border-b border-gray-200"
        >
          <AccordionTrigger className="text-left text-sm font-semibold text-[#27317B] hover:no-underline md:text-base">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className="text-sm font-light leading-relaxed text-black">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
