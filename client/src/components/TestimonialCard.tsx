import Image from "next/image";

interface TestimonialCardProps {
  image: string; // URL of the image
  name: string;  // Name of the person
  title: string; // Title or position of the person
  text: string;  // Testimonial text
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, title, text }) => (
  <div className="flex flex-col items-start p-6 border border-black rounded-lg shadow-md min-h-[200px]">
    {/* Profile Section: Image, Name, and Title */}
    <div className="flex items-center space-x-4">
      {/* Profile Image */}
      <Image
        alt={`${name}'s profile`}
        src={image}
        width={64}  // Defined width
        height={64} // Defined height
        className="rounded-full object-cover border-2 border-black"
      />
      <div>
        {/* Name and Title */}
        <p className="text-lg font-semibold text-black">{name}</p> 
        <p className="text-sm text-black">{title}</p>
      </div>
    </div>

    {/* Testimonial Text */}
    <p className="mt-4 text-center text-black">{text}</p>
  </div>
);

export default TestimonialCard;
