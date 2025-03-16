const PatientProfile = ({ data, isEditing, setData }) => {
    const handleChange = (e) => {
      const { name, value } = e.target
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  
    return (
      <form className="p-4 space-y-5">
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={data.name}
            onChange={handleChange}
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
            value={data.email}
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
            value={data.contact}
            onChange={handleChange}
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
            value={data.address}
            onChange={handleChange}
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
            value={data.city}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium">Age</label>
          <input
            type="number"
            name="age"
            required
            value={data.age}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium">Gender</label>
          <select
            name="gender"
            required
            value={data.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
      </form>
    )
  }
  
  export default PatientProfile
  
  