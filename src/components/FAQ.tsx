import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

const FAQ = ({ items, title = "Frequently Asked Questions" }: FAQProps) => {
  return (
    <section className="section-padding bg-slate-200">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-10">{title}</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) =>
          <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-lg border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </section>);

};

export default FAQ;