'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import Slider from '@/components/Slider';
import ContactForm from '@/components/ContactForm';
import BlogListComponent from '@/components/BlogList/BlogListComponent';
import { BlogPost, ProfileDetails } from '@/models/BlogCardModel';
import { SanityDocument } from 'next-sanity';
import { urlForImage } from '@/helpers/sanity.helper';

type IProps = {
  data: SanityDocument<{
    blogData: BlogPost[];
    profile: ProfileDetails;
  }>;
};

const sliderImages = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1660054591552-3c888d8e5319?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1554353036-304ec9477b1b?w=1200&h=600&fit=crop',
];
const recentProjects = [
  {
    id: 1,
    title: 'Project One',
    category: 'Web Design',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Project Two',
    category: 'Mobile App',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Project Three',
    category: 'Branding',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
  },
];
const profileImageBlockDiv = {
  clipPath:
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  background:
    'linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(99,102,241,1) 100%)',
  padding: '6px',
  boxShadow: '0 20px 40px rgba(99,102,241,0.20), 0 6px 12px rgba(0,0,0,0.08)',
  filter: 'drop-shadow(0 10px 30px rgba(99,102,241,0.18))',
  borderRadius: '8px', // small rounding to soften edges a bit
};

const profileImageInnerDiv = {
  clipPath:
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  background: '#ffffff',
  boxShadow: 'inset 0 6px 18px rgba(0,0,0,0.06)',
};
const HomePageContainer = ({ data }: IProps) => {
  console.log('Home Page Data:', data);
  const { blogData, profile } = data;
  const profileImageURL = urlForImage(profile?.profileImage);
  return (
    <div className="bg-white">
      {/* Hero Banner Section */}
      <section className="bg-linear-to-br from-violet-600 to-violet-800 text-white py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to My Portfolio
              </h1>
              <p className="text-lg md:text-xl text-violet-100 leading-relaxed">
                {profile?.bio ||
                  'I am a passionate developer specializing in creating beautiful and functional web applications. Explore my work and get in touch!'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="text-center justify-center"
                >
                  View My Work
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-center justify-center bg-white text-violet-600 hover:bg-violet-50 border-2 border-white"
                >
                  Get In Touch
                </Button>
              </div>
            </div>

            {/* Right Side - Decorative Image */}
            <div className="hidden md:block">
              <div className="relative w-full h-96 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                {/* Outer octagon (acts as border) with shadow */}
                <div className="w-full h-full" style={profileImageBlockDiv}>
                  {/* Inner octagon (image container) */}
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={profileImageInnerDiv}
                  >
                    <Image
                      src={
                        profileImageURL ||
                        'https://via.placeholder.com/400x400?text=No+Image'
                      }
                      alt="Portfolio showcase"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Slider */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 text-lg">
              Take a look at some of my recent work
            </p>
          </div>

          <Slider
            images={sliderImages}
            autoPlay={true}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* Quick Portfolio Preview */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-violet-600 bg-opacity-0 group-hover:bg-opacity-75 transition duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="md"
                      className="opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-violet-600 font-semibold text-sm mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              href="posts"
              className="text-center justify-center"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Blog section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <BlogListComponent listData={blogData} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-violet-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <p className="text-violet-100 text-lg">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
              <p className="text-violet-100 text-lg">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
              <p className="text-violet-100 text-lg">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <p className="text-violet-100 text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  );
};

export default HomePageContainer;
