"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Search, Filter } from "lucide-react"

export default function MembersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [members, setMembers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock member data
      setMembers([
        {
          id: "1",
          name: "John Doe",
          phone: "0123456789",
          cellGroup: { name: "Campus Fellowship" },
          university: "University of Ghana",
          invitedBy: { name: "Admin User" },
        },
        {
          id: "2",
          name: "Jane Smith",
          phone: "0123456788",
          cellGroup: { name: "Graduate Group" },
          university: "University of Ghana",
          invitedBy: null,
        },
        {
          id: "3",
          name: "Michael Johnson",
          phone: "0123456787",
          cellGroup: { name: "Campus Fellowship" },
          university: "KNUST",
          invitedBy: { name: "John Doe" },
        },
        {
          id: "4",
          name: "Sarah Williams",
          phone: "0123456786",
          cellGroup: { name: "Freshers Group" },
          university: "University of Ghana",
          invitedBy: { name: "Jane Smith" },
        },
        {
          id: "5",
          name: "David Brown",
          phone: "0123456785",
          cellGroup: { name: "Graduate Group" },
          university: "KNUST",
          invitedBy: null,
        },
        {
          id: "6",
          name: "Emily Davis",
          phone: "0123456784",
          cellGroup: { name: "Campus Fellowship" },
          university: "University of Ghana",
          invitedBy: { name: "Michael Johnson" },
        },
        {
          id: "7",
          name: "Robert Wilson",
          phone: "0123456783",
          cellGroup: { name: "Freshers Group" },
          university: "Central University",
          invitedBy: { name: "Sarah Williams" },
        },
        {
          id: "8",
          name: "Jennifer Taylor",
          phone: "0123456782",
          cellGroup: { name: "Graduate Group" },
          university: "University of Ghana",
          invitedBy: { name: "David Brown" },
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      (member.university && member.university.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.cellGroup && member.cellGroup.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Church Members</h1>
        <Button asChild>
          <Link href="/members/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Member
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Member Search</CardTitle>
          <CardDescription>Search for members by name, email, phone, or department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search members..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>Showing {filteredMembers.length} registered church members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Cell Group</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading members...
                  </TableCell>
                </TableRow>
              ) : filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell className="font-medium">No members found</TableCell>
                  <TableCell colSpan={5}></TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.cellGroup?.name || "None"}</TableCell>
                    <TableCell>{member.university || "N/A"}</TableCell>
                    <TableCell>{member.invitedBy?.name || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/members/${member.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
