"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search } from "lucide-react"

export default function EventAttendancePage({ params }: { params: { eventId: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [attendees, setAttendees] = useState<{ id: string; name: string; present: boolean }[]>([])

  // In a real app, you would fetch the event details and member list here
  const eventName = "Sunday Service"
  const eventDate = "April 21, 2024"

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleCheckboxChange = (id: string) => {
    setAttendees((prev) =>
      prev.map((attendee) => (attendee.id === id ? { ...attendee, present: !attendee.present } : attendee)),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Attendance submitted:", attendees)
    // Here you would typically save the attendance data to your database
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/attendance">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Attendance
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{eventName}</CardTitle>
          <CardDescription>Mark attendance for {eventDate}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search members..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Present</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Cell Group</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No members found
                    </TableCell>
                  </TableRow>
                ) : (
                  attendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <Checkbox
                          checked={attendee.present}
                          onCheckedChange={() => handleCheckboxChange(attendee.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell>Cell Group 1</TableCell>
                      <TableCell>+1234567890</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href="/attendance">Cancel</Link>
            </Button>
            <Button type="submit">Save Attendance</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
