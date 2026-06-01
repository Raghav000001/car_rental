"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { format, differenceInCalendarDays } from "date-fns";
import {
  Car,
  Calendar,
  FileText,
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Send,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CarData = {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  pricePerDay: number;
  images: string[];
  transmission: string;
  seats: number;
};

export function BookingModal({
  car,
  open,
  onOpenChange,
}: {
  car: CarData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when modal opens with a new car
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset after closing animation
      setTimeout(() => {
        setStep(1);
        setPickupDate(undefined);
        setReturnDate(undefined);
        setForm({ name: "", email: "", phone: "", notes: "" });
        setErrors({});
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 200);
    }
    onOpenChange(open);
  };

  const days = useMemo(() => {
    if (pickupDate && returnDate) {
      const diff = differenceInCalendarDays(returnDate, pickupDate);
      return diff > 0 ? diff : 0;
    }
    return 0;
  }, [pickupDate, returnDate]);

  const totalPrice = useMemo(
    () => (car && days > 0 ? car.pricePerDay * days : 0),
    [car, days],
  );

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Required";
    else if (form.phone.trim().length < 6) errs.phone = "Too short";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.phone.trim(),
          carName: `${car!.make} ${car!.model} (${car!.year})`,
          pickupDate: format(pickupDate!, "PPP"),
          returnDate: format(returnDate!, "PPP"),
          days,
          pricePerDay: car!.pricePerDay,
          totalPrice,
          notes: form.notes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setIsSuccess(true);
      toast.success(data.message || "Booking submitted! Check your email.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const carName = car ? `${car.make} ${car.model}` : "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {carName}</DialogTitle>
          <DialogDescription>
            Complete the 3-step process to send your booking request.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="bg-foreground text-background rounded-full p-3 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-lg font-medium mb-1">Request Sent!</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Confirmation sent to {form.email}
            </p>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* Steps */}
            <div className="flex items-center justify-center my-4">
              {[
                { num: 1, icon: Car, label: "Car" },
                { num: 2, icon: Calendar, label: "Dates" },
                { num: 3, icon: FileText, label: "Details" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-medium transition-colors",
                      step >= s.num
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-muted-foreground border-border",
                    )}
                  >
                    {step > s.num ? <Check size={12} /> : s.num}
                  </div>
                  {i < 2 && (
                    <div
                      className={cn(
                        "w-10 sm:w-16 h-px mx-2 transition-colors",
                        step > s.num ? "bg-foreground" : "bg-border",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Confirm Car */}
            {step === 1 && car && (
              <div className="space-y-4">
                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-border rounded-lg">
                  <div className="relative w-20 sm:w-24 h-14 sm:h-16 shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={car.images[0] || "/placeholder.svg"}
                      alt={carName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base">{carName}</p>
                    <p className="text-xs text-muted-foreground">
                      {car.year} &middot; {car.type} &middot; {car.transmission} &middot; {car.seats} seats
                    </p>
                    <p className="text-sm font-bold mt-1">
                      ${car.pricePerDay}<span className="text-xs font-normal text-muted-foreground">/day</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pick Dates */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pickup Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start font-normal", !pickupDate && "text-muted-foreground")}>
                          <CalendarIcon size={14} className="mr-2" />
                          {pickupDate ? format(pickupDate, "PPP") : "Select"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={pickupDate} onSelect={setPickupDate} disabled={{ before: new Date() }} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start font-normal", !returnDate && "text-muted-foreground")}>
                          <CalendarIcon size={14} className="mr-2" />
                          {returnDate ? format(returnDate, "PPP") : "Select"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={returnDate} onSelect={setReturnDate} disabled={{ before: pickupDate || new Date() }} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                {days > 0 && car && (
                  <div className="bg-muted border border-border rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{days} day{days > 1 ? "s" : ""}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">${car.pricePerDay} &times; {days}</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Your Details */}
            {step === 3 && car && (
              <div className="space-y-5">
                <div className="border border-border rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle</span>
                    <span className="font-medium">{carName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates</span>
                    <span className="font-medium">{format(pickupDate!, "MMM d")} &ndash; {format(returnDate!, "MMM d")}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="bm-name" className={errors.name ? "text-destructive" : ""}>Full Name *</Label>
                    <Input id="bm-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={errors.name ? "border-destructive" : ""} placeholder="John Doe" />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="bm-email" className={errors.email ? "text-destructive" : ""}>Email *</Label>
                    <Input id="bm-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={errors.email ? "border-destructive" : ""} placeholder="john@example.com" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="bm-phone" className={errors.phone ? "text-destructive" : ""}>Phone *</Label>
                    <Input id="bm-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={errors.phone ? "border-destructive" : ""} placeholder="+1 (555) 000-0000" />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="bm-notes">Notes</Label>
                    <Textarea id="bm-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special requests..." rows={3} />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                <ChevronLeft size={14} className="mr-1" /> Back
              </Button>
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 2 && (!pickupDate || !returnDate || days === 0))
                  }
                >
                  Next <ChevronRight size={14} className="ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <><Send size={14} className="mr-1" /> Send Request</>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
