"use client"
import { useEffect, useState, useRef } from "react"
import apiClient from "@/api-client/apiClient"
import { useUserStore } from "@/stores/store"
import { FaCheckCircle } from "react-icons/fa"
import { MdEdit, MdPhotoCamera } from "react-icons/md"
import { useToast } from "@/components/ui/use-toast"
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore"
import { useCurrent } from "@/features/getCurrent"

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
  const [newDegree, setNewDegree] = useState("")

  const [degree, setDegree] = useState("") // For the current degree URL
  const degreeFileInputRef = useRef(null) // Changed to useRef

  // Profile picture states
  const [selectedImg, setSelectedImg] = useState("")
  const [preview, setPreview] = useState(false)
  const fileInputRef = useRef(null) // Changed to useRef
  const { toast } = useToast()

  // Degree states
  const [selectedDegree, setSelectedDegree] = useState("")
  const [previewDegree, setPreviewDegree] = useState(false)

  const { User, isPending } = useCurrent()

  console.log(User)

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
        // Validate required fields
        if (!specialization || !qualification || !experience || !consultationFee) {
          toast({
            title: "Missing required fields",
            description: "Please fill in all required doctor information fields.",
            variant: "destructive",
          })
          return
        }

        // Create basic profile data
        const formDataToSend = {
          specialization: specialization || "",
          experience: Number(experience) || 0,
          qualification: qualification || "",
          consultationFee: Number(consultationFee) || 0,
        }

        console.log("Sending data:", formDataToSend)

        // Update doctor information
        await apiClient.post("/doctors/updateInfo", formDataToSend)

        // If a new degree file is selected, upload it separately
        if (newDegree) {
          const formData = new FormData()
          formData.append("degree", newDegree)
          await apiClient.patch("/doctors/degree", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        }

        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          variant: "success",
        })

        // Refresh doctor data
        const response = await apiClient.get("/doctors/getDoctor")
        setData(response.data.data.doctor)
        setNewDegree(null) // Reset the file selection
        setIsEditing(false)
      } catch (error) {
        console.error("Error updating profile:", error)
        toast({
          title: "Update failed.",
          description: error.response?.data?.message || "There was a problem updating your profile.",
          variant: "destructive",
        })
      }
    } else {
      setIsEditing(true)
    }
  }

  // Profile picture functions
  const triggerFileInput = () => {
    setPreview(true)
    fileInputRef.current.click()
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedImg(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const onConfirm = async () => {
    if (!fileInputRef.current?.files[0]) {
      alert("Please select an image first.")
      return
    }

    const formData = new FormData()
    formData.append("avatar", fileInputRef.current.files[0])

    try {
      const response = await apiClient.patch("/users/profile/pfp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const updatedAvatar = response.data?.data?.user?.avatar

      setAvatar(updatedAvatar)
      fetchAndSetUserStore((updatedUser) => {
        setAvatar(updatedUser.avatar)
      })

      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully.",
        variant: "success",
      })

      setPreview(false)
      setSelectedImg("")
    } catch (error) {
      console.error("Error updating profile picture:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update profile picture.",
        variant: "destructive",
      })
    }
  }

  // Degree functions
  const triggerDegreeFileInput = () => {
    setPreviewDegree(true)
    degreeFileInputRef.current.click()
  }

  const handleDegreeChange = (e) => {
    const file = e.target.files[0]
    console.log(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedDegree(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDegreeUpload = async () => {
    if (!degreeFileInputRef.current?.files[0]) {
      alert("Please select a degree file first.")
      return
    }

    const formData = new FormData()
    formData.append("degree", degreeFileInputRef.current.files[0])

    try {
      const response = await apiClient.patch("/doctors/degree", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const updatedDegree = response.data?.data?.doctor?.degree

      setDegree(updatedDegree)

      toast({
        title: "Degree Certificate Updated",
        description: "Your degree certificate has been updated successfully.",
        variant: "success",
      })

      setPreviewDegree(false)
      setSelectedDegree("")
    } catch (error) {
      console.error("Error updating degree certificate:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update degree certificate.",
        variant: "destructive",
      })
    }
  }

  const [isEditing, setIsEditing] = useState(false)

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
              src={selectedImg || avatar}
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
              onChange={handleFileUpload}
            />
            <button
              className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer"
              onClick={triggerFileInput}
            >
              <MdPhotoCamera className="h-5 w-5 inline" /> Choose Image
            </button>
            {selectedImg && preview && (
              <button
                className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer mt-3"
                onClick={onConfirm}
              >
                <FaCheckCircle className="h-5 w-5 inline mr-1" /> Confirm
              </button>
            )}
          </div>
          {/* Degree Upload Section */}
          <div className="mt-8 w-full flex flex-col justify-center items-center px-4">
            <label htmlFor="degree-upload" className="mb-2 text-base text-gray-700 font-medium">
              Degree Certificate
            </label>
            <input
              type="file"
              id="degree-upload"
              ref={degreeFileInputRef}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleDegreeChange}
            />
            <button
              className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer"
              onClick={triggerDegreeFileInput}
            >
              <MdPhotoCamera className="h-5 w-5 inline" /> Choose Certificate
            </button>
            {selectedDegree && previewDegree && (
              <button
                className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer mt-3"
                onClick={handleDegreeUpload}
              >
                <FaCheckCircle className="h-5 w-5 inline mr-1" /> Confirm
              </button>
            )}
            {degree && (
              <div className="mt-4">
                <a href={degree} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  View Current Certificate
                </a>
              </div>
            )}
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