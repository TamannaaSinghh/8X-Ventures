"use client";

import { LoopList } from "@/components/ui/LoopList";
import { teamMentors } from "@/content/team";

/**
 * The mentor bands, on the shared looping list — see `ui/LoopList`, which LP
 * Day's "deep-tech needs more than capital" uses too.
 */
export function MentorRail() {
  return (
    <LoopList
      items={teamMentors.items}
      activeIndex={teamMentors.activeIndex}
      label={teamMentors.eyebrow}
    />
  );
}
