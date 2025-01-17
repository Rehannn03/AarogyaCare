'use client'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import apiClient from '@/api-client/apiClient';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/store";
import { FaUserMd, FaUser } from "react-icons/fa";

const page = () => {
  const [name, setName] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setName, 300);
  const { toast } = useToast();
  const router = useRouter();
  const { user, update } = useUserStore();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      role: "patient", // Default role
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { name, role } = data;
      const tempProfile = { name, role };
      update(tempProfile);
      console.log("This is raw data from form: ", data);
      const response = await apiClient.post("/users/register", { ...data });
      toast({
        title: "Success",
        description: "Sign Up Successful",
      });
      router.replace(`/sign-in`);
      setIsSubmitting(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sign Up Failed";
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 overflow-hidden">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            MedTech
          </h1>
          <p className="mb-4">
            Sign up to consult a doctor via video call or access all your medical reports in one place.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <p className={`text-sm ${usernameMessage === "Username is available" ? 'text-green-600' : 'text-red-600'}`}>{usernameMessage}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example123@mailprovider.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <div className="flex flex-row space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Input
                          type="radio"
                          value="doctor"
                          checked={field.value === "doctor"}
                          onChange={() => field.onChange("doctor")}
                          id="role-doctor"
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded-full ${field.value === "doctor" ? 'bg-blue-600' : 'bg-white'} transition-colors`}>
                          <FaUserMd className={`text-xl ${field.value === "doctor" ? 'text-white' : 'text-gray-700'} transition-colors`} />
                        </div>
                        <span className="text-gray-700">Doctor</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Input
                          type="radio"
                          value="patient"
                          checked={field.value === "patient"}
                          onChange={() => field.onChange("patient")}
                          id="role-patient"
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded-full ${field.value === "patient" ? 'bg-blue-600' : 'bg-white'} transition-colors`}>
                          <FaUser className={`text-xl ${field.value === "patient" ? 'text-white' : 'text-gray-700'} transition-colors`} />
                        </div>
                        <span className="text-gray-700">Patient</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="font-bold">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a Member?{" "}
            <Link
              href="/sign-in"
              className="text-[#7A5CFA] hover:text-blue-800"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
