'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signInSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import SubmitButton from "@/components/ui/SubmitButton";
import apiClient from "@/api-client/apiClient";
import Link from "next/link";
import Image from "next/image";
import { useLogin } from "@/features/use-login";

const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {mutate,isPending}=useLogin();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    mutate(data);

    // setIsSubmitting(true);
    // try {
    //   console.log("Form Data:", data);
    //   const response = await apiClient.post("/users/login", data);
    //   console.log("API Response:", response);
    // if(response.ok){
    //   toast({ title: "Success", description: "Sign In Successful" });
    // }
    //   router.replace("/dashboard");
    // } catch (error) {
    //   console.error("Login Error:", error);
    //   const errorMessage = error.response?.data?.message || "Sign In Failed";
    //   toast({ title: "Sign In Failed", description: errorMessage, variant: "destructive" });
    // }
    // setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-200 font-title justify-center">
      {/* Left Section */}
      <section className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden">
        <Image src="/ArogayaCareLogo.svg" height={1000} width={1000} className="mb-6 h-10 w-auto" alt="Logo" priority />
        
        <div className="text-center md:text-left mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome Back!</h1>
          <p className="text-dark-700">Sign in to continue.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="w-full max-w-sm space-y-6">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <SubmitButton isLoading={isSubmitting}>Sign In</SubmitButton>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            New User? <Link href="/sign-up" className="text-[#7A5CFA] hover:text-blue-800">Sign Up</Link>
          </p>
        </div>
      </section>

      {/* Right Section - Image */}
      <section className="hidden md:block w-1/2">
        <Image
          src="/sign-in.jpg"
          height={1000}
          width={1000}
          alt="Sign In Image"
          className="h-full w-full object-cover"
        />
      </section>
    </div>
  );
};

export default SignInForm;
