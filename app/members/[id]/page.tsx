import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Phone, Mail, School, Home, Users } from "lucide-react"
import { notFound } from "next/navigation"

// Dummy data
const dummyMember = {
  id: "1",
  name: "John Doe",
  phone: "+1234567890",
  email: "john.doe@example.com",
  birthday: "1995-05-15",
  university: "University of Example",
  program: "Computer Science",
  hostel: "Unity Hall",
  roomNumber: "A101",
  cellGroup: {
    id: "1",
    name: "Alpha Cell Group"
  },
  invitedBy: {
    id: "2",
    name: "Jane Smith"
  },
  departments: [
    {
      departmentId: "1",
      department: {
        id: "1",
        name: "Worship"
      }
    },
    {
      departmentId: "2",
      department: {
        id: "2",
        name: "Media"
      }
    }
  ],
  attendances: [
    {
      id: "1",
      event: {
        id: "1",
        name: "Sunday Service",
        date: "2024-03-17T10:00:00Z"
      }
    },
    {
      id: "2",
      event: {
        id: "2",
        name: "Bible Study",
        date: "2024-03-15T18:00:00Z"
      }
    }
  ]
}

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  // For demo purposes, we'll just use the dummy member
  const member = dummyMember

  // Dummy attendance statistics
  const attendanceCount = 15
  const totalEvents = 20
  const attendanceRate = Math.round((attendanceCount / totalEvents) * 100)

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

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <CardDescription>Member Profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                {member.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{member.email}</span>
                  </div>
                )}
                {member.birthday && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(member.birthday).toLocaleDateString()}</span>
                  </div>
                )}
                {member.university && (
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {member.university} {member.program ? `- ${member.program}` : ""}
                    </span>
                  </div>
                )}
                {(member.hostel || member.roomNumber) && (
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {member.hostel} {member.roomNumber ? `Room ${member.roomNumber}` : ""}
                    </span>
                  </div>
                )}
                {member.cellGroup && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Cell Group: {member.cellGroup.name}</span>
                  </div>
                )}
                {member.invitedBy && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Invited by: {member.invitedBy.name}</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Departments</h3>
                {member.departments.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {member.departments.map((dept) => (
                      <div key={dept.departmentId} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {dept.department.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No departments assigned</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Member attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold">{attendanceRate}%</div>
                <p className="text-sm text-muted-foreground">Overall attendance rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{attendanceCount}</div>
                <p className="text-sm text-muted-foreground">Events attended</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Last events attended</CardDescription>
            </CardHeader>
            <CardContent>
              {member.attendances.length > 0 ? (
                <ul className="space-y-2">
                  {member.attendances.map((attendance) => (
                    <li key={attendance.id} className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{attendance.event.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(attendance.event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No recent events attended</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
