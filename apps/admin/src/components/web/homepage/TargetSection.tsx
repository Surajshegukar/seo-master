
const seoData = {
  title: "Affordable SEO Services Packages",
  subtitle: "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.",
  sections: [
    {
      id: 1,
      title: "Objectives",
      description: "Investigationsnes demonstravunt lectores legere me lius quod ii legunt saepius.",
      icon: "target", // Yellow target icon
      color: "#FFD700" // Gold/Yellow
    },
    {
      id: 2,
      title: "Strategy",
      description: "Dolor sit amet, consectetur adipiscing elit.",
      icon: "strategy", // Red strategy arrows
      color: "#FF4500" // OrangeRed
    },
    {
      id: 3,
      title: "Technology",
      description: "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer.",
      icon: "robot", // Blue robot with plug
      color: "#4169E1" // Royal Blue
    },
    {
      id: 4,
      title: "Analytics",
      description: "Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.",
      icon: "analytics", // Green graph
      color: "#32CD32" // Lime Green
    }
  ],
  buttons: [
    {
      text: "MORE INFO",
      variant: "dark"
    },
    {
      text: "GET STARTED!",
      variant: "teal"
    }
  ]
};

// Simple SVG icon components (placeholders matching the design)
const TargetIcon =  ({ color }: { color: string })=> (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill={color} />
    <path d="M30 15 L30 30 M15 30 L30 30 M30 30 L45 45" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const StrategyIcon =  ({ color }: { color: string })=> (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill={color} />
    <path d="M15 20 L25 30 M25 30 L15 40 M35 20 L45 30 M45 30 L35 40 M20 10 L40 50 M20 50 L40 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const RobotIcon = ({ color }: { color: string }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill={color} />
    <circle cx="25" cy="25" r="3" fill="white" />
    <circle cx="35" cy="25" r="3" fill="white" />
    <rect x="22" y="35" width="16" height="10" rx="2" fill="white" />
    <line x1="20" y1="40" x2="15" y2="40" stroke="white" strokeWidth="3" />
    <line x1="45" y1="40" x2="50" y2="40" stroke="white" strokeWidth="3" />
  </svg>
);

const AnalyticsIcon = ({ color }: { color: string }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill={color} />
    <path d="M20 40 L25 30 L30 35 L35 25 L40 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMap: Record<string, React.FC<{ color: string }>> = {
  target: TargetIcon,
  strategy: StrategyIcon,
  robot: RobotIcon,
  analytics: AnalyticsIcon
};

const FeatureSections: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-full w-full bg-white rounded-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{seoData.title}</h1>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-teal-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 mb-12 text-lg">{seoData.subtitle}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {seoData.sections.map((section) => {
              const IconComponent = IconMap[section.icon];
              return (
                <div key={section.id} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4">
                    <IconComponent color={section.color} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {seoData.buttons.map((button, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  button.variant === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-900'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureSections;