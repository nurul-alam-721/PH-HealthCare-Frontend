"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Star, Users, Award, ShieldCheck } from "lucide-react";

export default function Hero() {
  const handleScrollToSteps = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const stepsElement = document.getElementById("steps");
    if (stepsElement) {
      stepsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-background py-16 sm:py-24 lg:py-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Smart Healthcare Platform</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Find & Book the Best{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Specialist Doctors
              </span>{" "}
              Instantly
            </h1>
            
            <p className="text-lg text-muted-foreground sm:text-xl">
              Connect with top certified medical experts, schedule online consultations, request digital prescriptions, and manage all your healthcare needs in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <Link href="/consultation" className="w-full sm:w-auto">
                <Button size="lg" className="w-full group shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                onClick={handleScrollToSteps} 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t w-full">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">150+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Certified Doctors</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">50k+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Happy Patients</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">99.8%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Graphics */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-primary/10 to-accent/5 rounded-3xl p-6 border border-primary/10 shadow-inner flex flex-col justify-between overflow-hidden">
              
              {/* Doctor Profile Card Mockup */}
              <div className="bg-card rounded-2xl p-5 border shadow-lg space-y-4 hover:shadow-xl transition-shadow relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                    DR
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                      Dr. Richard Alpert
                      <ShieldCheck className="h-4 w-4 text-primary fill-primary/10" />
                    </h3>
                    <p className="text-xs text-primary font-medium">Senior Cardiologist, MD</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">4.9</span>
                      <span className="text-xs text-muted-foreground">(2,450+ reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs border-t pt-3">
                  <div>
                    <p className="text-muted-foreground">Experience</p>
                    <p className="font-semibold text-foreground">12+ Years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Consultation Fee</p>
                    <p className="font-semibold text-foreground">$50</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Availability</p>
                    <p className="font-semibold text-green-600">Available Today</p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1 - Active Appointments */}
              <div className="absolute top-[40%] -left-6 bg-card border rounded-xl p-3 shadow-md flex items-center space-x-3 max-w-[180px] animate-bounce-slow z-20">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Bookings</p>
                  <p className="text-xs font-extrabold text-foreground">Easy 1-Click</p>
                </div>
              </div>

              {/* Floating Stat Card 2 - Patient Avatars */}
              <div className="absolute bottom-8 right-0 bg-card border rounded-xl p-3 shadow-md flex items-center space-x-3 max-w-[190px] animate-pulse-slow z-20">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Patients Served</p>
                  <p className="text-xs font-extrabold text-foreground">50k+ Active</p>
                </div>
              </div>

              {/* Background circular decorations */}
              <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-full border border-dashed border-primary/20 animate-spin-very-slow" />
              <div className="absolute top-4 right-4 h-20 w-20 rounded-full border border-dotted border-accent/20 animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
