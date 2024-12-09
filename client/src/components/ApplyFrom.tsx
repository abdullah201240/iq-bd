"use client";
import React from "react";

export default function ApplyFrom() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50  ">
     
      {/* Application Form Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10 pl-40 ">
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white ">
              <h1 className="text-3xl font-bold mb-2 m-4">Application Form</h1>
              <p className="text-lg m-4">Fill out the form below to apply for this position.</p>
            </div>

            {/* Form */}
            <div className="p-6 m-4">
              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-gray-700 font-medium">
                    Address:
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your current address"
                  ></textarea>
                </div>

                {/* Educational Background */}
                <div>
                  <label htmlFor="education" className="block text-gray-700 font-medium">
                    Educational Background:
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide details of your educational background"
                  ></textarea>
                </div>

                {/* Job Experience */}
                <div>
                  <label htmlFor="experience" className="block text-gray-700 font-medium">
                    Job Experience (Years):
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your job experience in years"
                  />
                </div>

                {/* Expected Salary */}
                <div>
                  <label htmlFor="salary" className="block text-gray-700 font-medium">
                    Expected Salary:
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your expected salary"
                  />
                </div>

                {/* Why Choose This Position */}
                <div>
                  <label htmlFor="why" className="block text-gray-700 font-medium">
                    Why do you choose this position?
                  </label>
                  <textarea
                    id="why"
                    name="why"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Explain why you're interested in this role"
                  ></textarea>
                </div>
                 {/* Portfolio Link */}
                 <div>
                  <label htmlFor="portfolio" className="block text-gray-700 font-medium">
                    Design Portfolio Link:
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the URL to your design portfolio"
                  />
                </div>

                {/* Attach Resume */}
                <div>
                  <label htmlFor="resume" className="block text-gray-700 font-medium">
                    Attach Resume (PDF):
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

               

                {/* Submit Button */}
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-3 text-white font-medium bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
