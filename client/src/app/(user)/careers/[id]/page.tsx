"use client";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import ApplyFrom from '@/components/ApplyFrom';

export default function Page() {
  const params = useParams();
  const id = params?.id; // Safely access the 'id' parameter

  // State to toggle between job details and apply form
  const [showApplyForm, setShowApplyForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Conditional Rendering */}
        {!showApplyForm ? (
          <div className="container mx-auto px-4 py-10 pl-40 mt-15">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
                <h1 className="text-3xl font-bold mb-2 m-4">Job Information</h1>
                <p className="text-lg m-4">Discover your next career opportunity!</p>
              </div>

              {/* Job Details */}
              <div className="p-6 space-y-4 m-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-700">Position:</span>
                  <p className="text-gray-600">Graphic Designer</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-700">Location:</span>
                  <p className="text-gray-600">Baridara DOHS</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-700">Deadline:</span>
                  <p className="text-gray-600">20/09/2024</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-700">Salary:</span>
                  <p className="text-gray-600">18,000 - 25,000 BDT/Month</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-700">Vacancies:</span>
                  <p className="text-gray-600">2 Positions</p>
                </div>
              </div>

              {/* Job Description */}
              <div className="p-6 space-y-4 m-4">
                <h2 className="text-2xl font-bold text-gray-800">Job Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  As a Graphic Designer, you will work within a Product Delivery Team fused with UX, engineering, product, and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC, and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.
                </p>

                <h2 className="text-2xl font-bold text-gray-800">Key Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Be involved in every step of the product design cycle from discovery to developer handoff and user acceptance testing.</li>
                  <li>Work with BAs, product managers, and tech teams to lead the Product Design.</li>
                  <li>Maintain quality of the design process and ensure that when designs are translated into code, they accurately reflect the design specifications.</li>
                  <li>Accurately estimate design tickets during planning sessions.</li>
                  <li>Contribute to sketching sessions involving non-designers.</li>
                  <li>Create, iterate, and maintain UI deliverables including sketch files, style guides, high-fidelity prototypes, micro interaction specifications, and pattern libraries.</li>
                  <li>Ensure design choices are data-led by identifying assumptions to test each sprint and work with analysts in your team to plan moderated usability test sessions.</li>
                  <li>Design pixel-perfect responsive UIs and understand that adopting common interface patterns is better for UX than reinventing the wheel.</li>
                  <li>Present your work to the wider business at Show & Tell sessions.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800">Skills & Experience</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You have at least 3 years of experience working as a Product Designer.</li>
                  <li>You have experience using Sketch and InVision or Framer X.</li>
                  <li>You have some previous experience working in an agile environment – think two-week sprints.</li>
                  <li>You are familiar with using Jira and Confluence in your workflow.</li>
                </ul>
              </div>

              {/* Apply Now Button */}
              <div className="p-6 border-t bg-gray-50 flex justify-end">
                <button
                  className="px-6 py-3 text-white font-medium bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => setShowApplyForm(true)} // Show apply form on click
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ) : (
            <div className='mt-15'>

            <ApplyFrom /> 

            </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Widget */}
      <Whatsapp />
    </div>
  );
}
