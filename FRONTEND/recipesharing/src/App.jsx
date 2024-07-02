import { BrowserRouter, Route, Routes } from "react-router-dom"
import  Home  from "./components/Home.jsx";
 import About  from "./components/About.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx"
import Profile from "./components/Profile.jsx";
import MainHomePage from "./components/MainHomePage.jsx";
import SavedRecipes from "./components/SavedRecipes.jsx";
import AuthorProfile from "./components/Authorprofile.jsx"
import Trial from "./components/Trial.jsx";
import './App.css'; 
import AddRecipeForm from "./components/AddRecipe.jsx";
import UpdateProfile from "./components/EditProfile.jsx";
import EditProfilePicture from "./components/ChangeProfile.jsx";

const App = () =>{
return <>
    <BrowserRouter>

   <Routes>
   <Route  path ="/" element={<Home />} />
   <Route path="/Register" element={<Register />} />
   <Route path="/login" element={<Login />} />
   <Route path="/Profile" element={<Profile />} />
   <Route path="/MainHomePage" element = {<MainHomePage />} />
   <Route path="/savedRecipes" element = {<SavedRecipes />} />
   <Route path="/authorprofile/:authorId" element={<AuthorProfile />} />
   <Route path="/trial" element={<Trial />} />
   <Route path="/add-recipe" element={<AddRecipeForm />} />
   <Route path="/edit-Profile" element={<UpdateProfile />} />
   <Route path="/change-profile" element={<EditProfilePicture />} />
      </Routes>

    </BrowserRouter>
</>
}

export default App;