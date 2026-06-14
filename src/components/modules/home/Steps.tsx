"use client";

import { Search, CalendarDays, CreditCard, ClipboardCheck } from "lucide-react";

export default function Steps() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Search Specialists",
      description: "Filter doctors by specialty, qualifications, experience, fees, or location to find the perfect match.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      number: "02",
      icon: CalendarDays,
      title: "Schedule Slot",
      description: "Select from the real-time available calendar schedules that fit your day-to-day routine.",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Secure Payment",
      description: "Complete your booking with simple online payment processing and instant confirmation.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      number: "04",
      icon: ClipboardCheck,
      title: "Get Consulted",
      description: "Attend your consultation session, and instantly access digital prescriptions in your dashboard.",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section id="steps" className="py-16 sm:py-24 bg-muted/30 relative">
      {/* Subtle details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Get Services in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            PH HealthCare streamlines your medical journey. Here is how you can find, schedule, and complete consultations with certified professionals in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                className="group relative bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Connector Line for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[80%] right-[-20%] h-0.5 bg-gradient-to-r from-primary/20 to-transparent z-0 pointer-events-none" />
                )}

                {/* Step Number Badge */}
                <div className="absolute top-4 right-4 text-3xl font-black text-muted-foreground/10 select-none">
                  {step.number}
                </div>

                {/* Step Icon Container */}
                <div className={`inline-flex items-center justify-center p-3.5 rounded-xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-md transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
