import React, { useState } from "react";
import axios from "axios";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // ingredients: "",
    instructions: "",
    category: "",
    cookingTime: "",
    difficulty: "",
    cuisineType: "",
    dietaryRestrictions: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]);
    } else if (e.target.name === "video") {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("image", imageFile);
    data.append("video", videoFile);

    try {
      const jwtToken = localStorage.getItem('jwtToken');
            if (!jwtToken) {
                throw new Error('User not authenticated');
            }
      const response = await axios.post("http://localhost:8001/api/v1/recipe/recipe_upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 bg-gray-500 text-center">Add a New Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            ></textarea>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              // required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cooking Time In Minutes</label>
            <input
              type="text"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <input
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cuisine Type (Veg or Non-Veg)</label>
            <input
              type="text"
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipe Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipe Video</label>
            <input
              type="file"
              name="video"
              onChange={handleFileChange}
              
              className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300 "
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
            >
              Add Recipe
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
  
};

export default AddRecipeForm;
