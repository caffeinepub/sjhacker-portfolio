import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AlertCircle,
  Award,
  Briefcase,
  Bug,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Heart,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Menu,
  Network,
  Shield,
  Terminal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "./hooks/useQueries";

const queryClient = new QueryClient();

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security Operations (SOC)",
    desc: "SIEM alerts, incident triage, threat hunting. Proficient with Splunk and Microsoft Sentinel.",
    tags: ["Splunk", "Sentinel", "SIEM", "Threat Hunting"],
  },
  {
    icon: <Bug className="w-6 h-6" />,
    title: "Penetration Testing",
    desc: "Web app, network, and infrastructure pen tests. Expert with offensive security toolkits.",
    tags: ["Burp Suite", "Metasploit", "Nmap", "Kali Linux"],
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Vulnerability Assessment",
    desc: "Systematic identification and scoring of vulnerabilities across systems and applications.",
    tags: ["Nessus", "OpenVAS", "CVSS"],
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Security",
    desc: "AWS and Azure security posture management, IAM hardening, and compliance monitoring.",
    tags: ["AWS", "Azure", "IAM", "CloudTrail"],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Incident Response",
    desc: "End-to-end IR cycles following NIST and SANS frameworks for effective threat containment.",
    tags: ["NIST", "SANS", "DFIR"],
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Network Security",
    desc: "Firewall configuration, IDS/IPS deployment, VPN management, and traffic analysis.",
    tags: ["Wireshark", "tcpdump", "IDS/IPS", "VPN"],
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Identity & Access Management",
    desc: "Least-privilege enforcement, MFA implementation, Active Directory and Azure AD management.",
    tags: ["Active Directory", "Azure AD", "MFA"],
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Security Scripting & Automation",
    desc: "Python and Bash automation for log parsing, threat intel enrichment, and SOAR workflows.",
    tags: ["Python", "Bash", "SOAR", "APIs"],
  },
];

const EXPERIENCES = [
  {
    icon: <Briefcase className="w-5 h-5" />,
    role: "Security Engineer",
    company: "Cybersecurity Services Organization",
    location: "Kerala",
    period: "2024 – Present",
    type: "Full-time",
    bullets: [
      "Vulnerability assessments and pen tests on web apps and network infrastructure",
      "SIEM monitoring using Splunk and Microsoft Sentinel",
      "AWS cloud security controls: IAM, S3 policies, CloudTrail auditing",
      "Security integration into the Software Development Life Cycle (SDLC)",
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    role: "Junior Security Analyst",
    company: "IT Security Firm",
    location: "Kerala",
    period: "2023 – 2024",
    type: "Full-time",
    bullets: [
      "SOC operations including phishing investigations and alert triage",
      "Wireshark-based network traffic analysis and anomaly detection",
      "Nessus vulnerability scanning and remediation tracking",
      "Delivered security awareness training to staff and stakeholders",
    ],
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    role: "IT Support & Security Intern",
    company: "Technology Solutions Company",
    location: "India",
    period: "2022 – 2023",
    type: "Internship",
    bullets: [
      "Endpoint management, Active Directory administration, network troubleshooting",
      "Firewall and VPN configuration and maintenance",
      "Log analysis and digital forensics support",
    ],
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    role: "B.Sc. Computer Science",
    company: "University",
    location: "Kerala",
    period: "2019 – 2022",
    type: "Education",
    bullets: [
      "Core focus on networking, operating systems, and information security fundamentals",
      "Certifications: CompTIA Security+, CEH, AWS Cloud Practitioner",
    ],
  },
];

const PROJECTS = [
  {
    category: "Penetration Testing",
    title: "Web Application Penetration Test",
    desc: "Comprehensive black-box pen test on an e-commerce application. Discovered SQL injection, XSS, broken authentication, and IDOR vulnerabilities across the attack surface.",
    outcome: "12 critical vulnerabilities identified & remediated",
    tags: ["Burp Suite", "OWASP Top 10", "Kali Linux", "Python", "CVSS"],
    github: "https://github.com/sjhacker",
  },
  {
    category: "Security Automation",
    title: "SOC Automation & Alert Triage",
    desc: "Python automation pipeline for SIEM alert enrichment using VirusTotal and AbuseIPDB APIs. Reduced analyst toil and accelerated mean time to triage significantly.",
    outcome: "40% reduction in mean time to triage",
    tags: ["Python", "Splunk", "VirusTotal API", "AbuseIPDB", "SOAR"],
    github: "https://github.com/sjhacker",
  },
  {
    category: "Cloud Security",
    title: "AWS Cloud Security Hardening",
    desc: "AWS environment assessment against CIS Foundations Benchmark. Remediated IAM misconfigurations, enforced S3 bucket policies, and enabled comprehensive CloudTrail logging.",
    outcome: "CIS Benchmark compliance achieved (Level 2)",
    tags: ["AWS", "IAM", "CloudTrail", "CIS Benchmark", "AWS Config"],
    github: "https://github.com/sjhacker",
  },
  {
    category: "Network Security",
    title: "Network Intrusion Detection System",
    desc: "Custom IDS built with Snort and Python. Implemented detection rules for port scans, brute-force attacks, and C2 beacon patterns. Visualized with ELK Stack.",
    outcome: "Real-time detection of 95%+ simulated attack patterns",
    tags: ["Snort", "Python", "ELK Stack", "Wireshark", "Linux"],
    github: "https://github.com/sjhacker",
  },
];

const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Projects Done" },
  { value: "8+", label: "Certifications" },
  { value: "100%", label: "Dedication" },
];

