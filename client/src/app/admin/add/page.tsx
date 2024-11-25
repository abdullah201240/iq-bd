'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';


const AdminTable = dynamic(() => import('@/components/AdminTable'), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    role: '',



  });

  useEffect(() => {
    const checkSession = async () => {
      const storedUserInfo = localStorage.getItem('sessionToken');
      if (!storedUserInfo) {
        router.push('/admin/login');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/me`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${storedUserInfo}`,
            },
          }
        );

        if (!response.ok) {
          router.push('/admin/login');
          return;
        }



      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/admin/login');
      }
    };

    checkSession();
  }, [router]);

  // Handling form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const storedUserInfo = localStorage.getItem('sessionToken');

    if (!storedUserInfo) {
      router.push('/admin/login');
      return;
    }

    try {
      const form = new FormData();
      form.append('name', formData.name);  // Corrected key for video title
      form.append('email', formData.email);

      form.append('phone', formData.phone);
      form.append('dob', formData.dob);

      form.append('gender', formData.gender);
      form.append('role', formData.role);






      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/createAdmin`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storedUserInfo}`,
        },
        body: form,
      });
      console.log(form)

      if (!response.ok) {
        toast.error('Error updating data'); // Displays a success message

        console.error('Error updating data');
      } else {
        toast.success('Data Added successfully!'); // Displays a success message

        console.log('Data Added successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
  
    if (target) {
      const { name, value } = target;
  
      // Type check to ensure 'files' exists only for file input elements
      const newValue = target instanceof HTMLInputElement && target.files
        ? target.files[0] // For file input, use the first file
        : value; // For other inputs (e.g., text), use the input's value
  
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };
  


  return (
    <div>
      <div className="bg-gray-100 py-12">
        <div className="max-w-3xl mx-auto bg-white border-2 border-[#F17B21] rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black">Testimonial</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-10">




            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label htmlFor="Title" className="block text-gray-900 font-semibold mb-2">
                  Name
                </label>
                <input
                  id="Name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="Designation" className="block text-gray-900 font-semibold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                />
              </div>

            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label htmlFor="Phone" className="block text-gray-900 font-semibold mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="dob" className="block text-gray-900 font-semibold mb-2">
                  Dob
                </label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Dob"
                  className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                />
              </div>

            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label htmlFor="Gender" className="block text-gray-900 font-semibold mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="w-1/2">
                <label htmlFor="role" className="block text-gray-900 font-semibold mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                >
                  <option value="" disabled>Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>




            <button
              type="submit"
              className="w-full py-4 bg-[#F17B21] text-black font-bold rounded-md focus:outline-none hover:bg-[#f18c48]"
            >
              Add
            </button>
          </form>
        </div>

      </div>
      <div className='pb-10'>


        <AdminTable />

      </div>


    </div>
  );
}
