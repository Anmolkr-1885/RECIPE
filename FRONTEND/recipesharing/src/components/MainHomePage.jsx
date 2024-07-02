import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import LikeButton from "./Likefunction.jsx";
import { FaHeart, FaComment } from "react-icons/fa";

const MainHomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
        const response = await axios.get(
          "http://localhost:8001/api/v1/recipe/getrecipes",
          {
            params: { populateAuthor: true },
          }
        );
        setRecipes(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Error fetching recipes. Please try again later.");
      }
    };

    fetchAllRecipes();
  }, []);
  const likes = 0;
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Recipe Sharing Platform</h1>
          </div>
          <div>
            
            <Link
              to="http://localhost:5173/add-recipe"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Recipe
            </Link>
          </div>
          <div>
            {/* Profile Button */}
            <Link
              to="http://localhost:5173/Profile"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <p className="text-xl">Welcome to the Recipe Sharing Platform!</p>
          <p className="text-gray-600">
            Here you can view recipes, photos, and connect with friends.
          </p>
         
        </div>
        <div className="w-full lg:w-2/3 px-20">
          <div className="">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe._id}>
                  <div className="max-w-md md:max-w-2xl lg:max-w-4xl w-full rounded overflow-hidden shadow-lg bg-white m-4">
                    <div className="flex items-center p-4 h-17">
                      <img
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full mr-4"
                        src={recipe.author.profilePicture}
                        alt="Profile"
                        
                      />
                      <div className="text-base md:text-lg">
                        <p className="text-gray-900 leading-none">
                          <Link
                            to={`/authorprofile/${recipe.author._id}`}
                            className="font-bold text-blue-500 hover:underline"
                          >
                            {recipe.author.username}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <img
                      className="w-full h-64 md:h-80 object-cover"
                      src={recipe.imageUrl}
                      alt="Recipe"
                    />
                    <div className="px-6 py-1">
                      <div className="font-bold text-2xl md:text-3xl mb-2">
                        {recipe.title}
                      </div>
                      <p className="text-gray-700 text-base md:text-lg mb-4">
                        {recipe.description}
                      </p>
                      <div className="text-gray-700 text-base md:text-lg">
                        <p className="mb-1">
                          <span className="font-semibold">Ingredients:</span>{" "}
                          {recipe.ingredients}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Cooking Time:</span>{" "}
                          {recipe.cookingTime}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Cuisine Type:</span>{" "}
                          {recipe.cuisineType}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">
                            Difficulty Level:
                          </span>{" "}
                          {recipe.difficulty}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">
                            Dietary Restrictions:
                          </span>{" "}
                          {recipe.dietaryRestrictions}
                        </p>
                      </div>
                    </div>
                    <div className="px-8 py-1 flex items-center justify-between">
                      <LikeButton recipeId={recipe._id} />
                      {/* <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-600 hover:text-red-500">
            <FaHeart className="mr-1" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-500">
            <FaComment className="mr-1" />
            <span>{comments}</span>
          </button>
        </div> */}
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Comment ({recipe.comments.length})
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <p>{error}</p>
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainHomePage;
