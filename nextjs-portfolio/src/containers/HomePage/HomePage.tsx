'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import Slider from '@/components/Slider';
import ContactForm from '@/components/ContactForm';
import BlogListComponent from '@/components/BlogList/BlogListComponent';
import { BlogPost } from '@/models/BlogCardModel';
import { SanityDocument } from 'next-sanity';

type IProps = {
  data: SanityDocument<BlogPost>[];
};

const sliderImages = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
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
const HomePageContainer = ({ data }: IProps) => {
  console.log('Home Page Data:', data);
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
                I am a creative developer passionate about building beautiful,
                responsive, and user-friendly web experiences. Let us turn your
                ideas into reality.
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
              <div className="relative w-full h-96">
                <Image
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop"
                  alt="Portfolio showcase"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
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
          <BlogListComponent listData={data} />
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
