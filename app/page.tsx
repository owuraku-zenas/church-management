import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Users, Calendar, ClipboardList, BarChart3 } from "lucide-react"
import prisma from "@/lib/prisma"

export default async function Home() {
  // Fetch counts from the database
  const memberCount = await prisma.member.count()
  const eventCount = await prisma.event.count()
  const departmentCount = await prisma.department.count()
  const cellGroupCount = await prisma.cellGroup.count()

  // Calculate attendance rate (if there are events)
  let attendanceRate = 0
  if (eventCount > 0) {
    const totalAttendances = await prisma.attendance.count({
      where: {
        status: "PRESENT",
      },
    })
    const totalPossibleAttendances = memberCount * eventCount
    attendanceRate = totalPossibleAttendances > 0 ? Math.round((totalAttendances / totalPossibleAttendances) * 100) : 0
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Church Membership Management</h1>
        <p className="text-xl text-muted-foreground">Manage members, events, and attendance in one place</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Members</CardTitle>
            <UserPlus className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{memberCount}</div>
            <p className="text-xs text-muted-foreground">Total registered members</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/members">Manage Members</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Events</CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{eventCount}</div>
            <p className="text-xs text-muted-foreground">Total events created</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/events">Manage Events</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Attendance</CardTitle>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Average attendance rate</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/attendance">Track Attendance</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Departments</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{departmentCount}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/departments">Manage Departments</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Cell Groups</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cellGroupCount}</div>
            <p className="text-xs text-muted-foreground">Active cell groups</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/cell-groups">Manage Cell Groups</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Reports</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Available reports</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/reports">View Reports</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
