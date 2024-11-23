import React from 'react';

export default function AboutForm() {
    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-3xl mx-auto bg-white border-2 border-[#F17B21] rounded-lg shadow-lg p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
                </div>

                <form className="mt-10">
                    {/* Home Title */}
                    <div className="flex gap-4 mb-6">
                        <div className="w-1/2">
                            <label htmlFor="homeTitle" className="block text-gray-900 font-semibold mb-2">
                                Home Title
                            </label>
                            <input
                                id="homeTitle"
                                type="text"
                                name="homeTitle"
                                placeholder="Home Title"
                                className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                            />
                        </div>
                        {/* Home Image */}
                       
                        <div className="w-1/2">
                            <label htmlFor="homeVideoUrl" className="block text-gray-900 font-semibold mb-2">
                                Home Video URL
                            </label>
                            <input
                                id="homeVideoUrl"
                                type="url"
                                name="homeVideoUrl"
                                placeholder="Home Video URL"
                                className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
    <label htmlFor="homeImage" className="block text-gray-900 font-semibold mb-2">
        Home Image
    </label>
    <input
        id="homeImage"  // Ensured id is consistent
        type="file"
        name="homeImage"
        className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none bg-white text-black
        file:border file:border-gray-400 file:rounded-md file:bg-white"
    />
</div>

                    {/* Home Description */}
                    <div className="mb-6">
                        <label htmlFor="homeDescription" className="block text-gray-900 font-semibold mb-2">
                            Home Description
                        </label>
                        <textarea
                            id="homeDescription"
                            name="homeDescription"
                            placeholder="Home Description"
                            className="w-full p-4 h-40 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none resize-none placeholder-gray-600 text-gray-900"
                        ></textarea>
                    </div>

                    {/* Home Video */}
                    <div className="flex gap-4 mb-6">
                        <div className="w-1/2">
                            <label htmlFor="homeVideoTitle" className="block text-gray-900 font-semibold mb-2">
                                Title
                            </label>
                            <input
                                id="Title"
                                type="text"
                                name="Title"
                                placeholder="Title"
                                className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                            />
                        </div>
                        
                        <div className="w-1/2">
                            <label htmlFor="homeVideoUrl" className="block text-gray-900 font-semibold mb-2">
                                Video URL
                            </label>
                            <input
                                id="VideoUrl"
                                type="url"
                                name="VideoUrl"
                                placeholder="Video URL"
                                className="w-full p-4 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none placeholder-gray-600 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
    <label htmlFor="homeVideoFile" className="block text-gray-900 font-semibold mb-2">
        Image
    </label>
    <input
        id="homeVideoFile"  // Updated to match the label
        type="file"
        name="homeVideoFile"
        accept="image/*"
        className="w-full p-4 rounded-md bg-white border 
        border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none 
        file:border file:border-gray-400 file:rounded-md file:bg-white text-black"
    />
</div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-900 font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            id="Description"
                            name="Description"
                            placeholder="Description"
                            className="w-full p-4 h-40 rounded-md border border-gray-400 focus:border-[#F17B21] focus:ring-2 focus:ring-[#F17B21] focus:outline-none resize-none placeholder-gray-600 text-gray-900"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#F17B21] text-black font-semibold text-lg rounded-lg hover:bg-[#D87D1E] transition duration-300"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
