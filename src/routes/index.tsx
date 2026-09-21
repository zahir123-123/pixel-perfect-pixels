import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Clock3,
  FileText,
  Home,
  IndianRupee,
  ListTree,
  Menu,
  Search,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Approval | A.I.T's, A.C.S. Night College" },
      { name: "description", content: "Review student documents by approval status." },
      { property: "og:title", content: "Approval | A.I.T's, A.C.S. Night College" },
      { property: "og:description", content: "Review student documents by approval status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const documents = [
  ["F2025001", "Ayaan Shaikh", "Caste Certificate"],
  ["F2025002", "Sana Khan", "Income Certificate"],
  ["F2025003", "Mohd. Rehan", "Domicile Certificate"],
  ["F2025004", "Bushra Ansari", "Aadhaar Card"],
  ["F2025005", "Armaan Patel", "Gap Certificate"],
];

const statuses = [
  { key: "pending", title: "Pending", subtitle: "Documents waiting for approval", count: 12, icon: Clock3 },
  { key: "rejected", title: "Rejected", subtitle: "Documents rejected by verifier", count: 3, icon: XCircle },
  { key: "approved", title: "Approved", subtitle: "Documents approved successfully", count: 28, icon: CheckCircle2 },
] as const;

const toneClasses = {
  pending: {
    shell: "border-l-pending bg-pending-soft/45",
    soft: "bg-pending-soft text-pending",
    count: "bg-pending-soft text-pending",
  },
  rejected: {
    shell: "border-l-rejected bg-rejected-soft/45",
    soft: "bg-rejected-soft text-rejected",
    count: "bg-rejected-soft text-rejected",
  },
  approved: {
    shell: "border-l-approved bg-approved-soft/45",
    soft: "bg-approved-soft text-approved",
    count: "bg-approved-soft text-approved",
  },
};

