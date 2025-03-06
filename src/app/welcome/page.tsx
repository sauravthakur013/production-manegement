// src/app/welcome/page.tsx
"use client";
import React from "react";
import { BarChart3, Users, Clock, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

function Welcome() {
  const route = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <Factory className="h-8 w-8 text-blue-800" /> */}
              <h1 className="text-2xl font-bold text-gray-900 uppercase">
                prod-manager
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => route.push("/login")}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </button>
              <button
                onClick={() => route.push("/register")}
                className="flex items-center px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors duration-200 font-medium"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Production Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your manufacturing operations with our comprehensive
            management solution. Get started today and experience the future of
            production management.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="px-8 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors duration-200 font-semibold text-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-blue-800 text-blue-800 rounded-md hover:bg-blue-50 transition-colors duration-200 font-semibold text-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-blue-800" />}
            title="Real-time Analytics"
            description="Monitor production metrics and KPIs in real-time to optimize performance and make data-driven decisions."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-blue-800" />}
            title="Team Management"
            description="Efficiently manage workforce scheduling, track productivity, and improve team collaboration."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8 text-blue-800" />}
            title="Production Planning"
            description="Schedule and optimize production runs with intelligent planning tools and automated workflows."
          />
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Production?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard
              number="30%"
              description="Average Efficiency Increase"
            />
            <BenefitCard number="50+" description="Enterprise Clients" />
            <BenefitCard number="24/7" description="Customer Support" />
            <BenefitCard number="99.9%" description="System Uptime" />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-800 rounded-lg shadow-lg p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Production?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that have already revolutionized their
            manufacturing process with Production.
          </p>
          <button className="px-8 py-3 bg-white text-blue-800 rounded-md hover:bg-blue-50 transition-colors duration-200 font-semibold text-lg">
            Get Started Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2025 Production. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface BenefitCardProps {
  number: string;
  description: string;
}

function BenefitCard({ number, description }: BenefitCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-800 mb-2">{number}</div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Welcome;
