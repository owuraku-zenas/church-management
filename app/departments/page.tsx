"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

export default function DepartmentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [departments, setDepartments] = useState<any[]>([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock department data
      setDepartments([
        {
          id: "dep1",
          name: "Choir",
          description: "Church choir and music ministry",
          _count: { members: 12 },
        },
        {
          id: "dep2",
          name: "Ushering",
          description: "Church ushering department",
          _count: { members: 8 },
        },
        {
          id: "dep3",
          name: "Media",
          description: "Church media and technical department",
          _count: { members: 5 },
        },
        {
          id: "dep4",
          name: "Prayer",
          description: "Prayer warriors team",
          _count: { members: 15 },
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Departments</h1>
        <Button asChild>
          <Link href="/departments/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Departments</CardTitle>
          <CardDescription>Manage church departments and their members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading departments...
                  </TableCell>
                </TableRow>
              ) : departments.length === 0 ? (
                <TableRow>
                  <TableCell className="font-medium">No departments found</TableCell>
                  <TableCell colSpan={3}></TableCell>
                </TableRow>
              ) : (
                departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell>{department.description || "N/A"}</TableCell>
                    <TableCell>{department._count.members}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/departments/${department.id}`}>View</Link>
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
