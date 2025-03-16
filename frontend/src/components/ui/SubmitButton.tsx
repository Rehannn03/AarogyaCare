import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={`shad-primary-btn w-full ${className ?? ""}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-4 opacity-100">
          <Image
            src="/loader.svg" // Ensure loader.svg is in `public/`
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
