"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/service/auth";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, { message: "Phone must be at least 10 digits." }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
   defaultValues: {
  name: "",
  email: "",
  password: "",
  phone: "",
},

  });
async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    setIsSubmitting(true); // Start loading state

    const formData = {
      Name: values.name,
      Email: values.email,
      Password: values.password,
      Phone: values.phone,
    };

    const response = await register(formData);

    toast({
      title: "✅ Account Created",
      description: response || "You have successfully signed up. Please log in.",
    });

    router.push("/login");
  } catch (error: any) {
    toast({
      title: "❌ Signup Failed",
      description: error?.response?.data || "Something went wrong.",
      variant: "destructive",
    });
    console.error("Registration error:", error);
  } finally {
    setIsSubmitting(false); // Stop loading state
  }
}



  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)] bg-secondary/20 py-12">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your details below to create your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone</FormLabel>
      <FormControl>
        <Input type="tel" placeholder="9876543210" {...field} />
      </FormControl>
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
                                        <Input type="email" placeholder="m@example.com" {...field} />
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
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
<Button type="submit" className="w-full" disabled={isSubmitting}>
  {isSubmitting ? "Creating..." : "Create Account"}
</Button>
                    </form>
                </Form>
                 <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
