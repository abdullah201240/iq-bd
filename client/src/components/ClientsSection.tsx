import Image from "next/image";
import img from "@/app/assets/img/macbook.png"
const clients = [
  {
    id: 1,
    src: img, 
    alt: "British American Tobacco",
  },
  {
    id: 2,
    src: img, 
    alt: "United Commercial Bank Ltd",
  },
  {
    id: 3,
    src: img, 
    alt: "American International School",
  },
  {
    id: 4,
    src: img, 
    alt: "Kudos Restaurant Dhaka",
  },
  {
    id: 5,
    src: img, 
    alt: "Chartered Life Second Life",
  },
  {
    id: 6,
    src: img, 
    alt: "Le Petit Child Care Center",
  },
  {
    id: 7,
    src: img, 
    alt: "Bengal Commercial Bank",
  },
  {
    id: 8,
    src: img, 
    alt: "Le Petit Child Care Center",
  },
];

const ClientsSection = () => {
  return (
    <div className="py-12 bg-black">
      <h2 className="text-center text-2xl font-bold mb-8 text-white">Our Clients</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center justify-center border border-gray-300 p-4"
          >
            <Image
              src={client.src}
              alt={client.alt}
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsSection;