function Index() {
  const [activeTab, setActiveTab] = useState("Document");
  const [open, setOpen] = useState<string>("pending");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => documents.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main className="min-h-dvh bg-muted/25 text-approval-deep sm:grid sm:place-items-start sm:py-6">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-hidden bg-background sm:min-h-0 sm:rounded-[26px] sm:approval-shadow">
        <header className="relative h-[164px] overflow-hidden rounded-b-[25px] bg-approval-blue px-5 pb-4 pt-5 text-primary-foreground">
          <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-primary-foreground/10" />
          <div className="grid grid-cols-[44px_1fr_44px] items-center">
            <Button aria-label="Go back" className="grid size-11 place-items-center rounded-full border border-primary-foreground/40 bg-primary-foreground/10"><ArrowLeft size={25} /></Button>
            <h1 className="text-center text-[19px] font-bold tracking-[0.04em]">APPROVAL</h1>
            <Button aria-label="Open menu" className="grid size-11 place-items-center rounded-full border border-primary-foreground/40 bg-primary-foreground/10"><Menu size={24} /></Button>
          </div>
          <div className="mt-3 grid grid-cols-[58px_1px_minmax(0,1fr)] items-center gap-4">
            <div className="grid size-[58px] place-items-center rounded-full border-[3px] border-primary-foreground bg-approved-soft text-approved approval-shadow">
              <BookOpen size={28} strokeWidth={2.6} />
            </div>
            <div className="h-11 bg-primary-foreground/80" />
            <div className="min-w-0">
              <h2 className="truncate text-[17px] font-bold">A.I.T's,A.C.S. NIGHT COLLEGE (Abrar)</h2>
              <p className="mt-0.5 truncate text-[14px] font-normal text-primary-foreground/90">FYBA - First Year Bachelor of Arts</p>
            </div>
          </div>
        </header>

        <section className="px-[18px] pb-28 pt-[13px]">
          <div className="grid grid-cols-3 rounded-[14px] bg-muted/70 p-1 approval-panel">
            {([{ label: "Subject", icon: BookOpen }, { label: "Document", icon: FileText }, { label: "Fee", icon: IndianRupee }]).map(({ label, icon: Icon }) => {
              const selected = activeTab === label;
              return <Button key={label} variant="tab" onClick={() => setActiveTab(label)} className={`relative flex h-[48px] items-center justify-center gap-2 rounded-[11px] text-[15px] font-bold ${selected ? "bg-approval-blue text-primary-foreground approval-shadow" : "text-muted-foreground"}`}>
                <Icon size={21} strokeWidth={2.4} /> {label}
                {selected && <span className="absolute -bottom-2 size-4 rotate-45 bg-approval-blue" />}
              </Button>;
            })}
          </div>

          <div className="mt-5 space-y-[14px]">
            {statuses.map((status) => {
              const expanded = open === status.key;
              const tone = toneClasses[status.key];
              const Icon = status.icon;
              return (
                <article key={status.key} className={`overflow-hidden rounded-[15px] border border-border border-l-[3px] approval-panel ${tone.shell}`}>
                  <div className="grid grid-cols-[56px_minmax(0,1fr)_55px_38px] items-center gap-3 px-3 py-[9px]">
                    <div className={`grid size-14 place-items-center rounded-[13px] ${tone.soft}`}><FileText size={31} strokeWidth={2.4} /><Icon className="absolute translate-x-3 translate-y-3" size={16} strokeWidth={3} /></div>
                    <div className="min-w-0"><h3 className="text-[19px] font-extrabold leading-none">{status.title}</h3><p className="mt-1.5 truncate text-[13px] leading-none text-muted-foreground">{status.subtitle}</p></div>
                    <strong className={`grid h-12 place-items-center rounded-[12px] text-[29px] leading-none ${tone.count}`}>{status.count}</strong>
                    <Button variant="icon" size="icon" aria-label={`${expanded ? "Collapse" : "Expand"} ${status.title}`} onClick={() => setOpen(expanded ? "" : status.key)} className={`grid size-9 place-items-center rounded-full ${tone.soft}`}>{expanded ? <ChevronUp size={21} /> : <ChevronDown size={21} />}</Button>
                  </div>
                  {expanded && status.key === "pending" && (
                    <div className="border-t border-border bg-background px-3 pb-2 pt-2">
                      <label className="flex h-[32px] items-center gap-2 rounded-full border border-border px-4 text-muted-foreground">
                        <Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-[12px] outline-none" placeholder="Search by form no, name or category..." />
                      </label>
                      <div className="mt-2 overflow-hidden rounded-[11px] border border-border">
                        <table className="w-full table-fixed text-left text-[11px]">
                          <thead className="h-[29px] bg-muted/70 text-[11px] font-bold text-muted-foreground"><tr><th className="w-[21%] px-2">Form No.</th><th className="w-[28%] px-2">Name</th><th className="w-[32%] px-2">Category</th><th className="w-[19%] px-1 text-center">Action</th></tr></thead>
                          <tbody>{filtered.map((row) => <tr key={row[0]} className="h-[34px] border-t border-border text-[11px]"><td className="px-2">{row[0]}</td><td className="truncate px-2">{row[1]}</td><td className="truncate px-2">{row[2]}</td><td className="px-1 text-center"><Button variant="view" className="view-cut-button h-[25px] w-full p-0 font-bold text-approved hover:bg-approved" onClick={() => window.alert(`${row[1]} — ${row[2]}`)}><span>View</span></Button></td></tr>)}</tbody>
                        </table>
                      </div>
                      <div className="mt-2 grid h-[24px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-[12px] text-muted-foreground"><span>Showing {filtered.length} of 12 pending documents</span><Button variant="icon" size="icon" className="flex h-6 w-auto items-center gap-1 p-0 font-bold text-approval-blue">View All <ArrowRight size={15} /></Button></div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <nav className="fixed inset-x-0 bottom-14 z-10 mx-auto grid w-[calc(100%-36px)] max-w-[394px] grid-cols-4 rounded-[25px] border border-border bg-background px-2 py-2 approval-shadow">
          {([{ label: "Home", icon: Home }, { label: "Notices", icon: Bell }, { label: "Reports", icon: ListTree }, { label: "Profile", icon: CircleUserRound }]).map(({ label, icon: Icon }, index) => <Button key={label} variant="nav" className={`flex h-[55px] flex-col items-center justify-center gap-1 text-[11px] font-bold ${index === 0 ? "text-approval-blue" : "text-muted-foreground"}`}><span className={index === 0 ? "grid size-8 place-items-center rounded-full bg-approval-blue/10" : "grid size-8 place-items-center"}><Icon size={23} strokeWidth={2.5} /></span>{label}</Button>)}
        </nav>
      </div>
    </main>
  );
}
