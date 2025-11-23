// components/FeatureSections.tsx
import React from 'react';

// Define types for data
interface Media {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

interface Button {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary';
}

interface FeatureSectionData {
  title: string;
  subtitle?: string;
  description: string;
  bullets?: string[];
  media: Media;
  button?: Button;
  buttons?: Button[];
}

// Sample JSON data - in real app, import from /data/services.json
const featureData: FeatureSectionData[] = [
  {
    title: 'Watch Our Video',
    description: 'Qolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
    media: {
      type: 'video',
      url: '/videos/sample-video.mp4', // Replace with actual video URL
      alt: 'Play video'
    },
    button: {
      text: 'About Us',
      link: '/about',
      variant: 'primary'
    }
  },
  {
    title: 'We Offer a Full Range of Digital Marketing Services!',
    subtitle: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.',
    description: 'Qolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    bullets: [
      'Qolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh',
      'Investig ationes demonst raven turun tlectores leg ere me lius quod',
      'Dam liber tem por cum soluta nobis eleifend option congue nihil',
      'Quarta decima et quinta.'
    ],
    media: {
      type: 'image',
      url: '/images/services-illustration.jpg', // Replace with actual image URL
      alt: 'Digital marketing services illustration'
    },
    buttons: [
      {
        text: 'Learn More',
        link: '/services',
        variant: 'secondary'
      },
      {
        text: 'Get A Quote',
        link: '/quote',
        variant: 'primary'
      }
    ]
  }
  // Add more sections as needed, layouts will alternate automatically
];

const FeatureSection: React.FC<{ data: FeatureSectionData; isReversed: boolean }> = ({ data, isReversed }) => {
  const renderMedia = () => {
    if (data.media.type === 'video') {
      return (
        <div className="relative">
          <video
            className="w-full h-64 md:h-80 object-cover rounded-lg"
            src={data.media.url}
            poster="/images/video-poster.jpg" // Optional poster image
            controls
          >
            Your browser does not support the video tag.
          </video>
          {/* Overlay play button if needed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-green-500 text-white rounded-full p-4 shadow-lg">
              ▶
            </button>
          </div>
        </div>
      );
    }
    return (
      <img
        src={data.media.url}
        alt={data.media.alt || 'Feature media'}
        className="w-full h-64 md:h-80 object-cover rounded-lg"
      />
    );
  };

  const renderContent = () => (
    <div className={`space-y-4 ${isReversed ? 'text-right' : ''}`}>
      <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>
      {data.subtitle && <div className="w-16 h-1 bg-teal-500 mx-auto md:mx-0" />}
      <p className="text-gray-600 leading-relaxed">{data.description}</p>
      {data.bullets && (
        <ul className="space-y-2">
          {data.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-orange-500 mr-2">✓</span>
              <span className="text-gray-600">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      <div className={`flex flex-col sm:flex-row gap-4 ${isReversed ? 'sm:justify-end' : ''}`}>
        {data.button && (
          <a
            href={data.button.link}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              data.button.variant === 'primary'
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-teal-500 text-white hover:bg-teal-600'
            }`}
          >
            {data.button.text}
          </a>
        )}
        {data.buttons &&
          data.buttons.map((btn, idx) => (
            <a
              key={idx}
              href={btn.link}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                btn.variant === 'primary'
                  ? 'bg-teal-500 text-white hover:bg-teal-600'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {btn.text}
            </a>
          ))}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {isReversed ? (
          <>
            {renderContent()}
            {renderMedia()}
          </>
        ) : (
          <>
            {renderMedia()}
            {renderContent()}
          </>
        )}
      </div>
    </section>
  );
};

const FeatureSections: React.FC = () => {
  return (
    <div>
      {featureData.map((section, index) => (
        <FeatureSection
          key={index}
          data={section}
          isReversed={index % 2 === 1} // Alternate: even index normal, odd reversed
        />
      ))}
    </div>
  );
};

export default FeatureSections;