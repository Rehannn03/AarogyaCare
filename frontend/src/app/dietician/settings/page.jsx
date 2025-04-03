"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information visible to patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="jane.smith@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Professional title</Label>
                  <Input id="title" defaultValue="Registered Dietitian Nutritionist" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Professional bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Jane Smith is a Registered Dietitian Nutritionist with over 10 years of experience specializing in weight management, diabetes care, and sports nutrition. She holds a Master's degree in Nutrition Science and is certified in diabetes education."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="specialties">Specialties</Label>
                  <Input id="specialties" defaultValue="Weight Management, Diabetes, Sports Nutrition" />
                  <p className="text-xs text-muted-foreground">Separate specialties with commas</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Credentials</CardTitle>
              <CardDescription>Update your professional credentials and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" defaultValue="Master of Science in Nutrition" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" defaultValue="University of Health Sciences" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License number</Label>
                  <Input id="license" defaultValue="RDN-12345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification">Certifications</Label>
                  <Input id="certification" defaultValue="Certified Diabetes Educator (CDE)" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Credentials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Address</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-email">Current email</Label>
                  <Input id="current-email" defaultValue="jane.smith@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-email">New email</Label>
                  <Input id="new-email" placeholder="Enter new email address" />
                </div>
                <Button>Update Email</Button>
              </div>

              

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Change Password</Button>
              </div>

              

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Enable two-factor authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="2fa" />
                </div>
                <Button variant="outline">Set Up 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Permanently delete your account and all of your content
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-appointments">Appointment reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about upcoming appointments
                      </p>
                    </div>
                    <Switch id="email-appointments" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-messages">New messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications when patients send you messages
                      </p>
                    </div>
                    <Switch id="email-messages" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-updates">System updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about system updates and new features
                      </p>
                    </div>
                    <Switch id="email-updates" />
                  </div>
                </div>
              </div>

              

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-appointments">Appointment reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications about upcoming appointments
                      </p>
                    </div>
                    <Switch id="push-appointments" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-messages">New messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications when patients send you messages
                      </p>
                    </div>
                    <Switch id="push-messages" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize how the dashboard looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="space-y-2">
                  <Label htmlFor="theme">Color theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Select a theme preference for the dashboard</p>
                </div>
              </div>

              

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dashboard Layout</h3>
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default view</Label>
                  <Select defaultValue="dashboard">
                    <SelectTrigger id="default-view">
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="patients">Patients</SelectItem>
                      <SelectItem value="appointments">Appointments</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Choose which page to show when you first log in</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Display Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

