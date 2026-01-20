import Button from '@/components/Button';

const NotFoundComponent = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-amber-50">
      <h1 className="text-4xl font-bold text-center mt-20 text-gray-500">
        404 - Page Not Found
      </h1>
      <p className="text-center mt-4 text-gray-800">
        The blog post you are looking for does not exist.
      </p>
      {/* Back to blog list page */}
      <div className="text-center mt-8">
        <Button
          variant="primary"
          size="lg"
          href="/blog"
          className="text-center justify-center"
        >
          Back to Blog
        </Button>
      </div>
    </div>
  );
};

export default NotFoundComponent;
