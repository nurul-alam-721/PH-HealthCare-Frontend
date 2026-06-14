"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, MapPin, Award, BookOpen, Clock, Heart } from "lucide-react";
import { IDoctor } from "@/types/doctor.types";

interface TopDoctorsProps {
  doctors: IDoctor[] | null;
}

// Highly polished mockup doctors in case backend API list is empty or offline
const MOCK_DOCTORS: IDoctor[] = [
  {
    id: 1,
    name: "Dr. Olivia Wilson",
    email: "olivia.wilson@healthcare.com",
    experience: 12,
    gender: "FEMALE" as any,
    appointmentFee: 60,
    qualification: "MD, FACC (Cardiology)",
    currentWorkingPlace: "Metro Heart Institute",
    designation: "Chief Cardiologist",
    registrationNumber: "REG12048",
    averageRating: 4.9,
    createdAt: new Date(),
    user: { status: "ACTIVE" as any },
    specialties: [
      {
        specialtyId: "spec1",
        doctorId: "doc1",
        specialty: {
          id: "spec1",
          title: "Cardiology",
          icon: "Heart",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Alexander Carter",
    email: "alexander.carter@healthcare.com",
    experience: 8,
    gender: "MALE" as any,
    appointmentFee: 45,
    qualification: "MD, FAAP (Pediatrics)",
    currentWorkingPlace: "Children's General Hospital",
    designation: "Senior Pediatrician",
    registrationNumber: "REG95831",
    averageRating: 4.8,
    createdAt: new Date(),
    user: { status: "ACTIVE" as any },
    specialties: [
      {
        specialtyId: "spec2",
        doctorId: "doc2",
        specialty: {
          id: "spec2",
          title: "Pediatrics",
          icon: "Baby",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Sofia Martinez",
    email: "sofia.martinez@healthcare.com",
    experience: 15,
    gender: "FEMALE" as any,
    appointmentFee: 75,
    qualification: "MD, PhD (Neurology)",
    currentWorkingPlace: "Brain & Spine Medical Center",
    designation: "Consultant Neurologist",
    registrationNumber: "REG44921",
    averageRating: 5.0,
    createdAt: new Date(),
    user: { status: "ACTIVE" as any },
    specialties: [
      {
        specialtyId: "spec3",
        doctorId: "doc3",
        specialty: {
          id: "spec3",
          title: "Neurology",
          icon: "Brain",
        },
      },
    ],
  },
];

export default function TopDoctors({ doctors }: TopDoctorsProps) {
  // Use backend doctors if available and valid; otherwise fall back to mock details
  const displayDoctors = doctors && doctors.length >= 3 ? doctors.slice(0, 3) : MOCK_DOCTORS;

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide">
              Qualified Experts
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Top Doctors
              </span>
            </h2>
            <p className="text-base text-muted-foreground">
              Connect with highly specialized, certified clinical professionals who bring years of clinical experience to patient care.
            </p>
          </div>
          <Link href="/consultation" className="shrink-0 hidden md:block">
            <Button variant="outline">
              See All Specialists
            </Button>
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDoctors.map((doc) => {
            const specialtyTitle = doc.specialties?.[0]?.specialty?.title || "General Practitioner";
            
            // Get initials for profile picture replacement
            const initials = doc.name
              .split(" ")
              .filter((n) => n !== "Dr." && n !== "dr.")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <Card 
                key={doc.id} 
                className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Image / Avatar Header with Gradient Background */}
                <CardHeader className="p-0 relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold flex items-center space-x-1 shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{doc.averageRating.toFixed(1)}</span>
                  </div>

                  <div className="h-24 w-24 rounded-full border-4 border-background bg-gradient-to-br from-primary to-accent text-white font-extrabold text-3xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300">
                    {initials}
                  </div>

                  <div className="absolute bottom-3 left-3 bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {specialtyTitle}
                  </div>
                </CardHeader>

                {/* Card Content details */}
                <CardContent className="p-6 space-y-4 flex-1">
                  <div>
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">{doc.designation}</p>
                  </div>

                  <div className="space-y-2 border-t pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{doc.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 shrink-0 text-primary" />
                      <span>{doc.experience} Years of Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{doc.currentWorkingPlace}</span>
                    </div>
                  </div>
                </CardContent>

                {/* Card Footer with Pricing and booking CTA */}
                <CardFooter className="p-6 border-t bg-muted/10 flex items-center justify-between gap-4 mt-auto">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Fee Per Visit</p>
                    <p className="text-lg font-extrabold text-foreground">${doc.appointmentFee}</p>
                  </div>
                  <Link href={`/dashboard/book-appointments?doctorId=${doc.id}`} className="flex-1 max-w-[150px]">
                    <Button className="w-full text-xs font-semibold shadow-sm">
                      Book Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Mobile-only Show All Button */}
        <div className="text-center mt-12 md:hidden">
          <Link href="/consultation">
            <Button variant="outline" className="w-full max-w-xs">
              See All Specialists
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
