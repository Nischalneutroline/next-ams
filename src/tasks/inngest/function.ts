import { inngestClient } from "@/tasks/inngest/client";
import { prisma } from "@/lib/prisma";

export const cronReminder = inngestClient.createFunction(
  {
    id: "cron-reminder",
    name: "Send Reminder (CRON)",
  },
  {
    cron: "0 * * * *", // every 1 hr
  },
  async ({ step }) => {
    // Step 1: Fetch all reminders with relations
    /*    const reminders = await step.run("fetch-reminders", async () => {
      return await prisma.reminder.findMany({
        include: {
          services: true,
          notifications: true,
          reminderOffset: true,
        },
      });
    });
 */
    const reminders: any[] = [
      {
        send48hr: "scheduled",
        send24Hr: "scheduled",
        send1Hr: "scheduled",
        sendOffset: "2880",
        scheduledAt: "2025-04-08T13:34:56.789Z",
      },
      {
        send48hr: "sent",
        send24Hr: "scheduled",
        send1Hr: "scheduled",
        sendOffset: "2880",
        scheduledAt: "2025-04-06T12:00:56.789Z",
      },
    ];

    await step.run("process-reminders", async () => {
      // Get the current time
      const now = new Date();

      for (const reminder of reminders) {
        const scheduledAt = new Date(reminder.scheduledAt);

        // Calculate the difference in milliseconds
        const diffInMilliseconds = scheduledAt.getTime() - now.getTime();

        // Convert milliseconds to minutes
        const diffInMinutes = diffInMilliseconds / 1000 / 60;

        console.log(`Time difference for reminder: ${diffInMinutes} minutes`);

        // Compare with 48 hours (2880 minutes), 24 hours (1440 minutes), and 1 hour (60 minutes)
        if (diffInMinutes <= 105 && diffInMinutes > 1 && reminder.send1Hr === "scheduled") {
          console.log("Around 1-hour left for appointment ...");
          // Send reminder for 48 hours
          reminder.send1Hr = "sent"; // Update the status to sent
        } else if (
          diffInMinutes <= 36 * 60 &&
          diffInMinutes > 12 * 60 &&
          reminder.send24Hr === "scheduled"
        ) {
          console.log("Around 24-hour left for appointment ...");
          // Send reminder for 24 hours
          reminder.send24Hr = "sent"; // Update the status to sent
        } else if (
          diffInMinutes <= 56 * 60 &&
          diffInMinutes > 36 * 60 &&
          reminder.send48hr === "scheduled"
        ) {
          console.log("Around 48-hour left for appointment ...");
          // Send reminder for 1 hour
          reminder.send48hr = "sent"; // Update the status to sent
        }
      }
      console.log('reminder',reminders);
      return reminders;
    });
  }
);
