import { Download, FileText, Mail, UserRound } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div id="profile-page" data-avatar-target="profile-page">
      <PageHeader
        eyebrow="Candidate profile"
        title="Eunice Una Gobbato"
        description="A polished professional profile for quick review during live demos and hiring conversations."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <UserRound className="size-5 text-[var(--muted)]" />
            <h2 className="text-xl font-semibold">Professional profile</h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Results-oriented professional with a strong background in operations, customer
            experience, and digital workflows. This profile is designed to make reviewing
            experience and qualifications quick and easy in a live demo environment.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Contact
              </p>
              <p className="mt-2 font-medium">Eunice Una Gobbato</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Email
              </p>
              <p className="mt-2 font-medium">eunice@example.com</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-[var(--muted)]" />
            <h2 className="text-xl font-semibold">Documents</h2>
          </div>

          <div className="mt-5 space-y-3">
            <a
              href="/2026Eunice_Una_Gobbato_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-medium transition hover:bg-[var(--surface)]"
            >
              <span>Resume</span>
              <span className="inline-flex items-center gap-2">
                <Download className="size-4" />
                PDF
              </span>
            </a>

            <a
              href="/Eunice_CoverLetter.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-sm font-medium transition hover:bg-[var(--surface)]"
            >
              <span>Cover letter</span>
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" />
                PDF
              </span>
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
