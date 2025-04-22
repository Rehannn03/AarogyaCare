import React, { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function SelectOption({selectedType, setSelectedType, allTypes}) {
    useEffect(() => {
        console.log(selectedType)
        console.log(allTypes)
    }, [selectedType, allTypes]
    )

  return (
    <>
     <div className="w-full">
      <p className="text-sm font-semibold mb-2">Select Speciality</p>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select Speciality
        </option>
        {allTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
    </>

  )
}

export default SelectOption