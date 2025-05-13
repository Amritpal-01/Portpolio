/** @format */

"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Blog Coming Soon Section */}
        <section className="glass-card p-8 text-center relative overflow-hidden">
          {/* Animated Background Elements */}
          {/* <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-500/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div> */}

          {/* Main Content */}
          <div
            className={`relative z-10 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse opacity-20" />
              <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl h-28 font-bold my-4 gradient-text">
              Blog Coming Soon
            </h1>
{/* 
            <p className="text-xl text-purple-200 my-8">
              I'm working on something exciting! Stay tuned for insightful
              articles about web development, programming tips, and tech
              insights.
            </p> */}

            {/* Progress Bar */}
            {/* <div className="w-full max-w-md mx-auto mt-20">
              <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress"
                  style={{ width: "75%" }}
                />
              </div>
            </div> */}

            {/* Newsletter Signup */}
            <div className="max-w-md  my-5 mx-auto">
              <button
                onClick={() => {
                  redirect("/");
                }}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300"
              >
                Go back
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
