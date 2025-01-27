"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaCalendarAlt,
  FaHeartbeat,
  FaAllergies,
  FaCheckCircle,
  FaTimesCircle,
  FaGenderless,
} from "react-icons/fa";
import { MdPhotoCamera, MdEdit } from "react-icons/md";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";
import { InputTags } from "@/components/appointments";

const Profile = () => {
  // const { user, update } = useUserStore();
  // const { toast } = useToast();
  // const [allergies, setAllergies] = useState([]);

  // const [formData, setFormData] = useState({
  //   uid: "",
  //   name: "",
  //   email: "",
  //   role: "",
  //   age: "",
  //   contact: "",
  //   address: "",
  //   gender: "",
  //   city: "",
  //   existingDiseases: [],
  //   allergies: [],
  //   isDiabetic: "",
  //   isPregnant: "",
  //   isBP: "",
  //   profilePicture: "",
  // });

  // const [isEditing, setIsEditing] = useState(false);
  // const [newProfilePicture, setNewProfilePicture] = useState(null);
  // const fileInputRef = useRef(null);

  // useEffect(() => {
  //   if (!user) {
  //     fetchAndSetUserStore((user) => {
  //       setFormData({
  //         uid: user._id || formData.uid,
  //         name: user.name || formData.name,
  //         email: user.email,
  //         age: user.profile.age || formData.age,
  //         contact: user.profile.contact || formData.contact,
  //         address: user.profile.address || formData.address,
  //         gender: user.profile.gender || formData.gender,
  //         city: user.profile.city || formData.city,
  //         existingDiseases:
  //           user.profile.existingDiseases || formData.existingDiseases,
  //         allergies: user.profile.allergies || formData.allergies,
  //         isDiabetic: user.profile.isDiabetic || formData.isDiabetic,
  //         isPregnant: user.profile.isPregnant || formData.isPregnant,
  //         isBP: user.profile.isBP || formData.isBP,
  //         profilePicture:
  //           user.avatar ||
  //           "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account",
  //       });
  //     });
  //   }
  // }, [user]);

  const [selectedImg,setSelectedImg]=useState()

  const { user, update } = useUserStore();
  const { toast } = useToast();
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [existingDiseases, setExistingDiseases] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [isDiabetic, setIsDiabetic] = useState("");
  const [isPregnant, setIsPregnant] = useState("");
  const [isBP, setIsBP] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!user) {
      fetchAndSetUserStore((user) => {
        setName(user.name || "");
        setEmail(user.email || "");
        setAge(user.profile.age || "");
        setContact(user.profile.contact || "");
        setAddress(user.profile.address || "");
        setGender(user.profile.gender || "");
        setCity(user.profile.city || "");
        setExistingDiseases(user.profile.existingDiseases || []);
        setAllergies(user.profile.allergies || []);
        setIsDiabetic(user.profile.isDiabetic || "");
        setIsPregnant(user.profile.isPregnant || "");
        setIsBP(user.profile.isBP || "");
        setProfilePicture(
          user.avatar ||
            "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account"
        );
      });
    }
  }, [user]);

  useEffect(() => {
    console.log("Current form data:");
    console.log({
      name,
      email,
      contact,
      address,
      city,
      age,
      gender,
      existingDiseases,
      allergies,
      isDiabetic,
      isPregnant,
      isBP,
    });

    console.log("aller", allergies);
  }, [
    name,
    email,
    contact,
    address,
    city,
    age,
    gender,
    existingDiseases,
    allergies,
    isDiabetic,
    isPregnant,
    isBP,
  ]);



  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setNewProfilePicture(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  //TOOD: FIX 
 
  const handleEditClick = async () => {
    if (isEditing) {
      try {
        // Create FormData instance
        // const formDataToSend = new FormData();
        // // Append non-file fields
        // formDataToSend.append("age", age);
        // formDataToSend.append("contact", contact);
        // formDataToSend.append("address", address);
        // formDataToSend.append("gender", gender);
        // formDataToSend.append("city", city);
        // formDataToSend.append(
        //   "existingDiseases",
        //   existingDiseases
        // );
        // formDataToSend.append("allergies", allergies);
        // formDataToSend.append("isDiabetic", isDiabetic);
        // formDataToSend.append("isPregnant", isPregnant);
        // formDataToSend.append("isBP", isBP);
        const formDataToSend = {
          age,
          contact,
          address,
          city,
          gender,
          existingDiseases,
          allergies,
          isDiabetic,
          isPregnant,
          isBP,
        };
        console.log(formDataToSend)
        // Handle profile picture
        // if (newProfilePicture) {
        //   const response = await apiClient.patch("/users/profile", 
            
        //   );
        //   // const blob = await response.blob();
        //   // const file = new File([blob], "profile-picture.jpg", {
        //   //   type: blob.type,
        //   // });
        //   // formDataToSend.append("avatar", file);
        // } else if (profilePicture) {
        //   // If no new picture, append the existing picture URL or identifier
        //   formDataToSend.append("avatar", profilePicture);
        // }

        // Debugging: Log FormData entries
        // for (let pair of formDataToSend.entries()) {
        //   console.log(`${pair[0]}: ${pair[1]}`);
        // }

        // Send the request
        await apiClient.patch("/users/profile", formDataToSend);

        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          variant: "success",
        });

        // Update user data in the store
        fetchAndSetUserStore((updatedUser) => {
          setName(updatedUser.name || "");
          setEmail(updatedUser.email || "");
          setAge(updatedUser.profile.age || "");
          setContact(updatedUser.profile.contact || "");
          setAddress(updatedUser.profile.address || "");
          setGender(updatedUser.profile.gender || "");
          setCity(updatedUser.profile.city || "");
          setExistingDiseases(updatedUser.profile.existingDiseases || []);
          setAllergies(updatedUser.profile.allergies || []);
          setIsDiabetic(updatedUser.profile.isDiabetic || "");
          setIsPregnant(updatedUser.profile.isPregnant || "");
          setIsBP(updatedUser.profile.isBP || "");
          setProfilePicture(
            updatedUser.avatar ||
              "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account"
          );
        });

        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Update failed.",
          description: "There was a problem updating your profile.",
          variant: "destructive",
        });
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center w-full lg:w-1/3">
          <div className="h-72 w-72 p-2 flex justify-center items-center overflow-hidden rounded-full shadow-md bg-white border">
            <img
              src={selectedImg}
              alt="Profile"
              className="object-cover w-full h-full bg-white rounded-full"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-center text-2xl font-bold">{name}</h2>
          </div>
          <div className="mt-6 flex flex-col justify-center items-center px-4">
            <label
              htmlFor="image-upload"
              className="mb-2 text-base text-gray-700 font-medium"
            >
              Upload New Image
            </label>
            <input
              type="file"
              id="image-upload"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) =>{
                const file =e.target.files?.[0];
                setSelectedImg(file? URL.createObjectURL(file):undefined)
              } }
            />
            <button
              className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer"
              onClick={triggerFileInput}
            >
              <MdPhotoCamera className="h-5 w-5 inline" /> Choose Image
            </button>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between px-4">
            <h1 className="text-3xl font-bold">Profile Details</h1>
            <button
              className="w-40 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={handleEditClick}
            >
              {isEditing ? (
                <FaCheckCircle className="h-5 w-5 inline" />
              ) : (
                <MdEdit className="h-5 w-5 inline" />
              )}{" "}
              {isEditing ? "Save Changes" : "Edit"}
            </button>
          </div>
          <form className="p-4 space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                disabled={true}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-[rgba(0,0,0,0.1)] cursor-not-allowed outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Phone Number</label>
              <input
                type="tel"
                name="contact"
                required
                maxLength={10}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Address</label>
              <textarea
                name="address"
                required
                rows={5}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">City</label>
              <input
                type="text"
                name="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Health Details Section */}
      <div className="mt-10 w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold mb-4">Health Details</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="h-6 w-6 text-gray-500" />
            <div>
              <label className="font-medium">Age:</label>
              <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={!isEditing}
                className="ml-2 px-2 py-1 border rounded-md"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-medium">Gender:</label>
            <div className="relative w-full">
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {gender === "M" ? (
                  <BsGenderMale className="h-6 w-6 text-gray-500" />
                ) : gender === "F" ? (
                  <BsGenderFemale className="h-6 w-6 text-gray-500" />
                ) : (
                  <FaGenderless className="h-6 w-6 text-gray-500" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaHeartbeat className="h-6 w-6 text-gray-500" />
            <div>
              <label className="font-medium">Existing Diseases:</label>
              <InputTags value={existingDiseases} onChange={setExistingDiseases} ref={ref} disabled={!isEditing} id="existingDiseases"/>
            </div>
          </div>
          <div className="overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
            <div className="flex items-center space-x-2">
              <FaAllergies className="h-6 w-6 text-gray-500" />
              <div>
                <label className="font-medium">Allergies:</label>
                <InputTags value={allergies} onChange={setAllergies} ref={ref} disabled={!isEditing} id="allergies"/>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isDiabetic === "true" ? (
              <FaCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <FaTimesCircle className="h-6 w-6 text-red-500" />
            )}
            <div>
              <label className="font-medium">Diabetic:</label>
              <select
                name="isDiabetic"
                value={isDiabetic}
                onChange={(e) => setIsDiabetic(e.target.value)}
                disabled={!isEditing}
                className="ml-2 px-2 py-1 border rounded-md"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isPregnant === "true" ? (
              <FaCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <FaTimesCircle className="h-6 w-6 text-red-500" />
            )}
            <div>
              <label className="font-medium">Pregnant:</label>
              <select
                name="isPregnant"
                value={isPregnant}
                onChange={(e) => setIsPregnant(e.target.value)}
                disabled={!isEditing}
                className="ml-2 px-2 py-1 border rounded-md"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isBP === "true" ? (
              <FaCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <FaTimesCircle className="h-6 w-6 text-red-500" />
            )}
            <div>
              <label className="font-medium">Blood Pressure:</label>
              <select
                name="isBP"
                value={isBP}
                onChange={(e) => setIsBP(e.target.value)}
                disabled={!isEditing}
                className="ml-2 px-2 py-1 border rounded-md"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
