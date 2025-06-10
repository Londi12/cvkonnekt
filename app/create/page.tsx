"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Download, Eye, Save, AlertCircle } from "lucide-react"
import Link from "next/link"
import { generateCVPDF, downloadBlob } from "@/lib/pdf-utils"
import type { CVData } from "@/types/cv-types"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CVPreview } from "@/components/cv-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getUserProfile, createOrUpdateUserProfile, saveCV } from "@/lib/user-data-service"
import { useAuth } from "@/contexts/auth-context"

export default function CreateCVPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "1"

  // Map template IDs to template types
  const templateMap: Record<string, any> = {
    "1": { type: "professional", name: "Corporate Professional" },
    "2": { type: "modern", name: "Modern Minimalist" },
    "3": { type: "creative", name: "Creative Design" },
    "4": { type: "simple", name: "Simple Clean" },
    "5": { type: "executive", name: "Executive Elite" },
    "6": { type: "technical", name: "Technical Expert" },
    "7": { type: "graduate", name: "Graduate Entry" },
    "8": { type: "digital", name: "Digital Portfolio" },
  }

  const selectedTemplate = templateMap[templateId] || templateMap["1"]

  // Form state
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: "",
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        location: "",
        graduationDate: "",
      },
    ],
    skills: "",
  })

  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user, isConfigured } = useAuth()

  // Load user profile on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!isConfigured || !user) return

      setIsLoadingProfile(true)
      const { data: profile } = await getUserProfile()

      if (profile) {
        setFormData({
          personalInfo: profile.personal_info || formData.personalInfo,
          summary: profile.summary || "",
          experience: profile.experience?.length > 0 ? profile.experience : formData.experience,
          education: profile.education?.length > 0 ? profile.education : formData.education,
          skills: profile.skills || "",
        })
      }
      setIsLoadingProfile(false)
    }

    loadUserProfile()
  }, [user, isConfigured])

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle form changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      summary: e.target.value,
    })
  }

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedExperience = [...formData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: value,
    }
    setFormData({
      ...formData,
      experience: updatedExperience,
    })
  }

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedEducation = [...formData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    }
    setFormData({
      ...formData,
      education: updatedEducation,
    })
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          institution: "",
          location: "",
          graduationDate: "",
        },
      ],
    })
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      skills: e.target.value,
    })
  }

  const handleSaveProfile = async () => {
    if (!isConfigured || !user) return

    setIsSaving(true)
    const { error } = await createOrUpdateUserProfile(formData)

    if (error) {
      console.error("Error saving profile:", error)
      setError("Failed to save profile data")
    }
    setIsSaving(false)
  }

  const handleSaveCV = async () => {
    if (!isConfigured || !user) return

    const cvName = `${formData.personalInfo.fullName || "My CV"} - ${selectedTemplate.name}`

    setIsSaving(true)
    const { error } = await saveCV({
      name: cvName,
      template_type: selectedTemplate.type,
      template_name: selectedTemplate.name,
      cv_data: formData as CVData,
    })

    if (error) {
      console.error("Error saving CV:", error)
      setError("Failed to save CV")
    } else {
      // Also save the profile data for future use
      await handleSaveProfile()
    }
    setIsSaving(false)
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    setError(null)

    try {
      const pdfBlob = await generateCVPDF(selectedTemplate.type, formData as CVData, selectedTemplate.name)
      const fileName = `${formData.personalInfo.fullName || "CV"}_${selectedTemplate.name}.pdf`
      downloadBlob(pdfBlob, fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setError(error instanceof Error ? error.message : "Failed to generate PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/cv-templates">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">
              Creating CV with <span className="text-emerald-600">{selectedTemplate.name}</span> template
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isConfigured && user && (
              <>
                <Button variant="outline" size="sm" onClick={handleSaveProfile} disabled={isSaving || isLoadingProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleSaveCV} disabled={isSaving || isLoadingProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save CV"}
                </Button>
              </>
            )}
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF || isLoadingProfile}
            >
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            {isLoadingProfile && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your profile...</p>
              </div>
            )}

            {!isLoadingProfile && (
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.personalInfo.fullName}
                          onChange={handlePersonalInfoChange}
                          placeholder="e.g., John Smith"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.personalInfo.jobTitle}
                          onChange={handlePersonalInfoChange}
                          placeholder="e.g., Senior Financial Analyst"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          placeholder="e.g., john.smith@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          placeholder="e.g., +27 11 123 4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.personalInfo.location}
                          onChange={handlePersonalInfoChange}
                          placeholder="e.g., Johannesburg, SA"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="summary" className="space-y-4">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          value={formData.summary}
                          onChange={handleSummaryChange}
                          placeholder="Write a brief summary of your professional background and key qualifications..."
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`title-${index}`}>Job Title</Label>
                          <Input
                            id={`title-${index}`}
                            name="title"
                            value={exp.title}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="e.g., Senior Financial Analyst"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`company-${index}`}>Company</Label>
                          <Input
                            id={`company-${index}`}
                            name="company"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="e.g., ABC Corporation"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                            <Input
                              id={`startDate-${index}`}
                              name="startDate"
                              value={exp.startDate}
                              onChange={(e) => handleExperienceChange(index, e)}
                              placeholder="e.g., Jan 2020"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`endDate-${index}`}>End Date</Label>
                            <Input
                              id={`endDate-${index}`}
                              name="endDate"
                              value={exp.endDate}
                              onChange={(e) => handleExperienceChange(index, e)}
                              placeholder="e.g., Present"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`location-${index}`}>Location</Label>
                          <Input
                            id={`location-${index}`}
                            name="location"
                            value={exp.location}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="e.g., Johannesburg, SA"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea
                            id={`description-${index}`}
                            name="description"
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={addExperience} className="w-full">
                    Add Another Experience
                  </Button>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input
                            id={`degree-${index}`}
                            name="degree"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="e.g., Bachelor of Commerce"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`institution-${index}`}>Institution</Label>
                          <Input
                            id={`institution-${index}`}
                            name="institution"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="e.g., University of Cape Town"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`eduLocation-${index}`}>Location</Label>
                          <Input
                            id={`eduLocation-${index}`}
                            name="location"
                            value={edu.location}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="e.g., Cape Town, SA"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`graduationDate-${index}`}>Graduation Date</Label>
                          <Input
                            id={`graduationDate-${index}`}
                            name="graduationDate"
                            value={edu.graduationDate}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="e.g., 2020"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" onClick={addEducation} className="w-full">
                    Add Another Education
                  </Button>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Textarea
                          id="skills"
                          value={formData.skills}
                          onChange={handleSkillsChange}
                          placeholder="List your skills, separated by commas (e.g., Excel, SQL, Python, Financial Modeling)"
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* Preview Section */}
          <div className="sticky top-20">
            <div className="bg-white border rounded-lg p-4 mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Preview</h2>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Full Preview
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden" id="cv-preview">
              <div className="aspect-[1/1.414] overflow-auto">
                <CVPreview template={selectedTemplate.type} className="w-full h-full" userData={formData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
