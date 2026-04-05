import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

// ── Animation helpers ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Section({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({ num, title }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs text-orange-400 border border-orange-400/30 px-2 py-1 rounded">
        {num}
      </span>
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="flex-1 h-px bg-white/8" />
    </motion.div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    group: "Core Java",
    tags: [
      { label: "Java 8–17", hot: true },
      { label: "OOP & SOLID", hot: true },
      { label: "Collections", hot: true },
      { label: "Multithreading", hot: true },
      { label: "Streams API" },
      { label: "Generics" },
      { label: "Lambda & Functional" },
    ],
  },
  {
    group: "Frameworks",
    tags: [
      { label: "Spring Boot", hot: true },
      { label: "Spring MVC", hot: true },
      { label: "Hibernate / JPA", hot: true },
      { label: "Spring Security" },
      { label: "J2EE" },
      { label: "JSP / Servlet" },
      { label: "JDBC" },
    ],
  },
  {
    group: "APIs & Architecture",
    tags: [
      { label: "RESTful APIs", hot: true },
      { label: "Microservices", hot: true },
      { label: "API Gateway" },
      { label: "Service Discovery" },
      // { label: "Swagger / OpenAPI" },
      { label: "JSON / XML" },
    ],
  },
  {
    group: "Databases & Messaging",
    tags: [
      { label: "MySQL", hot: true },
      // { label: "MongoDB" },
      { label: "Redis" },
      { label: "Apache Kafka" },
      { label: "Query Optimization" },
    ],
  },
  {
    group: "DevOps & Tools",
    tags: [
      { label: "Git & GitHub", hot: true },
      { label: "Docker" },
      { label: "Maven" },
      { label: "CI/CD" },
      // { label: "Jenkins" },
      { label: "Postman" },
    ],
  },
  {
    group: "Frontend (Supporting)",
    tags: [
      { label: "React.js" },
      { label: "HTML / CSS" },
      { label: "Bootstrap 5" },
      { label: "jQuery" },
      { label: "JavaScript" },
    ],
  },
];

const EXPERIENCES = [
  {
    role: "Java Developer — Esehat Appointment Module",
    company: "ITSC Technologies Pvt. Ltd.",
    period: "2023 – 2025",
    desc: "Led backend for a digital OPD appointment platform used across healthcare facilities. Built Spring Boot microservices with REST APIs consumed by React.js, enabling real-time booking, rescheduling, and cancellations.",
    achievements: [
      "Designed and implemented 20+ RESTful API endpoints for appointments, doctor schedules, and patient records",
      "Optimized JDBC + MySQL queries, reducing API response time by ~30%",
      "Defined API contracts with the frontend team and enforced global error-response standards",
      "Implemented concurrent slot-booking logic to prevent double-booking under load",
    ],
  },
  {
    role: "Java Developer — Esehat Healthcare Platform",
    company: "ITSC Technologies Pvt. Ltd.",
    period: "2022 – 2023",
    desc: "Built modules in a full-scale hospital management system covering billing, inventory, and patient scheduling using J2EE stack in an Agile team.",
    achievements: [
      "Delivered patient billing and inventory modules using JSP, Servlet, and JDBC",
      "Cut reporting dashboard query time by 25% through SQL query refactoring and indexing",
      "Wrote reusable utility classes for date handling, session management, and data formatting",
      "Participated in bi-weekly code reviews; refactored legacy modules to meet updated coding standards",
    ],
  },
  {
    role: "Java Developer — Ayush Government Portal",
    company: "ITSC Technologies · MP State Govt.",
    period: "2021 – 2022",
    desc: "Developed a Madhya Pradesh state government portal for drug licensing of Ayurvedic, Unani, Siddha, and Homeopathic medicines — a high-accountability, public-facing compliance system.",
    achievements: [
      "Built multi-step license application and approval workflows with JSP, Servlet, and JDBC",
      "Developed responsive UI with HTML5, Bootstrap 5, jQuery, and AJAX",
      "Engaged directly with state government stakeholders to convert requirements into technical specs",
      "Contributed to a 10% reduction in project delivery timeline through proactive requirement clarification",
    ],
  },
];

