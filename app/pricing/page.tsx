import { EditorialSection } from "@/components/sections/editorial-section";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      {/* Editorial as an intro */}
      <EditorialSection />
      
      {/* Contact / Query Form Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 bg-secondary/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Request a Quote</h2>
            <p className="text-muted-foreground mb-8">
              Need more details on pricing for long-term rentals or corporate packages? Send us a message and our team will get back to you immediately.
            </p>
            <div className="space-y-4 text-sm text-foreground">
              <p><strong>Email:</strong> reservations@rohittours.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Hours:</strong> 24/7 Support Available</p>
            </div>
          </div>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input type="text" id="name" className="border border-border bg-background px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <input type="email" id="email" className="border border-border bg-background px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20" placeholder="john@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea id="message" rows={4} className="border border-border bg-background px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20" placeholder="Tell us about what you need..."></textarea>
            </div>
            <Button type="button" className="py-6 rounded-lg text-base mt-2">Send Inquiry</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
