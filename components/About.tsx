import React from 'react';

export default function About() {
  const team = [
    {
      name: "Prakhar Bhatia",
      role: "Lead Developer & Founder",
      description: "Full-stack developer with expertise in modern web technologies and a passion for creating exceptional digital experiences.",
      skills: ["React", "Next.js", "Python", "Node.js"]
    },
    {
      name: "Creative Team",
      role: "Design & Development",
      description: "Our diverse team of designers and developers work together to bring innovative solutions to life.",
      skills: ["UI/UX", "Mobile Dev", "Backend", "DevOps"]
    }
  ]

  const stats = [
    { number: "5000+", label: "Projects Completed" },
    { number: "340+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" }
  ]

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-gradient">Nandann Creative Agency</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're a passionate team of developers, designers, and strategists 
            dedicated to creating digital solutions that make a difference.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Founded with a vision to bridge the gap between creativity and technology, 
                Nandann Creative Agency has been transforming ideas into powerful digital 
                solutions for over 10 years.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that great digital experiences are born from the perfect blend 
                of innovative design, robust technology, and deep understanding of user needs. 
                That's what drives us every day.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-gray-300">Modern Technology Stack</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-gray-300">Agile Development Process</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-gray-300">Client-Focused Approach</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-gray-300">Ongoing Support & Maintenance</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h3>
            <p className="text-lg text-gray-300">
              Passionate professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass rounded-3xl p-8 hover-lift">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <div className="text-blue-400 font-medium mb-4">{member.role}</div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {member.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="glass-dark px-3 py-1 rounded-full text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 