// const CERTS = [
//   { icon: "☕", name: "Oracle Certified Professional: Java SE 17", org: "Oracle", note: "OCP — Strongly Recommended" },
//   { icon: "🍃", name: "Spring Professional Certification", org: "VMware / Broadcom", note: "Spring Boot & Framework" },
//   { icon: "☁️", name: "AWS Certified Developer – Associate", org: "Amazon Web Services", note: "Cloud + Microservices" },
//   { icon: "🐳", name: "Docker & Kubernetes Fundamentals", org: "KodeKloud / Udemy", note: "Containers & Orchestration" },
// ];

// ── ReactFlow Architecture Diagram ─────────────────────────────────────────
const nodeStyle = (accent) => ({
  background: accent ? "rgba(234,88,12,0.12)" : "#1e1e1e",
  border: `1px solid ${accent ? "rgba(234,88,12,0.5)" : "rgba(255,255,255,0.1)"}`,
  borderRadius: 8,
  color: accent ? "#fb923c" : "#ccc",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  padding: "8px 14px",
});

const flowNodes = [
  { id: "1", position: { x: 0, y: 80 },   data: { label: "React UI" },          style: nodeStyle(false) },
  { id: "2", position: { x: 180, y: 0 },   data: { label: "Auth Filter" },       style: nodeStyle(false) },
  { id: "3", position: { x: 180, y: 80 },  data: { label: "API Gateway" },       style: nodeStyle(true) },
  { id: "4", position: { x: 360, y: 0 },   data: { label: "Appointment Svc" },   style: nodeStyle(true) },
  { id: "5", position: { x: 360, y: 80 },  data: { label: "Doctor Svc" },        style: nodeStyle(true) },
  { id: "6", position: { x: 360, y: 160 }, data: { label: "Patient Svc" },       style: nodeStyle(true) },
  { id: "7", position: { x: 560, y: 40 },  data: { label: "JDBC Template" },     style: nodeStyle(false) },
  { id: "8", position: { x: 560, y: 120 }, data: { label: "MySQL DB" },          style: nodeStyle(true) },
  { id: "9", position: { x: 360, y: 240 }, data: { label: "Notification Svc" },  style: nodeStyle(false) },
  { id: "10",position: { x: 560, y: 240 }, data: { label: "Email / SMS" },       style: nodeStyle(false) },
];

const flowEdges = [
  { id: "e1-2", source: "1", target: "2", style: { stroke: "#555" }, animated: false },
  { id: "e2-3", source: "2", target: "3", style: { stroke: "#ea580c" }, animated: true },
  { id: "e3-4", source: "3", target: "4", style: { stroke: "#555" } },
  { id: "e3-5", source: "3", target: "5", style: { stroke: "#555" } },
  { id: "e3-6", source: "3", target: "6", style: { stroke: "#555" } },
  { id: "e4-7", source: "4", target: "7", style: { stroke: "#ea580c" }, animated: true },
  { id: "e5-7", source: "5", target: "7", style: { stroke: "#ea580c" }, animated: true },
  { id: "e6-7", source: "6", target: "7", style: { stroke: "#ea580c" }, animated: true },
  { id: "e7-8", source: "7", target: "8", style: { stroke: "#ea580c" }, animated: true },
  { id: "e4-9", source: "4", target: "9", style: { stroke: "#555" } },
  { id: "e9-10",source: "9", target: "10",style: { stroke: "#555" } },
];

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV = ["About", "Skills", "Experience", "Project", "Education", "Contact"];

