import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import prisma from "@/lib/prisma"

export default async function CellGroupsPage() {
  // Fetch cell groups from the database
  const cellGroups = await prisma.cellGroup.findMany({
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Cell Groups</h1>
        <Button asChild>
          <Link href="/cell-groups/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Cell Group
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Cell Groups</CardTitle>
          <CardDescription>Manage church cell groups and their members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cellGroups.length === 0 ? (
                <TableRow>
                  <TableCell className="font-medium">No cell groups found</TableCell>
                  <TableCell colSpan={3}></TableCell>
                </TableRow>
              ) : (
                cellGroups.map((cellGroup) => (
                  <TableRow key={cellGroup.id}>
                    <TableCell className="font-medium">{cellGroup.name}</TableCell>
                    <TableCell>{cellGroup.description || "N/A"}</TableCell>
                    <TableCell>{cellGroup._count.members}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/cell-groups/${cellGroup.id}`}>View</Link>
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
