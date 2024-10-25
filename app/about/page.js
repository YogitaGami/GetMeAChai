import React from 'react'
// import { metadata } from "next";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Get Me a Chai</h1>
        <p className="mb-8">
          Get Me a Chai is a crowdfunding platform designed for creators to fund their projects
          with the support of their fans. It's a space where your fans can directly contribute
          to your creative endeavors by buying you a chai. Unlock the potential of your fanbase and
          bring your projects to life.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="flex items-start space-x-4">
            <div className="text-yellow-300">
              {/* Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v10m8-7l-8 8-8-8" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Fans Want to Collaborate</h3>
              <p>Your fans are enthusiastic about collaborating with you on your projects.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits for Creators</h2>
          <ul className="space-y-2">
            <li>Direct financial support from your fanbase</li>
            <li>Engage with your fans on a more personal level</li>
            <li>Access to a platform tailored for creative projects</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits for Fans</h2>
          <ul className="space-y-2">
            <li>Directly contribute to the success of your favorite creators</li>
            <li>Exclusive rewards and perks for supporting creators</li>
            <li>Be part of the creative process and connect with creators</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Collaboration</h2>
          <ul className="space-y-2">
            <li>Unlock new opportunities through collaboration with fellow creators</li>
            <li>Expand your network and reach a wider audience</li>
            <li>Combine skills and resources to create innovative projects</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
          <p>Engage with a supportive community of like-minded individuals.</p>
        </section>
      </section>
    </div>
  )
}

export default About


// Static metadata
export const metadata = {
  title: 'About - Get Me A Chai',
}