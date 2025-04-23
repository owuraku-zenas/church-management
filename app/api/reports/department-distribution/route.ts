import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Get all departments with member counts
    const departments = await prisma.department.findMany({
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
    })

    // Get total member count
    const totalMembers = await prisma.member.count()

    // Calculate percentages
    const departmentDistribution = departments.map((dept) => ({
      id: dept.id,
      name: dept.name,
      memberCount: dept._count.members,
      percentage: totalMembers > 0 ? Math.round((dept._count.members / totalMembers) * 100) : 0,
    }))

    return NextResponse.json({
      departments: departmentDistribution,
      totalMembers,
    })
  } catch (error) {
    console.error("Error generating department distribution report:", error)
    return NextResponse.json({ error: "Failed to generate department distribution report" }, { status: 500 })
  }
}
