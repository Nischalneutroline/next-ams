import { NextRequest, NextResponse } from "next/server"
import { announcementOrOfferSchema } from "@/features/announcement-offer/schemas/schema"
import {
  AnnouncementOrOffer,
  Showon,
  TargetAudience,
  ExpirationDuration,
} from "@/features/announcement-offer/types/types"
import { ZodError } from "zod"
import { prisma } from "@/lib/prisma"
import { getAnnouncementOrOfferById } from "@/db/announcement-offer"

// Dummy data (for now, we will store announcements in this array)
let announcements: AnnouncementOrOffer[] = [
  {
    id: "1",
    title: "Special Offer: 20% Off All Services!", // Required
    description: "Get 20% off on all our services for a limited time.", // Optional
    message: "Use code '20OFF' to claim your discount.", // Optional
    audience: TargetAudience.ALL, // Required (Target audience)
    isImmediate: true, // Required (If the offer is immediate)
    scheduledAt: "2025-04-10T10:00:00Z", // Required (Scheduled date/time in ISO format)
    showOn: Showon.BANNER, // Required (Where the offer will show, e.g., on a banner)
    expiredAt: ExpirationDuration.THIRTY_DAYS, // Required (Expiration duration or "never")
  },
]

// Create a new announcement or offer
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsedData = announcementOrOfferSchema.parse(body)

    // create announcement in prisma
    const newAnnouncement = await prisma.announcementOrOffer.create({
      data: {
        title: parsedData.title,
        description: parsedData.description,
        message: parsedData.message,
        audience: parsedData.audience,
        isImmediate: parsedData.isImmediate,
        scheduledAt: parsedData.scheduledAt,
        showOn: parsedData.showOn,
        expiredAt: parsedData.expiredAt,
      },
    })

    return NextResponse.json(
      {
        message: "Announcement or offer created successfully",
        announcement: newAnnouncement,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Fetch all announcements or offers
export async function GET() {
  try {
    const announcementOrOffers = await prisma.announcementOrOffer.findMany()

    if (announcements.length === 0) {
      return NextResponse.json(
        { error: "No announcements found" },
        { status: 404 }
      )
    }
    return NextResponse.json(announcementOrOffers, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    )
  }
}

// Update an existing announcement or offer
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const parsedData = announcementOrOfferSchema.parse(body)

    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: "Announcement/Offer Id required!" },
        { status: 400 }
      )
    }

    const existingAnnouncement = await getAnnouncementOrOfferById(id)

    if (!existingAnnouncement) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      )
    }

    // update announcement in prisma
    const updatedAnnouncement = await prisma.announcementOrOffer.update({
      where: { id },
      data: {
        title: parsedData.title,
        description: parsedData.description,
        message: parsedData.message,
        audience: parsedData.audience,
        isImmediate: parsedData.isImmediate,
        scheduledAt: parsedData.scheduledAt,
        showOn: parsedData.showOn,
        expiredAt: parsedData.expiredAt,
      },
    })

    if (!updatedAnnouncement) {
      return NextResponse.json(
        { error: "Announcement/Offer couldn't be updated" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        message: "Announcement updated successfully",
        announcement: updatedAnnouncement,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Delete an announcement or offer
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "Announcement Id required!" },
        { status: 400 }
      )
    }

    const existingAnnouncement = await getAnnouncementOrOfferById(id)
    if (!existingAnnouncement) {
      return NextResponse.json(
        { error: "Announcement/Offer not found" },
        { status: 404 }
      )
    }

    const deletedAnnouncement = await prisma.announcementOrOffer.delete({
      where: { id },
    })

    return NextResponse.json(
      {
        message: "Announcement deleted successfully",
        announcement: deletedAnnouncement,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete announcement" },
      { status: 500 }
    )
  }
}
