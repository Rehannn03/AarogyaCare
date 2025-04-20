import Image from "next/image"
import { Clock } from "lucide-react"

interface AppointmentCardProps {
  patientName: string
  time: string
  duration: string
  type: string
  imageSrc: string
}

export function AppointmentCard({ patientName, time, duration, type, imageSrc }: AppointmentCardProps) {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <Image src={imageSrc || "/placeholder.svg"} alt={patientName} width={40} height={40} className="rounded-full" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{patientName}</p>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <p className="text-sm font-medium">{duration}</p>
        </div>
        <p className="text-sm text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

