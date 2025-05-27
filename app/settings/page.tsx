"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Bell,
  Shield,
  Globe,
  Monitor,
  Moon,
  Sun,
  Download,
  Trash2,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"
import { useTheme } from "next-themes"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Image from "next/image"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Travel enthusiast and virtual explorer",
    birthDate: "1990-01-01",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    tourReminders: true,
    weeklyDigest: false,
    marketingEmails: false,
    newTourAlerts: true,
    communityUpdates: true,
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "America/New_York",
    currency: "USD",
    autoplay: true,
    highQuality: true,
    subtitles: false,
    tourDifficulty: "all",
    preferredRegions: ["Europe", "Asia"],
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showActivity: true,
    showLocation: false,
    allowMessages: true,
    dataCollection: true,
    analytics: true,
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Monitor },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "account", label: "Account", icon: Globe },
  ]

  const handleSave = () => {
    // Simulate saving settings
    console.log("Settings saved:", { profileData, notifications, preferences, privacy })
    // Show success message
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field: string, value: string | boolean) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <main className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Manage your account preferences and privacy settings
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <nav className="space-y-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <tab.icon className="h-4 w-4" />
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Profile Settings */}
                {activeTab === "profile" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal information and profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Profile"
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <Button variant="outline" size="sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Change Photo
                          </Button>
                          <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Personal Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => handleProfileChange("firstName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => handleProfileChange("lastName", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleProfileChange("email", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => handleProfileChange("phone", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="birthDate">Birth Date</Label>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <Input
                              id="birthDate"
                              type="date"
                              value={profileData.birthDate}
                              onChange={(e) => handleProfileChange("birthDate", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => handleProfileChange("location", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          value={profileData.bio}
                          onChange={(e) => handleProfileChange("bio", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Notification Settings */}
                {activeTab === "notifications" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                          </div>
                          <Switch
                            checked={notifications.pushNotifications}
                            onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Tour Reminders</Label>
                            <p className="text-sm text-gray-500">Get reminded about scheduled tours</p>
                          </div>
                          <Switch
                            checked={notifications.tourReminders}
                            onCheckedChange={(checked) => handleNotificationChange("tourReminders", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Weekly Digest</Label>
                            <p className="text-sm text-gray-500">Weekly summary of new tours and updates</p>
                          </div>
                          <Switch
                            checked={notifications.weeklyDigest}
                            onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>New Tour Alerts</Label>
                            <p className="text-sm text-gray-500">Be notified when new tours are added</p>
                          </div>
                          <Switch
                            checked={notifications.newTourAlerts}
                            onCheckedChange={(checked) => handleNotificationChange("newTourAlerts", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Community Updates</Label>
                            <p className="text-sm text-gray-500">Updates from the WANDERWAY community</p>
                          </div>
                          <Switch
                            checked={notifications.communityUpdates}
                            onCheckedChange={(checked) => handleNotificationChange("communityUpdates", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Marketing Emails</Label>
                            <p className="text-sm text-gray-500">Promotional content and special offers</p>
                          </div>
                          <Switch
                            checked={notifications.marketingEmails}
                            onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Preferences */}
                {activeTab === "preferences" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>Customize your WANDERWAY experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Theme Selection */}
                      <div className="space-y-3">
                        <Label>Theme</Label>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant={theme === "light" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("light")}
                            className="flex items-center space-x-2"
                          >
                            <Sun className="h-4 w-4" />
                            <span>Light</span>
                          </Button>
                          <Button
                            variant={theme === "dark" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("dark")}
                            className="flex items-center space-x-2"
                          >
                            <Moon className="h-4 w-4" />
                            <span>Dark</span>
                          </Button>
                          <Button
                            variant={theme === "system" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("system")}
                            className="flex items-center space-x-2"
                          >
                            <Monitor className="h-4 w-4" />
                            <span>System</span>
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Language & Region */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select
                            value={preferences.language}
                            onValueChange={(value) => handlePreferenceChange("language", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="ja">日本語</SelectItem>
                              <SelectItem value="zh">中文</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Timezone</Label>
                          <Select
                            value={preferences.timezone}
                            onValueChange={(value) => handlePreferenceChange("timezone", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time</SelectItem>
                              <SelectItem value="America/Chicago">Central Time</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                              <SelectItem value="Europe/London">GMT</SelectItem>
                              <SelectItem value="Europe/Paris">CET</SelectItem>
                              <SelectItem value="Asia/Tokyo">JST</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Video Preferences */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Video Preferences</h3>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Auto-play Videos</Label>
                            <p className="text-sm text-gray-500">Automatically start playing tour videos</p>
                          </div>
                          <Switch
                            checked={preferences.autoplay}
                            onCheckedChange={(checked) => handlePreferenceChange("autoplay", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>High Quality by Default</Label>
                            <p className="text-sm text-gray-500">Use highest available video quality</p>
                          </div>
                          <Switch
                            checked={preferences.highQuality}
                            onCheckedChange={(checked) => handlePreferenceChange("highQuality", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Show Subtitles</Label>
                            <p className="text-sm text-gray-500">Display subtitles when available</p>
                          </div>
                          <Switch
                            checked={preferences.subtitles}
                            onCheckedChange={(checked) => handlePreferenceChange("subtitles", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Privacy Settings */}
                {activeTab === "privacy" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy & Security</CardTitle>
                      <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Profile Visibility</Label>
                          <Select
                            value={privacy.profileVisibility}
                            onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="friends">Friends Only</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Show Activity Status</Label>
                            <p className="text-sm text-gray-500">Let others see when you're online</p>
                          </div>
                          <Switch
                            checked={privacy.showActivity}
                            onCheckedChange={(checked) => handlePrivacyChange("showActivity", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Show Location</Label>
                            <p className="text-sm text-gray-500">Display your location on your profile</p>
                          </div>
                          <Switch
                            checked={privacy.showLocation}
                            onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow Messages</Label>
                            <p className="text-sm text-gray-500">Let other users send you messages</p>
                          </div>
                          <Switch
                            checked={privacy.allowMessages}
                            onCheckedChange={(checked) => handlePrivacyChange("allowMessages", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Data Collection</Label>
                            <p className="text-sm text-gray-500">Allow collection of usage data for improvements</p>
                          </div>
                          <Switch
                            checked={privacy.dataCollection}
                            onCheckedChange={(checked) => handlePrivacyChange("dataCollection", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Analytics</Label>
                            <p className="text-sm text-gray-500">Help us improve with anonymous analytics</p>
                          </div>
                          <Switch
                            checked={privacy.analytics}
                            onCheckedChange={(checked) => handlePrivacyChange("analytics", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Account Settings */}
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Management</CardTitle>
                        <CardDescription>Manage your account settings and data</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Download Your Data</h4>
                            <p className="text-sm text-gray-500">Get a copy of all your data</p>
                          </div>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                          </div>
                          <Badge variant="outline">Not Enabled</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Active Sessions</h4>
                            <p className="text-sm text-gray-500">Manage your active login sessions</p>
                          </div>
                          <Button variant="outline">Manage</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 dark:border-red-800">
                      <CardHeader>
                        <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                        <CardDescription>Irreversible and destructive actions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                          <div>
                            <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                          </div>
                          <Button variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end mt-8">
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
