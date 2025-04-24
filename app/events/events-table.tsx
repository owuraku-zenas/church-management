"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Event {
  id: string
  name: string
  type: string
  date: Date
  createdBy: {
    id: string
    name: string
  }
  _count: {
    attendances: number
  }
}

interface EventsTableProps {
  events: Event[]
}

function formatEventType(type: string) {
  const types = {
    MIDWEEK: "Midweek Service",
    SUNDAY: "Sunday Service",
    PRAYER: "Prayer Service",
    SPECIAL: "Special Program",
  }
  return types[type as keyof typeof types] || type
}

export function EventsTable({ events }: EventsTableProps) {
  const [selectedType, setSelectedType] = useState<string>("")

  const filteredEvents = selectedType
    ? events.filter(event => event.type === selectedType)
    : events

  return (
    <>
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Events</SelectItem>
          <SelectItem value="SUNDAY">Sunday Service</SelectItem>
          <SelectItem value="MIDWEEK">Midweek Service</SelectItem>
          <SelectItem value="PRAYER">Prayer Service</SelectItem>
          <SelectItem value="SPECIAL">Special Program</SelectItem>
        </SelectContent>
      </Select>

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>Showing {filteredEvents.length} church events</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell className="font-medium">No events found</TableCell>
                  <TableCell colSpan={5}></TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{formatEventType(event.type)}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.createdBy.name}</TableCell>
                    <TableCell>{event._count.attendances}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/attendance/${event.id}`}>Mark Attendance</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
} 