function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submitContact = useSubmitContact();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 },
    );
    const sections = document.querySelectorAll("section[id]");
    for (const s of sections) {
      observer.observe(s);
    }
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitContact.mutateAsync(formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen font-inter">
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16"
        style={{
          backgroundColor: "var(--navy-deep)",
          borderBottom: "1px solid oklch(0.24 0.04 240)",
        }}
      >
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center justify-center w-10 h-10 rounded-lg font-poppins font-bold text-white text-lg flex-shrink-0"
          style={{ backgroundColor: "var(--accent-blue)" }}
          data-ocid="nav.link"
        >
          SJ
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "var(--accent-blue)"
                      : "var(--text-muted-dark)",
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="https://www.linkedin.com/in/sajin-joseph-9471a9254"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--accent-blue)" }}
          data-ocid="nav.primary_button"
        >
          Hire Me
        </a>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-ocid="nav.toggle"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* ── Mobile Menu ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 px-6 py-4 flex flex-col gap-3"
            style={{ backgroundColor: "var(--navy-card)" }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-left text-white font-medium py-2 border-b"
                style={{ borderColor: "oklch(0.24 0.04 240)" }}
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://www.linkedin.com/in/sajin-joseph-9471a9254"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-2 rounded-full text-sm font-medium text-white text-center"
              style={{ backgroundColor: "var(--accent-blue)" }}
              data-ocid="nav.primary_button"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center pt-16"
        style={{ backgroundColor: "var(--navy-deep)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-sm font-medium mb-3"
                style={{ color: "var(--accent-blue)" }}
              >
                Hello, I'm
              </p>
              <h1 className="font-poppins font-bold text-5xl lg:text-6xl text-white mb-3 leading-tight">
                Sajin Joseph
              </h1>
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
                style={{
                  backgroundColor: "oklch(0.60 0.15 245 / 0.15)",
                  color: "var(--accent-blue)",
                  border: "1px solid oklch(0.60 0.15 245 / 0.3)",
                }}
              >
                Security Engineer & IT Professional
              </div>
              <h2
                className="font-poppins font-semibold text-xl lg:text-2xl mb-4"
                style={{ color: "var(--text-muted-dark)" }}
              >
                Security Engineer | Cybersecurity Specialist
              </h2>
              <p
                className="text-base leading-relaxed mb-8 max-w-lg"
                style={{ color: "var(--text-muted-dark)" }}
              >
                A dedicated Security Engineer with hands-on expertise in
                vulnerability assessment, penetration testing, SOC operations,
                and cloud security. Committed to protecting digital assets and
                building resilient security postures for organizations.
              </p>
              <div
                className="flex items-center gap-2 mb-8"
                style={{ color: "var(--text-muted-dark)" }}
              >
                <MapPin
                  className="w-4 h-4"
                  style={{ color: "var(--accent-blue)" }}
                />
                <span className="text-sm">Kerala, India</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/sajin-joseph-9471a9254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "var(--accent-blue)" }}
                  data-ocid="hero.primary_button"
                >
                  Hire Me
                </a>
                <button
                  type="button"
                  onClick={() => handleNavClick("#projects")}
                  className="px-6 py-3 rounded-lg font-semibold text-white border transition-colors hover:bg-white/10"
                  style={{ borderColor: "oklch(0.40 0.05 240)" }}
                  data-ocid="hero.secondary_button"
                >
                  View My Work
                </button>
              </div>
            </motion.div>

            {/* Right — Profile Photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div
                  className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden"
                  style={{
                    border: "3px solid var(--accent-blue)",
                    boxShadow: "0 0 40px oklch(0.60 0.15 245 / 0.2)",
                  }}
                >
                  <img
                    src="/assets/generated/sajin-profile.dim_400x400.jpg"
                    alt="Sajin Joseph"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                  style={{
                    backgroundColor: "var(--navy-card-alt)",
                    border: "1px solid oklch(0.30 0.05 240)",
                    color: "white",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
                  Available for Work
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-10"
            style={{ borderTop: "1px solid oklch(0.24 0.04 240)" }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-poppins font-bold text-3xl lg:text-4xl"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────── */}
      <section id="about" className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--accent-blue)" }}
            >
              Who I Am
            </p>
            <h2
              className="font-poppins font-bold text-4xl lg:text-5xl"
              style={{ color: "var(--heading-light-section)" }}
            >
              About Me
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto text-base"
              style={{ color: "oklch(0.40 0.04 240)" }}
            >
              Security Engineer passionate about protecting digital
              infrastructure and building resilient systems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeInUp}>
              <h3
                className="font-poppins font-bold text-2xl mb-5"
                style={{ color: "var(--heading-light-section)" }}
              >
                Security Engineer from Kerala, India
              </h3>
              <p
                className="leading-relaxed mb-5 text-sm"
                style={{ color: "oklch(0.38 0.04 240)" }}
              >
                I'm Sajin Joseph, a Security Engineer with hands-on experience
                in cybersecurity operations, vulnerability assessment,
                penetration testing, and cloud security. I hold a Bachelor's
                degree in Computer Science and have built my expertise through
                real-world security projects and industry-recognized
                certifications including CompTIA Security+, CEH, and AWS
                Security Specialty.
              </p>
              <p
                className="leading-relaxed mb-8 text-sm"
                style={{ color: "oklch(0.38 0.04 240)" }}
              >
                My career is driven by a genuine passion for defending digital
                systems against evolving threats. I thrive in SOC environments,
                conducting threat hunting, incident response, and security
                architecture reviews. I believe that strong security is not just
                a technical challenge — it's a business enabler that builds
                trust and resilience.
              </p>
              <blockquote
                className="relative pl-5 py-3 italic text-sm leading-relaxed rounded-r-lg"
                style={{
                  borderLeft: "3px solid var(--accent-blue)",
                  backgroundColor: "oklch(0.93 0.02 240)",
                  color: "oklch(0.35 0.04 240)",
                }}
              >
                “Security is not a product, but a process. My mission is to
                embed a culture of security awareness and proactive defense into
                every organization I work with, ensuring that protection is
                built in — not bolted on.”
              </blockquote>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  "Security-First Mindset",
                  "Analytical Problem Solver",
                  "Collaborative Team Player",
                ].map((trait) => (
                  <div
                    key={trait}
                    className="p-3 rounded-xl text-center text-xs font-semibold"
                    style={{
                      backgroundColor: "oklch(0.60 0.15 245 / 0.08)",
                      border: "1px solid oklch(0.60 0.15 245 / 0.2)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    {trait}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <div className="relative mb-8">
                <img
                  src="/assets/generated/sajin-profile.dim_400x400.jpg"
                  alt="Sajin Joseph"
                  className="w-full max-w-sm mx-auto rounded-2xl object-cover"
                  style={{
                    boxShadow: "0 20px 60px oklch(0.16 0.03 240 / 0.15)",
                  }}
                />
                <div
                  className="absolute top-4 -right-2 lg:-right-6 px-3 py-2 rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--accent-blue)" }}
                >
                  CompTIA Security+
                </div>
                <div
                  className="absolute bottom-4 -left-2 lg:-left-6 px-3 py-2 rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: "oklch(0.52 0.17 275)" }}
                >
                  AWS Security Specialty
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 4px 20px oklch(0.16 0.03 240 / 0.08)",
                }}
              >
                <h4
                  className="font-poppins font-bold text-base mb-4"
                  style={{ color: "var(--heading-light-section)" }}
                >
                  Core Values
                </h4>
                <ul className="space-y-2">
                  {[
                    "Continuous learning",
                    "Integrity and ethical conduct",
                    "Proactive defense",
                    "Clear communication",
                    "Attention to detail",
                  ].map((v) => (
                    <li
                      key={v}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "oklch(0.38 0.04 240)" }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "var(--accent-blue)" }}
                      />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-24"
        style={{ backgroundColor: "var(--navy-dark)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--accent-blue)" }}
            >
              What I Do
            </p>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-white">
              Skills & Expertise
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={{
              initial: {},
              whileInView: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid md:grid-cols-2 gap-5"
          >
            {SKILLS.map((skill) => (
              <motion.div
                key={skill.title}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl transition-transform hover:-translate-y-1 duration-200"
                style={{
                  backgroundColor: "var(--navy-card)",
                  border: "1px solid oklch(0.26 0.045 240)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "oklch(0.60 0.15 245 / 0.15)",
                    color: "var(--accent-blue)",
                  }}
                >
                  {skill.icon}
                </div>
                <h3 className="font-poppins font-semibold text-base text-white mb-2">
                  {skill.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  {skill.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md font-medium"
                      style={{
                        backgroundColor: "oklch(0.60 0.15 245 / 0.1)",
                        color: "var(--accent-blue)",
                        border: "1px solid oklch(0.60 0.15 245 / 0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────── */}
      <section id="experience" className="py-24 section-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--accent-blue)" }}
            >
              My Journey
            </p>
            <h2
              className="font-poppins font-bold text-4xl lg:text-5xl"
              style={{ color: "var(--heading-light-section)" }}
            >
              Experience
            </h2>
          </motion.div>

          <div className="relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
              style={{ backgroundColor: "oklch(0.60 0.15 245 / 0.3)" }}
            />
            <div className="space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative sm:pl-16"
                >
                  <div
                    className="absolute left-0 top-6 w-12 h-12 rounded-full items-center justify-center hidden sm:flex"
                    style={{
                      backgroundColor: "oklch(0.60 0.15 245 / 0.15)",
                      border: "2px solid var(--accent-blue)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    {exp.icon}
                  </div>

                  <div
                    className="rounded-2xl p-6"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0 2px 16px oklch(0.16 0.03 240 / 0.08)",
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3
                          className="font-poppins font-bold text-lg"
                          style={{ color: "var(--heading-light-section)" }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "oklch(0.40 0.04 240)" }}
                        >
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: "oklch(0.60 0.15 245 / 0.1)",
                            color: "var(--accent-blue)",
                          }}
                        >
                          {exp.period}
                        </span>
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: "oklch(0.52 0.17 275 / 0.1)",
                            color: "oklch(0.52 0.17 275)",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "oklch(0.38 0.04 240)" }}
                        >
                          <ChevronRight
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: "var(--accent-blue)" }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-24"
        style={{ backgroundColor: "var(--navy-deep)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--accent-blue)" }}
            >
              Portfolio
            </p>
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-white">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  backgroundColor: "var(--navy-card)",
                  border: "1px solid oklch(0.26 0.045 240)",
                }}
                data-ocid={`projects.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: "oklch(0.60 0.15 245 / 0.15)",
                      color: "var(--accent-blue)",
                      border: "1px solid oklch(0.60 0.15 245 / 0.3)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: "oklch(0.45 0.14 145 / 0.2)",
                      color: "oklch(0.65 0.14 145)",
                      border: "1px solid oklch(0.45 0.14 145 / 0.3)",
                    }}
                  >
                    ✓ {project.outcome}
                  </span>
                </div>
                <h3 className="font-poppins font-bold text-lg text-white mb-3">
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5 flex-1"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md"
                      style={{
                        backgroundColor: "oklch(0.22 0.04 240)",
                        color: "var(--text-muted-dark)",
                        border: "1px solid oklch(0.28 0.04 240)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "var(--accent-blue)" }}
                    data-ocid={`projects.link.${i + 1}`}
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium transition-colors hover:bg-white/10"
                    style={{
                      color: "var(--text-muted-dark)",
                      border: "1px solid oklch(0.32 0.04 240)",
                    }}
                    data-ocid={`projects.secondary_button.${i + 1}`}
                  >
                    <ExternalLink className="w-4 h-4" /> Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <section id="contact" className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--accent-blue)" }}
            >
              Let's Connect
            </p>
            <h2
              className="font-poppins font-bold text-4xl lg:text-5xl"
              style={{ color: "var(--heading-light-section)" }}
            >
              Get In Touch
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div {...fadeInUp}>
              <form
                onSubmit={handleFormSubmit}
                className="space-y-5"
                data-ocid="contact.modal"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--heading-light-section)" }}
                    >
                      Full Name
                    </label>
                    <Input
                      id="contact-name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      className="bg-white"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "var(--heading-light-section)" }}
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      className="bg-white"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--heading-light-section)" }}
                  >
                    Subject
                  </label>
                  <Input
                    id="contact-subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, subject: e.target.value }))
                    }
                    className="bg-white"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--heading-light-section)" }}
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    className="bg-white resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full py-3 font-semibold text-white"
                  style={{ backgroundColor: "var(--accent-blue)" }}
                  data-ocid="contact.submit_button"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </Button>
                {submitContact.isSuccess && (
                  <p
                    className="text-center text-sm text-green-600"
                    data-ocid="contact.success_state"
                  >
                    ✓ Message sent successfully!
                  </p>
                )}
                {submitContact.isError && (
                  <p
                    className="text-center text-sm text-red-500"
                    data-ocid="contact.error_state"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </motion.div>

            {/* Right Panel */}
            <motion.div {...fadeInUp} className="space-y-6">
              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 4px 20px oklch(0.16 0.03 240 / 0.08)",
                }}
              >
                <h3
                  className="font-poppins font-bold text-lg mb-5"
                  style={{ color: "var(--heading-light-section)" }}
                >
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:sajinjoseph.work@gmail.com"
                    className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity"
                    style={{ color: "oklch(0.38 0.04 240)" }}
                    data-ocid="contact.link"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: "oklch(0.60 0.15 245 / 0.1)",
                        color: "var(--accent-blue)",
                      }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    sajinjoseph.work@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sajin-joseph-9471a9254"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm hover:opacity-70 transition-opacity"
                    style={{ color: "oklch(0.38 0.04 240)" }}
                    data-ocid="contact.link"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: "oklch(0.60 0.15 245 / 0.1)",
                        color: "var(--accent-blue)",
                      }}
                    >
                      <Linkedin className="w-5 h-5" />
                    </div>
                    linkedin.com/in/sajin-joseph-9471a9254
                  </a>
                  <div
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "oklch(0.38 0.04 240)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: "oklch(0.60 0.15 245 / 0.1)",
                        color: "var(--accent-blue)",
                      }}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    Kerala, India
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.60 0.15 245) 0%, oklch(0.50 0.17 260) 100%)",
                }}
              >
                <Award className="w-8 h-8 text-white mb-3" />
                <p className="text-white text-sm leading-relaxed">
                  I'm actively seeking <strong>Security Engineer</strong>,{" "}
                  <strong>SOC Analyst</strong>, and{" "}
                  <strong>Penetration Tester</strong> roles. Whether full-time,
                  contract, or freelance — let's talk.
                </p>
                <a
                  href="https://www.linkedin.com/in/sajin-joseph-9471a9254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                  data-ocid="contact.primary_button"
                >
                  <Linkedin className="w-4 h-4" /> Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        className="py-12"
        style={{
          backgroundColor: "var(--navy-deep)",
          borderTop: "1px solid oklch(0.24 0.04 240)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center gap-6">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl font-poppins font-bold text-white text-xl"
              style={{ backgroundColor: "var(--accent-blue)" }}
            >
              SJ
            </div>

            <p
              className="text-sm text-center max-w-md"
              style={{ color: "var(--text-muted-dark)" }}
            >
              Security Engineer & Cybersecurity Specialist based in Kerala,
              India. Passionate about protecting digital assets, threat hunting,
              and building resilient security postures for organizations.
            </p>

            <nav className="flex flex-wrap justify-center gap-5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "var(--text-muted-dark)" }}
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/sajin-joseph-9471a9254"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{
                  color: "var(--text-muted-dark)",
                  border: "1px solid oklch(0.28 0.04 240)",
                }}
                data-ocid="nav.link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/sjhacker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{
                  color: "var(--text-muted-dark)",
                  border: "1px solid oklch(0.28 0.04 240)",
                }}
                data-ocid="nav.link"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{
                  color: "var(--text-muted-dark)",
                  border: "1px solid oklch(0.28 0.04 240)",
                }}
                data-ocid="nav.link"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <div
              className="pt-6 w-full text-center text-xs"
              style={{
                borderTop: "1px solid oklch(0.22 0.04 240)",
                color: "var(--text-muted-dark)",
              }}
            >
              &copy; {new Date().getFullYear()} Sajin Joseph. All rights
              reserved. &nbsp;&middot;&nbsp; Built with{" "}
              <Heart
                className="inline w-3 h-3"
                style={{ color: "var(--accent-blue)" }}
              />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "var(--accent-blue)" }}
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Toaster richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Portfolio />
    </QueryClientProvider>
  );
}
