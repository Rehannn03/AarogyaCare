"use client"
import React, { useEffect, useState } from "react"
import apiClient from "@/api-client/apiClient"
import { useUserStore } from "@/stores/store"
import { FaCheckCircle } from "react-icons/fa"
import { MdEdit, MdPhotoCamera } from "react-icons/md"
import { useToast } from "@/components/ui/use-toast"

import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore"
import { useCurrent } from "@/features/getCurrent"
// import { MdPhotoCamera } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa";
// {
//     "_id": "66afb3a35544ce36a1331daa",
//     "userId": {
//         "_id": "66a380a720df8be3620b8437",
//         "name": "Rehan",
//         "email": "rehan@gmail.com",
//         "profile": {
//             "age": 40,
//             "contact": "9876543219",
//             "address": "Powai",
//             "gender": "M",
//             "city": "Mumbai"
//         },
//         "avatar": "https://res.cloudinary.com/projectbackend/image/upload/v1722080184/mxu2ofc6hfors31aniwz.jpg"
//     },
//     "specialization": "Cardiologist",
//     "experience": 5,
//     "qualification": "M.B.B.S MD",
//     "consultationFee": 300,
//     "rating": 0,
//     "reviews": 0,
//     "verified": true,
//     "degree": "https://res.cloudinary.com/projectbackend/image/upload/v1713959229/npgrhrclmnwfn2czr2ry.jpg"
// }

const page = () => {
  const { user } = useUserStore()
  const [doctor, setDoctor] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [age, setAge] = useState(0)
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [city, setCity] = useState("")
  const [avatar, setAvatar] = useState("")
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState(0)
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState(0)
  const [qualification, setQualification] = useState("")
  const [consultationFee, setConsultationFee] = useState(0)
  const [degree, setDegree] = useState("")

  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = React.createRef()
  const { toast } = useToast()

  const {User,isPending}=useCurrent()

  console.log(User);
  
  // useEffect(() => {
  //   console.log(user);
  // }
  // ,[user]);

  const setData = (data) => {
    console.log("data", data)
    setName(data.userId.name)
    setEmail(data.userId.email)
    setAge(data.userId.profile.age)
    setContact(data.userId.profile.contact)
    setAddress(data.userId.profile.address)
    setCity(data.userId.profile.city)
    setGender(data.userId.profile.gender)
    setAvatar(data.userId.avatar)
    setSpecialization(data.specialization)
    setExperience(data.experience)
    setQualification(data.qualification)
    setConsultationFee(data.consultationFee)
    setRating(data.rating)
    setReviews(data.reviews)
    setDegree(data.degree)
  }

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const formDataToSend = {
          name,
          age,
          contact,
          address,
          city,
          gender,
          avatar: avatar,
          specialization,
          experience,
          qualification,
          consultationFee,
        }
        console.log(formDataToSend)
        await apiClient.post("/doctors/updateInfo", formDataToSend)

        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          variant: "success",
        })

        // Update user data in the store
        fetchAndSetUserStore((updatedUser) => {
          setName(updatedUser.name || "")
          setEmail(updatedUser.email || "")
          setAge(updatedUser.profile.age || "")
          setContact(updatedUser.profile.contact || "")
          setAddress(updatedUser.profile.address || "")
          setCity(updatedUser.profile.city || "")
          setGender(updatedUser.profile.gender || "")
          setAvatar(updatedUser.avatar || "")
          setSpecialization(updatedUser.specialization || "")
          setExperience(updatedUser.experience || 0)
          setQualification(updatedUser.qualification || "")
          setConsultationFee(updatedUser.consultationFee || 0)
        })

        setIsEditing(false)
      } catch (error) {
        console.error("Error updating profile:", error)
        toast({
          title: "Update failed.",
          description: "There was a problem updating your profile.",
          variant: "destructive",
        })
      }
    } else {
      setIsEditing(true)
    }
  }

  useEffect(() => {
    if (!user) return
    const getDoctor = async () => {
      try {
        const response = await apiClient("/doctors/getDoctor")
        console.log(response.data.data.doctor)
        setData(response.data.data.doctor)
      } catch (error) {
        console.error(error)
      }
    }
    getDoctor()
  }, [user]) // Removed setData from the dependency array

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center w-full lg:w-1/3">
          <div className="h-72 w-72 p-2 flex justify-center items-center overflow-hidden rounded-full shadow-md bg-white border">
            <img
              src={newProfilePicture || avatar}
              alt="Profile"
              className="object-cover w-full h-full bg-white rounded-full"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-center text-2xl font-bold">{name}</h2>
          </div>
          <div className="mt-6 flex flex-col justify-center items-center px-4">
            <label htmlFor="image-upload" className="mb-2 text-base text-gray-700 font-medium">
              Upload New Image
            </label>
            <input
              type="file"
              id="image-upload"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              // onChange={(e) => }
            />
            <button
              className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
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
              {isEditing ? <FaCheckCircle className="h-5 w-5 inline" /> : <MdEdit className="h-5 w-5 inline" />}{" "}
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
                disabled={true}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-[rgba(0,0,0,0.1)] cursor-not-allowed outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
            <div>
              <label className="font-medium">Specialization</label>
              <input
                type="text"
                name="specialization"
                required
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Experience (years)</label>
              <input
                type="number"
                name="experience"
                required
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Qualification</label>
              <input
                type="text"
                name="qualification"
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Consultation Fee</label>
              <input
                name="consultationFee"
                required
                value={consultationFee}
                onChange={(e) => setConsultationFee(Number(e.target.value))}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page