function Navbar() {
  const [active, setActive] = useState("About");
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/8">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-sm text-orange-400">&lt;AshokKumar /&gt;</span>
        <div className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              onClick={() => setActive(n)}
              className={`text-xs font-mono tracking-wide transition-colors ${
                active === n ? "text-orange-400" : "text-zinc-400 hover:text-white"
              }`}
            >
              {n}
            </a>
          ))}
        </div>
        <a
          href="mailto:ashok.20ppc1090@gmail.com"
          className="text-xs font-mono bg-orange-500 hover:bg-orange-400 text-white px-3 py-1.5 rounded transition-colors"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Sora',sans-serif] antialiased">
      <Navbar />

      {/* ── HERO ── */}
      <section id="about" className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="font-mono text-xs text-orange-400 tracking-widest uppercase">
                Java Backend Developer · Open to Opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-[-0.03em] mb-6"
            >
              Building systems
              <br />
              that{" "}
              <span className="text-orange-400">scale,</span>
              <br />
              <span className="text-orange-400">perform,</span> and last.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-zinc-400 text-base leading-relaxed max-w-xl mb-8"
            >
              4+ years designing robust backend architectures with{" "}
              <strong className="text-white">Spring Boot</strong>, Microservices,
              and REST APIs. Shipped production systems in healthcare and government
              domains. Based in Bhopal, India — open to relocation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="mailto:ashok.20ppc1090@gmail.com"
                className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Get In Touch
              </a>
              <a
                href="#experience"
                className="border border-white/10 hover:border-orange-400/50 text-zinc-300 hover:text-orange-400 text-sm px-5 py-2.5 rounded-lg transition-all"
              >
                View Experience →
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-4xl font-bold text-white shadow-[0_0_60px_rgba(234,88,12,0.35)]"
          >
            AK
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 mt-16 border border-white/8 rounded-xl overflow-hidden"
        >
          {[
            ["4+", "Years Experience"],
            ["3", "Production Projects"],
            ["15+", "Technologies"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="py-6 text-center bg-white/[0.03] border-r border-white/8 last:border-0"
            >
              <div className="text-3xl font-mono font-semibold text-orange-400">{num}</div>
              <div className="text-xs text-zinc-500 mt-1 tracking-wide">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-20 px-6 max-w-5xl mx-auto">
        <Section>
          <SectionHeader num="02" title="Technical Skills" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((group, gi) => (
              <motion.div
                key={group.group}
                variants={fadeUp}
                custom={gi * 0.5}
                className="bg-white/[0.03] border border-white/8 rounded-xl p-5"
              >
                <div className="font-mono text-[10px] text-orange-400 tracking-widest uppercase mb-4">
                  {group.group}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`text-xs px-2.5 py-1 rounded-md border ${
                        t.hot
                          ? "bg-orange-500/10 border-orange-400/30 text-orange-300"
                          : "bg-white/[0.04] border-white/8 text-zinc-400"
                      }`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-20 px-6 max-w-5xl mx-auto">
        <Section>
          <SectionHeader num="03" title="Experience" />
          <div className="space-y-5">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.role}
                variants={fadeUp}
                custom={i}
                className="relative bg-white/[0.03] border border-white/8 rounded-xl p-6 pl-8 overflow-hidden group hover:border-orange-400/20 transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500 rounded-l-xl" />
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-white">{exp.role}</div>
                    <div className="text-sm text-orange-400 mt-0.5">{exp.company}</div>
                  </div>
                  <span className="font-mono text-xs bg-white/5 text-zinc-400 px-3 py-1 rounded-md border border-white/8 shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{exp.desc}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-zinc-400">
                      <span className="text-orange-400 font-mono shrink-0">→</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── FEATURED PROJECT + REACTFLOW ── */}
      <section id="project" className="py-20 px-6 max-w-5xl mx-auto">
        <Section>
          <SectionHeader num="04" title="Featured Project" />
          <motion.div
            variants={fadeUp}
            className="border border-orange-400/20 rounded-2xl p-7 bg-white/[0.02]"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[10px] bg-orange-500/10 text-orange-400 border border-orange-400/25 px-3 py-1 rounded-full tracking-widest">
                ★ FEATURED
              </span>
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Esehat Appointment — Digital OPD Platform
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-2xl">
              A microservices-based appointment system for healthcare OPDs. Patients book,
              reschedule, and cancel appointments in real time. Built with Spring Boot REST
              APIs, concurrent booking logic, MySQL, and a React.js frontend — handling
              thousands of daily appointments across hospital facilities.
            </p>

            {/* ReactFlow Diagram */}
            <div className="rounded-xl overflow-hidden border border-white/8 mb-8">
              <div className="bg-white/[0.04] border-b border-white/8 px-4 py-2.5 flex items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest">
                  // INTERACTIVE ARCHITECTURE — drag nodes to explore
                </span>
              </div>
              <div style={{ height: 320, background: "#0f0f0f" }}>
                <ReactFlow
                  nodes={flowNodes}
                  edges={flowEdges}
                  fitView
                  fitViewOptions={{ padding: 0.3 }}
                  nodesDraggable={true}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background color="#2a2a2a" gap={20} size={1} />
                  <Controls
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                    }}
                  />
                  <MiniMap
                    nodeColor={() => "#ea580c"}
                    maskColor="rgba(0,0,0,0.6)"
                    style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </ReactFlow>
              </div>
            </div>

            {/* Meta grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["Tech Stack", "Java · Spring Boot · JDBC · MySQL · React.js"],
                ["Key Challenge", "Concurrent slot booking without double-booking"],
                ["Performance Win", "~30% faster query response via JDBC optimization"],
                ["Domain", "Healthcare — OPD Management System"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-[#0f0f0f] border border-white/8 rounded-xl p-4"
                >
                  <div className="font-mono text-[10px] text-zinc-500 tracking-widest mb-1.5">
                    {label}
                  </div>
                  <div className="text-sm text-zinc-300 leading-snug">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="py-20 px-6 max-w-5xl mx-auto">
        <Section>
          <SectionHeader num="05" title="Education" />
          <div className="space-y-4">
            {[
              {
                icon: "🎓",
                deg: "B.E. in Computer Science & Engineering",
                inst: "Millennium Institute of Technology & Science, Bhopal",
                meta: "2016 – 2020 · CGPA: 7.67",
              },
              {
                icon: "📘",
                deg: "Senior Secondary — PCM",
                inst: "Dr. B.P.P.S.S. Inter College, Ayodhya",
                meta: "2013 – 2014 · 71.80%",
              },
            ].map((e, i) => (
              <motion.div
                key={e.deg}
                variants={fadeUp}
                custom={i}
                className="flex gap-4 bg-white/[0.03] border border-white/8 rounded-xl p-5 items-start hover:border-orange-400/20 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-xl shrink-0">
                  {e.icon}
                </div>
                <div>
                  <div className="font-medium text-white">{e.deg}</div>
                  <div className="text-sm text-orange-400 mt-0.5">{e.inst}</div>
                  <div className="font-mono text-xs text-zinc-500 mt-1">{e.meta}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          {/* <div className="mt-10">
            <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-5">
              Recommended Certifications
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {CERTS.map((c, i) => (
                <motion.div
                  key={c.name}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-4 bg-white/[0.03] border border-white/8 rounded-xl p-4 items-start hover:border-orange-400/20 transition-colors"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{c.name}</div>
                    <div className="text-xs text-orange-400 mt-0.5">{c.org}</div>
                    <div className="text-xs text-zinc-500 mt-1">{c.note}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div> */}
        </Section>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
        <Section>
          <SectionHeader num="07" title="Get In Touch" />
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "✉", label: "Email", value: "ashok.20ppc1090@gmail.com", href: "mailto:ashok.20ppc1090@gmail.com", breakAll: true },
              { icon: "📱", label: "Phone", value: "+91 7222 922 692", href: "tel:+917222922692" },
              { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/ashok-yadav", href: "https://www.linkedin.com/in/ashok-yadav-a1s9h9o9k6" },
              { icon: "📍", label: "Location", value: "Bangalore, India · Open to Relocation" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 bg-white/[0.03] border border-white/8 rounded-xl p-5 hover:border-orange-400/20 transition-colors min-w-0"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-400/15 flex items-center justify-center text-base shrink-0">
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] text-zinc-500 tracking-widest mb-1">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className={"text-sm text-zinc-200 hover:text-orange-400 transition-colors block " + (c.breakAll ? "break-all" : "truncate")}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-sm text-zinc-200">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 px-6 text-center">
        <p className="font-mono text-xs text-zinc-600">
          Built with React · Tailwind · Framer Motion · ReactFlow ·{" "}
          <span className="text-orange-400">©2025 Ashok Kumar</span>
        </p>
      </footer>
    </div>
  );
}
