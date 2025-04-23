"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export default function NewMemberPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cellGroups, setCellGroups] = useState([])
  const [members, setMembers] = useState([])
  const [departments, setDepartments] = useState([])
  const [selectedDepartments, setSelectedDepartments] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    university: "",
    program: "",
    startYear: "",
    hostel: "",
    roomNumber: "",
    cellGroupId: "",
    invitedById: "",
  })

  useEffect(() => {
    // Fetch cell groups
    fetch("/api/cell-groups")
      .then((res) => res.json())
      .then((data) => setCellGroups(data))
      .catch((error) => console.error("Error fetching cell groups:", error))

    // Fetch members for the "invited by" dropdown
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error))

    // Fetch departments
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartments((prev) => {
      if (prev.includes(departmentId)) {
        return prev.filter((id) => id !== departmentId)
      } else {
        return [...prev, departmentId]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          departmentIds: selectedDepartments,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create member")
      }

      toast({
        title: "Success",
        description: "Member has been created successfully",
      })

      router.push("/members")
    } catch (error) {
      console.error("Error creating member:", error)
      toast({
        title: "Error",
        description: "Failed to create member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Member</CardTitle>
          <CardDescription>Enter the details of the new church member</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" name="university" value={formData.university} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program Studied</Label>
                <Input id="program" name="program" value={formData.program} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startYear">Start Year</Label>
                <Input id="startYear" name="startYear" value={formData.startYear} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hostel">Hostel</Label>
                <Input id="hostel" name="hostel" value={formData.hostel} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input id="roomNumber" name="roomNumber" value={formData.roomNumber} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cellGroupId">Cell Group</Label>
                <Select onValueChange={(value) => handleSelectChange("cellGroupId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cell group" />
                  </SelectTrigger>
                  <SelectContent>
                    {cellGroups.length > 0 ? (
                      cellGroups.map((group: any) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No cell groups available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invitedById">Invited By</Label>
                <Select onValueChange={(value) => handleSelectChange("invitedById", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.length > 0 ? (
                      members.map((member: any) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No members available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Departments</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {departments.map((department: any) => (
                  <div key={department.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dept-${department.id}`}
                      checked={selectedDepartments.includes(department.id)}
                      onCheckedChange={() => handleDepartmentChange(department.id)}
                    />
                    <label htmlFor={`dept-${department.id}`} className="text-sm">
                      {department.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href="/members">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Member"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
