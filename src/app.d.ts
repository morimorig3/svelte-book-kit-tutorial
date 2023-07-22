// See https://kit.svelte.dev/docs/types#app

import type { Session } from "$lib/server/mongodb";
import type { Document, WithId } from "mongodb";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      currentUser: WithId<Session>;
    }
    // interface PageData {}
    // interface Platform {}
    type;
  }
}

export {};
