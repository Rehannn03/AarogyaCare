import Image from "next/image"
import { Progress } from "@/components/ui/progress"

interface PatientCardProps {
  name: string
  age: number
  condition: string
  lastVisit: string
  progress: number
  imageSrc: string
}

export function PatientCard({ name, age, condition, lastVisit, progress, imageSrc }: PatientCardProps) {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <Image src={imageSrc || "/placeholder.svg"} alt={name} width={40} height={40} className="rounded-full" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">
          {age} years • {condition}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">Last visit</p>
        <p className="text-sm text-muted-foreground">{lastVisit}</p>
      </div>
      <div className="w-24">
        <p className="text-xs text-right mb-1">{progress}%</p>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  )
}

