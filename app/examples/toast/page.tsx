"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

export default function ToastPage() {
  const handleButtonClick = () => {
    toast({
      title: "Action completed",
      description: "Your request has been processed successfully",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Toast Example</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Default Toast</CardTitle>
            <CardDescription>Show a simple notification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Click the button below to show a default toast notification.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleButtonClick}>Show Toast</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Destructive Toast</CardTitle>
            <CardDescription>Show an error notification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Click the button below to show a destructive toast notification.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Something went wrong. Please try again.",
                });
              }}
              variant="destructive"
            >
              Show Error Toast
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toast with Action</CardTitle>
            <CardDescription>Show a notification with an action button</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Click the button below to show a toast with an action button.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => {
                toast({
                  title: "New Update Available",
                  description: "A new version is available. Click to update now.",
                  action: {
                    altText: "Update Now",
                    action: <Button variant="outline" size="sm">Update</Button>,
                  },
                });
              }}
              variant="outline"
            >
              Show Action Toast
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How To Use Toasts</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Import the toast hook: <code>import {'{ toast }'} from "@/hooks/use-toast"</code></li>
          <li>Add the Toaster component to your layout: <code>{'<Toaster />'}</code></li>
          <li>Call the toast function with your desired content</li>
          <li>Customize with variants, actions, and more</li>
        </ol>
      </section>

      <Toaster />
    </div>
  );
} 