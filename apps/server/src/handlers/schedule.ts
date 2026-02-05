import { eq } from "drizzle-orm";
import { uuids } from "../schema/uuids";
import { uuidle } from "./uuidle";

async function newUUID() {
  if (!uuidle.uuid?.createdAt || !uuidle.db) return;
  if (Date.now() - uuidle.uuid.createdAt.getTime() >= 24 * 60 * 60 * 1000) {
    let newUUID: string = "";
    let exists: boolean = true;
    while (exists) {
      const uuid = crypto.randomUUID();
      const entry = await uuidle.db
        .select()
        .from(uuids)
        .where(eq(uuids.id, uuid))
        .limit(1);

      if (entry.length === 0) {
        newUUID == uuid;
        exists = false;
      }
    }

    uuidle.db?.insert(uuids).values({
      id: newUUID,
    });

    return;
  } else {
    return uuidle.uuid.createdAt.getTime() - 24 * 60 * 60 * 1000;
  }
}

export default async function schedule() {
  try {
    const wait = await newUUID();
    let delay: number;
    if (typeof wait === "number") {
      delay = Math.max(wait - Date.now(), 0);
    } else {
      delay = 24 * 60 * 60 * 1000;
    }

    setTimeout(schedule, delay);
  } catch (err) {
    if(uuidle.sentryEnabled) {
        uuidle.sentry?.captureException(err)
    } else {
        console.error("Error when scheduling", err)
    }
    setTimeout(schedule, 24 * 60 * 60 * 1000)
  }
}
