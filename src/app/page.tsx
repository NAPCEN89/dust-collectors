"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Droplets, Droplet, Wind, Grip, Fan, Table, Beaker, RefreshCcw, Share2, Leaf, Shield, ShieldCheck, Play, Settings, BarChart3, Phone, Mail, MapPin, ChevronRight, ChevronDown, Target, Sliders, Layers, Briefcase, Factory, LifeBuoy, Globe, Users, FileText, Send, Cloud, FlaskConical, Pill, Car, PaintRoller, Utensils, Cpu, Scissors, Gem, FileSearch, MonitorCog, Wrench, Headset, Building2, Anchor, FileBadge, ArrowRight, ArrowUpRight, Plane, Database, Info, CircleDot, Asterisk, LineChart, Thermometer, Clock, Box, ClipboardCheck, Search, CheckCircle2, Check, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { Footer } from "@/components/ui/modem-animated-footer";
import ThreeBackground from "@/components/napcen-landing/ThreeBackground";
import LogoTicker from "@/components/napcen-landing/LogoTicker";
import WorkflowSection from "@/components/napcen-landing/WorkflowSection";
import FilterCalculator from "@/components/napcen-landing/FilterCalculator";
import ProjectsManufacturingSection from "@/components/napcen-landing/ProjectsManufacturingSection";
import WhyNapcenSection from "@/components/napcen-landing/WhyNapcenSection";
import CurvedHeader from "@/components/ui/curved-menu";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const dustFaqs = [
  {
    q: "What is an industrial dust collector?",
    a: "An industrial dust collector separates particulate from an extracted air stream. A complete system usually includes source capture, ducting, a separation or filtration unit, a fan and a way to remove collected material. Its purpose is to control process dust at defined operating conditions."
  },
  {
    q: "How does a dust collector work?",
    a: "The fan establishes airflow through a hood or machine connection. Ducts carry the dust-laden air to the collector, where filter media, centrifugal separation or water contact removes suitable particles. Collected material is discharged for handling, while the outlet arrangement follows the process and site requirements."
  },
  {
    q: "Which is better: a cartridge collector or a baghouse?",
    a: "Neither type is universally better. Cartridge filtration can provide a compact arrangement for suitable fine, dry dust. Baghouse configurations offer different media and construction choices for a wide range of process duties. Dust behaviour, temperature, loading and maintenance requirements guide the decision."
  },
  {
    q: "Can a cyclone remove fine dust on its own?",
    a: "Cyclones are commonly used for coarser particles or pre-separation. Their performance depends on particle size and density, airflow and geometry. Where fine particulate must be controlled, evaluate downstream filtration rather than assuming a cyclone alone will meet the requirement."
  },
  {
    q: "How do I choose dust collector capacity?",
    a: "Start with the airflow needed at every capture point and the machines operating at the same time. Then assess duct resistance, dust loading, filtration area and fan duty. Motor horsepower alone is not a reliable basis for selecting collector capacity."
  },
  {
    q: "What determines a dust collector price?",
    a: "The price depends on airflow, collection technology, filter media, construction, fan duty, controls, discharge and the agreed supply scope. Ducting, site work, special containment and protection arrangements can also affect project cost. A process-specific quotation is more useful than a generic price."
  },
  {
    q: "Does a dust collector remove gases or odours?",
    a: "Conventional dry dust filters primarily collect particulate. Gas and odour control may require a different treatment stage, such as suitable adsorption or scrubbing. Identify the pollutants before assuming one collector can address both particles and gases."
  },
  {
    q: "What information is needed for a quotation?",
    a: "Share the process, material or dust type, number of pickup points, available airflow data, temperature, operating hours and equipment location. Photographs, drawings and an existing machine specification help clarify the requirement. Unknown values can be identified during the technical discussion."
  },
  {
    q: "Can wet collection be used for every metal dust?",
    a: "No. Water compatibility must be reviewed for the specific material and process. Some dusts can react with water or generate gas, and mixed-material collection introduces further considerations. Wet collection requires appropriate water management, ventilation and sludge handling."
  },
  {
    q: "Why is suction weak even when the fan is running?",
    a: "Possible causes include loaded filters, closed or unbalanced dampers, blocked ducts, leaks, incorrect fan operation or an unsuitable hood. Compare operating airflow and differential pressure with the system design before changing the fan or cleaning settings."
  },
  {
    q: "How often should filters be replaced?",
    a: "Replacement intervals depend on loading, media, cleaning performance and duty. Use the equipment instructions and condition indicators such as pressure trends, airflow and filter integrity. A fixed calendar interval alone cannot describe every application."
  },
  {
    q: "Can filtered air be returned indoors?",
    a: "Indoor recirculation requires a specific assessment of pollutant hazards, filtration performance, monitoring and applicable requirements. Do not treat the presence of a filter as automatic permission to return extracted air to an occupied space."
  },
  {
    q: "Can an existing dust collection system be upgraded?",
    a: "An upgrade may involve capture points, duct balancing, filter media, cleaning controls, fan selection or discharge equipment. First establish the cause of the performance problem and confirm the existing equipment limits. Discuss inspection and retrofit scope with NAPCEN."
  },
  {
    q: "Can I enquire without knowing the product name?",
    a: "Yes. Select your application and choose “Recommend a system” in the enquiry form. Describe the material and process. NAPCEN can discuss the information needed to evaluate a collector configuration."
  }
];

export default function NapcenLandingPage() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", industry: "", application: "", equipment: "", desc: "",
    country: "", location: "", airflow: "", unit: "", temp: "", timeline: "",
    collector: "Recommend a system", dustMaterial: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const visibleFaqs = showAllFaqs ? dustFaqs : dustFaqs.slice(0, 8);
  const [formStep, setFormStep] = useState(1);
  const [productFilter, setProductFilter] = useState("All equipment");
  const [exhaustTab, setExhaustTab] = useState(0);

  const exhaustTabs = [
    {
      title: "H₂S / odour",
      cardTitle: "Reactive media for H₂S control",
      cardDesc: "Share inlet H₂S concentration, peak loading, humidity and required outlet concentration. Media chemistry and contact time must suit the stream; a lead–lag arrangement can be considered for monitoring and changeover.",
      image: "/Modern Stainless Industrial Processing Plant.png"
    },
    {
      title: "VOC / solvent",
      cardTitle: "Assess adsorption suitability first",
      cardDesc: "Share the individual VOC species, concentrations and gas temperature. Carbon adsorption requires a review of capacity, humidity, breakthrough and potential heat generation. Not every VOC stream is suitable.",
      image: "/Industrial Activated Carbon Adsorption Skid.png"
    },
    {
      title: "Acid gas",
      cardTitle: "Review dry reagent treatment",
      cardDesc: "Acid-gas control may require a reactive sorbent injection system and downstream particulate collection. Share acid-gas species, temperature, flow and treatment targets so the process can be evaluated.",
      image: "/Industrial Reagent Injection and Baghouse System.png"
    },
    {
      title: "Biogas",
      cardTitle: "Biogas H₂S removal with selected dry media",
      cardDesc: "Share methane and H₂S composition, gas flow, temperature, moisture, oxygen content and the downstream outlet requirement. Evaluate media compatibility, loading, pressure loss and safe changeout. Biogas treatment requires a process-specific review of flammable-gas handling.",
      image: "/Biogas Processing and Adsorption System.png"
    },
    {
      title: "Mixed / unsure",
      cardTitle: "Start with a gas analysis",
      cardDesc: "A mixed or unknown stream needs characterisation before selecting media. Share any available test report, safety data, process description and odour observations to guide the application review.",
      image: "/Industrial H₂S Adsorption Skid (1).png"
    }
  ];

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.location || !formData.application || !formData.desc) {
      setFormStatus("Please fill in all required fields (*)");
      setTimeout(() => setFormStatus(""), 5000);
      return;
    }

    setIsSubmitting(true);
    setFormStatus("Sending your request...");

    // Web3Forms Configuration
    const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "233963d2-f4b0-4f25-9a2f-bf7e151ac018";

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Quote Request: ${formData.application || "Dust Collector"} — ${formData.company || formData.name || "NAPCEN Inquiry"}`,
      from_name: formData.name || "NAPCEN Lead",
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      application: formData.application,
      collector: formData.collector || "Recommend a system",
      dust_material: formData.dustMaterial,
      product: formData.collector || formData.application || "Dust Collector System",
      message: `Company: ${formData.company || "N/A"}\nPhone: ${formData.phone || "N/A"}\nProject Location: ${formData.location || "N/A"}\nApplication: ${formData.application || "N/A"}\nPreferred Collector: ${formData.collector || "Recommend a system"}\nDust / Material: ${formData.dustMaterial || "N/A"}\n\nRequirement Details:\n${formData.desc}`,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setFormStatus("Thank you! We will contact you soon.");
        setFormData({
          name: "", company: "", email: "", phone: "", industry: "", application: "", equipment: "", desc: "",
          country: "", location: "", airflow: "", unit: "", temp: "", timeline: "",
          collector: "Recommend a system", dustMaterial: ""
        });
      } else {
        console.error("Web3Forms Response Error:", result);
        setFormStatus("Submission failed. Please try again or call us.");
      }
    } catch (error) {
      console.error("Network Exception:", error);
      setFormStatus("Submission failed. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(""), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-napcean-blue selection:text-white">
      {/* TOPBAR */}
      <div className="hidden lg:block bg-[#051124] text-slate-300 text-[11.5px] py-2 border-b border-white/5">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">

          <div className="flex items-center gap-4 divide-x divide-white/10">
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold tracking-wide">
              <Globe size={13} /> Global Engineering & Export Hub
            </div>

            <div className="flex items-center gap-1.5 pl-4 font-medium text-slate-300 tracking-wide">
              <Plane size={13} className="text-slate-400" /> Exporting to 30+ Countries
            </div>

            <div className="flex items-center gap-2 pl-4">
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded text-[9px] tracking-widest uppercase">ISO 9001:2015</span>
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded text-[9px] tracking-widest uppercase">CE MARKED</span>
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded text-[9px] tracking-widest uppercase">ATEX / ASME</span>
            </div>
          </div>

          <div className="flex items-center gap-4 divide-x divide-white/10">
            <a href="mailto:info@napcen.com" className="flex items-center gap-1.5 font-medium hover:text-white transition-colors tracking-wide">
              <Mail size={13} className="text-blue-500" />
              info@napcen.com
            </a>

            <a href="tel:+917904469219" className="flex items-center gap-1.5 pl-4 text-white font-bold hover:text-emerald-400 transition-colors tracking-wide">
              <Phone size={13} className="text-emerald-500" /> +91 79044 69219
            </a>
          </div>

        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <a href="#" className="flex items-center gap-3">
            <Image src="/Napcen-logo.webp" alt="NAPCEN Logo" width={140} height={50} className="object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-slate-700">
            <a href="#collectors" className="hover:text-primary-blue transition-colors">Dust Collectors</a>
            <a href="#applications" className="hover:text-primary-blue transition-colors">Applications</a>
            <a href="#how-it-works" className="hover:text-primary-blue transition-colors">How it works</a>
            <a href="#projects" className="hover:text-primary-blue transition-colors">Projects</a>
            <a href="#selection-guide" className="hover:text-primary-blue transition-colors">Selection guide</a>
            <a href="#faq" className="hover:text-primary-blue transition-colors">FAQs</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="bg-[#0a5cbb] hover:bg-[#084ea3] active:scale-95 text-white font-bold text-xs sm:text-[13.5px] px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(10,92,187,0.25)] hover:shadow-[0_6px_20px_rgba(10,92,187,0.35)] transition-all flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Get a quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Curved Menu for Mobile View */}
          <div className="lg:hidden">
            <CurvedHeader />
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative bg-white overflow-hidden pt-16 pb-12">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-20 right-40 w-64 h-64 border border-blue-100 rounded-full opacity-50" />
            <div className="absolute top-40 right-20 w-[500px] h-[500px] border border-blue-50 rounded-full opacity-50" />
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-8 xl:px-12 2xl:px-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 xl:gap-12 items-center md:items-stretch min-h-[480px]">

              {/* LEFT: TEXT & STATS */}
              <div className="w-full md:w-[46%] xl:w-[45%] flex flex-col justify-start pt-3 sm:pt-4 lg:pt-6">
                <div className="mb-4 sm:mb-5">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    INDUSTRIAL DUST COLLECTOR MANUFACTURERS IN INDIA
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black text-[#0f1b3a] leading-[1.12] tracking-tight mb-5">
                  Industrial dust collectors.<br />
                  <span className="text-primary-blue">Built around your process.</span>
                </h1>

                <p className="text-slate-600 text-[15px] sm:text-[16px] mb-8 max-w-xl leading-relaxed font-normal">
                  Control process dust with a collection system that fits your material, machinery and production duty. Explore NAPCEN cartridge, baghouse, cyclone and local extraction options.
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                  <a href="#contact" className="bg-primary-blue hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-md transition-all shadow-md hover:shadow-lg text-sm flex items-center gap-2">
                    Get a Quote <ArrowUpRight size={17} />
                  </a>
                  <a href="#contact" className="bg-white border border-slate-300 hover:border-primary-blue text-slate-700 hover:text-primary-blue font-bold py-3.5 px-6 rounded-md transition-all text-sm flex items-center gap-2">
                    Discuss Your Application <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>



              {/* RIGHT: FORM */}
              <div className="w-full md:w-[52%] xl:w-[54%] relative z-20 flex flex-col justify-start mt-12 md:mt-0 md:-ml-4 lg:-ml-8 xl:-ml-12" id="contact">
                <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100">
                  <h3 className="text-2xl lg:text-3xl font-black text-[#0f1b3a] mb-6">Request an engineered quotation</h3>

                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    {/* Row 1: Your name * & Company * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Your name *</label>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Company *</label>
                        <input
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email * & Phone * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 3: Project location * & Application * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Project location *</label>
                        <input
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Application *</label>
                        <select
                          required
                          value={formData.application}
                          onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                          className={`w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all font-medium shadow-sm ${!formData.application ? "text-slate-400" : "text-slate-700"}`}
                        >
                          <option value="" disabled hidden>Select your application</option>
                          <option value="Grinding & deburring" className="text-slate-700">Grinding & deburring</option>
                          <option value="Laser & plasma cutting" className="text-slate-700">Laser & plasma cutting</option>
                          <option value="Woodworking & sanding" className="text-slate-700">Woodworking & sanding</option>
                          <option value="Blasting & foundry" className="text-slate-700">Blasting & foundry</option>
                          <option value="Powder & bag handling" className="text-slate-700">Powder & bag handling</option>
                          <option value="Centralized extraction" className="text-slate-700">Centralized extraction</option>
                          <option value="Existing system / service" className="text-slate-700">Existing system / service</option>
                          <option value="Other application" className="text-slate-700">Other application</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Preferred collector & Dust / material */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Preferred collector</label>
                        <select
                          value={formData.collector}
                          onChange={(e) => setFormData({ ...formData, collector: e.target.value })}
                          className={`w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all font-medium shadow-sm text-slate-700`}
                        >
                          <option value="Recommend a system" className="text-slate-700">Recommend a system</option>
                          <option value="Cartridge dust collector" className="text-slate-700">Cartridge dust collector</option>
                          <option value="Pulse jet baghouse dust collector" className="text-slate-700">Pulse jet baghouse dust collector</option>
                          <option value="Cyclone dust collector" className="text-slate-700">Cyclone dust collector</option>
                          <option value="Portable dust collector" className="text-slate-700">Portable dust collector</option>
                          <option value="Two-stage dust collector" className="text-slate-700">Two-stage dust collector</option>
                          <option value="Downdraft Dust collector" className="text-slate-700">Downdraft Dust collector</option>
                          <option value="Wet dust collector" className="text-slate-700">Wet dust collector</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Dust / material</label>
                        <input
                          value={formData.dustMaterial}
                          onChange={(e) => setFormData({ ...formData, dustMaterial: e.target.value })}
                          placeholder="e.g. steel grinding dust"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Row 5: Requirement details * */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0f1b3a]">Requirement details *</label>
                      <textarea
                        required
                        placeholder="Process, pickup points, operating hours, airflow if known, and any existing-system issue"
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all min-h-[120px] resize-y font-medium text-slate-700 shadow-sm placeholder:text-slate-400"
                      />
                    </div>

                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-2">
                      Submitting opens your email app with the enquiry populated. Nothing is sent until you send it. This page does not store your enquiry details.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[#0a5cbb] hover:bg-blue-800 text-white font-black py-4 rounded-xl transition-all shadow-md text-sm lg:text-[15px] flex items-center justify-center gap-2 tracking-wide mt-4 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Quotation Request</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>

                    {formStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2.5 ${formStatus.includes("Thank")
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-red-50 text-red-600 border border-red-300"
                          }`}
                      >
                        {formStatus.includes("Thank") ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                        <span>{formStatus}</span>
                      </motion.div>
                    )}
                  </form>

                  <div className="flex justify-center items-center gap-6 md:gap-10 mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5"><Shield size={12} className="text-[#0f1b3a]" /> Quick Response</div>
                    <div className="flex items-center gap-1.5"><Users size={12} className="text-[#0f1b3a]" /> Expert Support</div>
                    <div className="flex items-center gap-1.5"><Settings size={12} className="text-[#0f1b3a]" /> Custom Solutions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURES BAR */}
            <div className="mt-16 sm:mt-20 border-t border-b border-slate-200 py-7">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 w-full">
                {[
                  {
                    title: "Capture at the source",
                    subtitle: "Hoods and machine connections",
                    icon: <Target className="w-4 h-4 text-primary-blue" />
                  },
                  {
                    title: "Choose by dust behaviour",
                    subtitle: "Media and separation technology",
                    icon: <Layers className="w-4 h-4 text-primary-blue" />
                  },
                  {
                    title: "Design the complete system",
                    subtitle: "Airflow, resistance and discharge",
                    icon: <Settings className="w-4 h-4 text-primary-blue" />
                  },
                  {
                    title: "Plan for maintenance",
                    subtitle: "Access, cleaning and replacements",
                    icon: <Wrench className="w-4 h-4 text-primary-blue" />
                  }
                ].map((item, i) => (
                  <div key={i} className="px-4 md:px-6 lg:px-8 py-3 md:py-1 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[15px] sm:text-[16px] font-bold text-[#0f1b3a] mb-1 tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-slate-500 font-normal">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </section>

        <LogoTicker />
        <WhyNapcenSection />

        {/* WHAT IS A DUST COLLECTOR SECTION */}
        <section id="what-is-a-dust-collector" className="pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 bg-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 lg:opacity-100">
            <div className="relative w-full h-full lg:w-[72%] lg:h-[88%] lg:translate-x-24 xl:translate-x-36 2xl:translate-x-44 lg:translate-y-8 xl:translate-y-10">
              <Image src="/Industrial Dust Collection System Diagram (1).png" alt="Industrial Dust Collection System Diagram" fill className="object-cover lg:object-contain object-center scale-100" />
            </div>
          </div>

          <div className="w-full px-6 lg:px-12 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr_1.1fr] xl:grid-cols-[1fr_1.2fr_1.1fr] gap-8 lg:gap-8 items-center">

              {/* Left Column: Text & Bullets */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-md bg-white/80 lg:bg-transparent p-4 sm:p-6 lg:p-0 rounded-3xl backdrop-blur-sm lg:backdrop-blur-none">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    WHAT IS A DUST COLLECTOR?
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-black text-[#0f1b3a] leading-[1.1] tracking-tight mb-5">
                  Dust collection is <br className="hidden sm:inline" />
                  <span className="text-primary-blue">more than a filter and a fan.</span>
                </h2>
                <p className="text-slate-500 text-sm sm:text-[15px] xl:text-base leading-relaxed font-medium mb-8">
                  An industrial dust collector separates particulate from an extracted air stream. Its performance depends on the entire path: how dust is captured, transported, separated and removed from the process.
                </p>

                <div className="flex flex-col gap-6">
                  {[
                    {
                      title: "Better source control",
                      desc: "Capture airborne material near its release point rather than relying on general room ventilation.",
                      icon: Target
                    },
                    {
                      title: "Practical material handling",
                      desc: "Plan how collected dust will be discharged, contained and removed during operation.",
                      icon: Box
                    }
                  ].map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-primary-blue" />
                        </div>
                        <div>
                          <h4 className="text-[#0f1b3a] font-bold text-base mb-1">{feat.title}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{feat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Center Column: Empty spacer to let background show through */}
              <div className="hidden lg:block h-[400px] md:h-[500px] lg:h-[650px] w-full"></div>

              {/* Right Column: Card */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col justify-center relative overflow-hidden lg:translate-x-8 xl:translate-x-14 2xl:translate-x-20 lg:translate-y-12 xl:translate-y-16">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10"></div>

                <p className="text-slate-600 text-sm xl:text-[15px] leading-relaxed mb-4 font-medium relative z-10">
                  <strong className="text-[#0f1b3a]">Dust becomes airborne</strong> during cutting, abrasion, transfer and handling. A collection system provides a <strong className="text-[#0f1b3a]">deliberate extraction route</strong> instead of allowing that material to disperse across the workshop or production area.
                </p>
                <p className="text-slate-600 text-sm xl:text-[15px] leading-relaxed mb-6 font-medium relative z-10">
                  <strong className="text-[#0f1b3a]">Collection technology</strong> may retain dust on a filter, separate heavier particles through rotation or transfer suitable particles into water. The collected solids or sludge then need a defined removal route.
                </p>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 mt-auto relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-4 bg-primary-blue rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">HOW IT WORKS</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-6 px-2">
                    <div className="flex flex-col items-center">
                      <Wind className="text-slate-400 w-6 h-6 mb-2" />
                      <span className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-wider">Source<br />Capture (Hood)</span>
                    </div>
                    <ArrowRight className="text-slate-300 w-4 h-4" />
                    <div className="flex flex-col items-center">
                      <Layers className="text-primary-blue w-6 h-6 mb-2" />
                      <span className="text-[9px] font-bold text-[#0f1b3a] text-center uppercase tracking-wider">Filter Unit<br />(Separation)</span>
                    </div>
                    <ArrowRight className="text-slate-300 w-4 h-4" />
                    <div className="flex flex-col items-center">
                      <Fan className="text-primary-blue w-6 h-6 mb-2" />
                      <span className="text-[9px] font-bold text-primary-blue text-center uppercase tracking-wider">Industrial<br />Fan (Exhaust)</span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3.5 bg-primary-blue text-white rounded-xl text-xs font-bold tracking-wider flex items-center justify-center gap-2 text-center hover:bg-blue-700 transition-colors"
                  >
                    See the collection sequence
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 02 / WHY NAPCEN SECTION */}


        {/* PRODUCTS / COLLECTORS SECTION */}
        <section id="collectors" className="pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 bg-white relative overflow-hidden scroll-mt-24">
          <span id="products" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />
          <div className="w-full px-4 md:px-8 xl:px-12 2xl:px-16">
            {/* Header Area */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-6 md:gap-12 items-center mb-10 md:mb-16 relative">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl">
                <div className="mb-3 md:mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block">
                    CHOOSE THE RIGHT DUST COLLECTOR
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0f1b3a] leading-[1.08] tracking-tight mb-4 md:mb-6">
                  Choose the technology. <br className="hidden md:block" />
                  <span className="text-primary-blue">Then refine the system.</span>
                </h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-start md:justify-end items-center mt-4 md:mt-0">
                <p className="text-slate-500 text-base md:text-lg max-w-sm leading-relaxed font-medium">
                  Compare dust collector types by their collection method and intended duty. Use these options to begin an engineering conversation.
                </p>
              </motion.div>
            </div>

            {/* Product Cards Grid */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {[
                {
                  category: "COMPACT FILTRATION",
                  title: "Cartridge dust collector",
                  image: "/Cartridge dust collectors image.png",
                  desc: "Pleated filter cartridges provide a large filtration surface within a compact housing. A cartridge dust collector is an option for compatible fine, dry particulate where efficient use of floor space and accessible filter replacement matter.",
                  typicalFit: "Grinding, laser cutting, powder handling and selected fume duties.",
                  selectionCheck: "Review dust loading, moisture, filter media, cleaning access and ignition sources."
                },
                {
                  category: "CONTINUOUS PROCESS DUTY",
                  title: "Pulse jet baghouse dust collector",
                  image: "/Baghouse dust collectors.png",
                  desc: "A baghouse dust collector separates particles on fabric filter bags. Short compressed-air pulses release accumulated dust into the hopper. Filter material and filtration area are selected around the gas conditions and process duty.",
                  typicalFit: "Material handling, foundries, mineral processing and larger extraction systems.",
                  selectionCheck: "Define temperature, abrasion, filtration velocity, hopper discharge and utility requirements."
                },
                {
                  category: "COARSE PRE-SEPARATION",
                  title: "Cyclone dust collector",
                  image: "/Cyclone Dust Collector.png",
                  desc: "A cyclone dust collector uses a rotating air stream to separate heavier particles by centrifugal action. It can recover coarse material or reduce the solids load reaching a downstream filter. Fine-dust control may require a second collection stage.",
                  typicalFit: "Wood chips, coarse process dust and upstream product recovery.",
                  selectionCheck: "Check particle size and density, pressure loss and the need for final filtration."
                },
                {
                  category: "LOCAL EXTRACTION",
                  title: "Portable dust collector",
                  image: "/Portable Dust Collector.png",
                  desc: "A portable dust collector brings extraction closer to a changing work location. The pickup arrangement, hose length and available airflow determine its useful reach. Mobility should complement a well-positioned hood and a suitable collection method.",
                  typicalFit: "Intermittent workshop tasks and localized dust-generating processes.",
                  selectionCheck: "Review material compatibility, hose losses, electrical supply and dust-bin handling."
                },
                {
                  category: "SEPARATION + FILTRATION",
                  title: "Two-stage dust collector",
                  image: "/Two Stage Dust Collector.png",
                  desc: "A two-stage dust collection system combines upstream separation with downstream filtration. Coarse material is removed first, while compatible finer particles reach a filter. The arrangement can reduce the material load on the final collection stage.",
                  typicalFit: "Mixed chips and fine dust, woodworking and selected recovery applications.",
                  selectionCheck: "Match both stages to the particle distribution; define collected-material handling."
                },
                {
                  category: "WATER-CONTACT COLLECTION",
                  title: "Wet dust collector",
                  image: "/Wet Dust Collector.png",
                  desc: "A wet dust collector transfers suitable particles into water rather than retaining them on dry filter media. Its design must account for gas–liquid contact, droplet separation and collected-sludge management. Material compatibility is central to selection.",
                  typicalFit: "Selected particulate duties where water-based collection is appropriate.",
                  selectionCheck: "Assess water reactivity, gas generation, corrosion, make-up water and sludge disposal."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(15,27,58,0.03)] hover:shadow-[0_16px_40px_rgba(15,27,58,0.08)] hover:border-blue-200 transition-all flex flex-col h-full group"
                >
                  {/* Category Eyebrow */}
                  <div className="text-[11px] font-bold text-primary-blue tracking-[0.18em] uppercase mb-2.5">
                    {item.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#0f1b3a] tracking-tight mb-2 group-hover:text-primary-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Product Showcase Image */}
                  <div className="relative w-full h-56 sm:h-64 my-4 rounded-2xl bg-gradient-to-b from-slate-50 via-[#f8fafc] to-blue-50/20 border border-slate-100 flex items-center justify-center p-4 overflow-hidden group-hover:border-blue-200/80 transition-colors">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain object-center drop-shadow-[0_10px_20px_rgba(15,27,58,0.08)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-[14px] leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>

                  {/* Typical fit */}
                  <div className="mb-6">
                    <h4 className="text-[13px] font-bold text-[#0f1b3a] mb-1 tracking-tight">
                      Typical fit
                    </h4>
                    <p className="text-slate-600 text-[13px] leading-relaxed font-normal">
                      {item.typicalFit}
                    </p>
                  </div>

                  {/* Selection check box */}
                  <div className="bg-[#f8f9fa] rounded-xl p-4 sm:p-5 mb-6 border border-slate-100">
                    <h4 className="text-[13px] font-bold text-[#0f1b3a] mb-1 tracking-tight">
                      Selection check
                    </h4>
                    <p className="text-slate-600 text-[13px] leading-relaxed font-normal">
                      {item.selectionCheck}
                    </p>
                  </div>

                  {/* Discuss this collector link */}
                  <div className="mt-auto pt-2 flex items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData({ ...formData, application: item.title, collector: item.title });
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-primary-blue text-[13px] font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all group"
                    >
                      Discuss this collector
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footnote Disclaimer */}
            <div className="mt-8 sm:mt-10">
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-4xl">
                Images are supplied equipment visualizations; schematic illustrations explain collection methods. Neither represents a verified installation or a model specification. Final equipment configuration, performance and scope depend on the agreed design basis.
              </p>
            </div>
          </div>
        </section>

        {/* 04 / DUST COLLECTOR COMPARISON SECTION */}
        <section id="comparison" className="pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24 bg-white relative overflow-hidden border-t border-slate-100">
          <div className="w-full px-6 lg:px-14 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            {/* Header: 2 Columns */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-10 sm:mb-14">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    DUST COLLECTOR COMPARISON
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#0f1b3a] leading-[1.08] tracking-tight">
                  Different dust.<br />
                  <span className="text-primary-blue">Different design decisions.</span>
                </h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-md lg:pb-2">
                <p className="text-slate-600 text-sm sm:text-base lg:text-[16px] leading-relaxed font-normal">
                  Use this comparison to shortlist a collection approach. Suitability still requires a review of your process conditions.
                </p>
              </motion.div>
            </div>

            {/* Comparison Table */}
            <div className="w-full overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden min-w-[760px] w-full">
                {/* Header row */}
                <div className="grid grid-cols-[1.3fr_1.5fr_1.8fr_1.8fr] bg-[#0f1b3a] text-white">
                  <div className="p-4 sm:p-5 font-bold text-xs sm:text-sm tracking-wide">
                    Collector type
                  </div>
                  <div className="p-4 sm:p-5 font-bold text-xs sm:text-sm tracking-wide">
                    Collection method
                  </div>
                  <div className="p-4 sm:p-5 font-bold text-xs sm:text-sm tracking-wide">
                    Useful starting point
                  </div>
                  <div className="p-4 sm:p-5 font-bold text-xs sm:text-sm tracking-wide">
                    Important check
                  </div>
                </div>

                {/* Rows */}
                {[
                  {
                    type: "Cartridge",
                    method: "Pleated filter media",
                    startingPoint: "Compatible fine, dry particulate, compact arrangements",
                    check: "Media, dust loading, cleaning and temperature"
                  },
                  {
                    type: "Pulse jet baghouse",
                    method: "Fabric bags with compressed-air cleaning",
                    startingPoint: "Process extraction and larger solids-handling duties",
                    check: "Filtration area, bag material and discharge"
                  },
                  {
                    type: "Cyclone",
                    method: "Centrifugal separation",
                    startingPoint: "Coarser material recovery or pre-separation",
                    check: "Particle size/density; downstream filtration need"
                  },
                  {
                    type: "Portable",
                    method: "Local collection with a movable unit",
                    startingPoint: "Changing or intermittent work locations",
                    check: "Pickup reach, hose losses and material suitability"
                  },
                  {
                    type: "Two-stage",
                    method: "Pre-separation followed by filtration",
                    startingPoint: "Mixed coarse material and finer particulate",
                    check: "Performance and handling requirements of both stages"
                  },
                  {
                    type: "Wet",
                    method: "Particle contact with water",
                    startingPoint: "Selected water-compatible particulate duties",
                    check: "Reactivity, water control, droplet separation and sludge"
                  }
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[1.3fr_1.5fr_1.8fr_1.8fr] border-t border-slate-100 hover:bg-slate-50/80 transition-colors items-center text-xs sm:text-[13.5px]"
                  >
                    <div className="p-4 sm:p-5 font-bold text-[#0f1b3a]">
                      {row.type}
                    </div>
                    <div className="p-4 sm:p-5 text-slate-600 font-medium">
                      {row.method}
                    </div>
                    <div className="p-4 sm:p-5 text-slate-600">
                      {row.startingPoint}
                    </div>
                    <div className="p-4 sm:p-5 text-slate-600">
                      {row.check}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 / CHOOSE BY APPLICATION SECTION */}
        <section id="applications" className="pt-10 lg:pt-14 pb-12 lg:pb-24 bg-white relative overflow-clip border-t border-slate-100 scroll-mt-24">
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 max-w-[1600px] mx-auto relative z-10">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-16">
              <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block mb-3">
                CHOOSE BY APPLICATION
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f1b3a] leading-[1.05] tracking-tight mb-5">
                Start with what <span className="text-primary-blue">creates the dust.</span>
              </h2>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
                Industrial dust extraction should fit the process, operator access and machinery layout. Explore the factors that matter in common dust-generating applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-start">
              {/* Left Side: Sticky Image & Guidance Card */}
              <div className="relative lg:sticky lg:top-32">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group">
                  <Image
                    src="/Industrial Dust Extraction and CNC Cutting Montage.png"
                    alt="Industrial Dust Generation Applications"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3a]/80 via-[#0f1b3a]/25 to-transparent flex flex-col justify-end p-6 sm:p-7">
                    <span className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
                      Process-Driven Extraction
                    </span>
                    <h3 className="text-white font-black text-lg sm:text-xl leading-snug">
                      Engineered for Heavy Duty &amp; Precision Capture
                    </h3>
                  </div>
                </div>

                {/* Conclusion Block under Image */}
                <div className="mt-6 sm:mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-200 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-blue"></div>
                  <h4 className="text-[17px] font-black text-[#0f1b3a] mb-2 group-hover:text-primary-blue transition-colors">
                    Unsure which collector you need?
                  </h4>
                  <p className="text-[13px] sm:text-sm text-slate-500 font-medium leading-relaxed mb-5">
                    Describe the operation and choose &ldquo;Recommend a system&rdquo; in your enquiry. Our team evaluates your airflow, material and site requirements.
                  </p>
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, collector: "Recommend a system" }));
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-blue hover:bg-blue-700 text-white font-bold text-xs sm:text-[13px] shadow-sm hover:shadow-md transition-all group/btn"
                  >
                    <span>Get selection guidance</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              {/* Right Side: Numbered Steps / Application Cards */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                {[
                  {
                    num: "01",
                    title: "Grinding & deburring",
                    tagline: "Metal dust at the source.",
                    text: "A grinding dust collection system must address the direction of particle release, tool movement and workpiece access. Fine particles may remain airborne while heavier fragments settle nearby. Capture hoods or an extraction bench need to fit the actual operation.",
                    tellUsAbout: "Base metal, abrasive, spark generation, workpiece size and operating hours.",
                    selectionDirection: "Consider cartridge or bag filtration for suitable dry dust; assess ignition control separately."
                  },
                  {
                    num: "02",
                    title: "Laser & plasma cutting",
                    tagline: "Extraction that follows the cutting zone.",
                    text: "Thermal cutting generates fine particulate and hot emissions. The cutting table, active extraction zones and material thickness influence the required airflow. Ductwork and collection equipment should be reviewed together with the machine connection.",
                    tellUsAbout: "Cutting process, material/coatings, table dimensions, simultaneous zones and production duty.",
                    selectionDirection: "Review fine-particle filtration, thermal conditions, sparks and machine integration."
                  },
                  {
                    num: "03",
                    title: "Woodworking & sanding",
                    tagline: "Manage chips and fine sanding dust.",
                    text: "Sawing, routing and sanding produce different mixtures of chips, fibres and fine dust. A woodworking dust collection system should balance machine connection requirements with material transport and a practical collection-bin or discharge arrangement.",
                    tellUsAbout: "Machine list, wood/coatings, simultaneous use, duct routes and dust handling.",
                    selectionDirection: "Evaluate cyclone pre-separation and final filtration; assess combustible-dust properties."
                  },
                  {
                    num: "04",
                    title: "Blasting & foundry",
                    tagline: "Built around abrasive process dust.",
                    text: "Blasting, fettling and sand handling can impose abrasive or high-loading duties. The extraction system needs to contain the process and keep recovered material moving toward a discharge point. Inlet protection and maintenance access deserve early attention.",
                    tellUsAbout: "Abrasive type, sand or metal content, loading, temperature and recovery requirements.",
                    selectionDirection: "Discuss baghouse or cartridge selection, pre-separation and wear-resistant arrangements."
                  },
                  {
                    num: "05",
                    title: "Powder & bag handling",
                    tagline: "Contain dust at transfer points.",
                    text: "Mixing, bag opening, filling and conveyor transfers release dust at different locations. Capture design should control airborne material without unnecessarily pulling valuable product out of the process. Hygiene and cross-contamination requirements may influence construction.",
                    tellUsAbout: "Powder identity, handling rate, toxicity, moisture, hygiene and process connections.",
                    selectionDirection: "Review suitable filtration, discharge, containment and product-recovery requirements."
                  },
                  {
                    num: "06",
                    title: "Centralized extraction",
                    tagline: "One system. Multiple pickup points.",
                    text: "A centralized dust collection system connects several machines or capture points to a common collector. Branch balancing, simultaneous operation and minimum material transport conditions determine whether each pickup receives the airflow it needs.",
                    tellUsAbout: "Pickup list, machine schedules, duct lengths, space and future expansion.",
                    selectionDirection: "Evaluate total resistance, fan duty, branch controls and servicing arrangements."
                  }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-blue-100 transition-all group"
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-3 sm:gap-y-1.5 items-center sm:items-start">
                      <div className="w-12 h-12 rounded-[14px] bg-slate-50 text-slate-400 font-black text-xl flex items-center justify-center shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-colors shadow-sm border border-slate-100 group-hover:border-primary-blue sm:row-span-2 self-start">
                        {step.num}
                      </div>
                      <div className="pt-0.5 sm:pt-0">
                        <h3 className="text-lg sm:text-[20px] font-black text-[#0f1b3a] group-hover:text-primary-blue transition-colors">
                          {step.title}
                        </h3>
                        <h4 className="text-sm sm:text-[15px] font-bold text-primary-blue mt-1 mb-2">
                          {step.tagline}
                        </h4>
                      </div>
                      <div className="w-full col-span-2 sm:col-span-1 sm:col-start-2 mt-2">
                        <p className="text-slate-500 text-[13px] sm:text-[14px] leading-relaxed font-medium mb-4">
                          {step.text}
                        </p>

                        {/* Tell us about & Selection direction info grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-100 mb-4">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Tell us about
                            </div>
                            <p className="text-xs sm:text-[13px] text-[#0f1b3a] font-medium leading-relaxed">
                              {step.tellUsAbout}
                            </p>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Selection direction
                            </div>
                            <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                              {step.selectionDirection}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, application: step.title, collector: step.title }));
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-primary-blue hover:text-blue-700 font-bold text-xs sm:text-[13px] inline-flex items-center gap-1.5 transition-all group/link"
                        >
                          <span>Discuss this application</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INSIDE THE PROCESS / DUST COLLECTOR WORKING PRINCIPLE SECTION */}
        <section id="how-it-works" className="pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-white relative overflow-hidden border-t border-slate-100 scroll-mt-24">
          <div className="w-full px-6 lg:px-14 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            {/* Header Area */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                  DUST COLLECTOR WORKING PRINCIPLE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-[#0f1b3a] leading-[1.1] tracking-tight mb-4">
                From the source. <br />
                <span className="text-primary-blue">Through the system.</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                A dry filtration system uses airflow to move compatible particulate from its release point to a controlled collection and discharge arrangement.
              </p>
            </motion.div>

            {/* Process Diagram Graphic */}
            <div className="w-full mb-2 sm:mb-4 relative">
              <div className="relative w-full aspect-[1915/821] max-w-full mx-auto">
                <Image
                  src="/Industrial Dust Collection System Diagra.png"
                  alt="Industrial Dust Collection System Working Principle Diagram - From the source. Through the system."
                  fill
                  sizes="(max-width: 1600px) 100vw, 1600px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* 4 Process Stage Cards - Old Card Style with New Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  num: "01",
                  tag: "01 / CAPTURE",
                  title: "Collect at release.",
                  desc: "A hood or machine connection draws dust-laden air away from the process. Hood position and airflow must work with particle movement and cross-drafts.",
                  hoverBorder: "hover:border-blue-400"
                },
                {
                  num: "02",
                  tag: "02 / SEPARATE",
                  title: "Match the mechanism.",
                  desc: "Suitable filter media retains particulate. Alternative arrangements use centrifugal separation or water contact, depending on the material and duty.",
                  hoverBorder: "hover:border-cyan-400"
                },
                {
                  num: "03",
                  tag: "03 / CLEAN & DISCHARGE",
                  title: "Manage the solids.",
                  desc: "The specified cleaning method releases accumulated dust. Bins, valves or conveyors remove material without disrupting the intended operating conditions.",
                  hoverBorder: "hover:border-primary-blue"
                },
                {
                  num: "04",
                  tag: "04 / VERIFY",
                  title: "Check the whole path.",
                  desc: "Review airflow, system resistance, filter condition and outlet requirements. Filtration efficiency alone does not establish capture at the workstation.",
                  hoverBorder: "hover:border-primary-blue"
                }
              ].map((stage, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md ${stage.hoverBorder} transition-all flex flex-col justify-start`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary-blue font-black text-lg">
                      {stage.num}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                      {stage.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0f1b3a] mb-2">{stage.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Footnote */}
            <div className="mt-8">
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                The schematic shows one dry collection arrangement. Actual fan location, cleaning method, discharge and air outlet configuration vary by application.
              </p>
            </div>
          </div>
        </section>

        {/* 06 / DUST COLLECTOR MEDIA & FOOTPRINT CALCULATOR SECTION */}
        <section id="media-calculator" className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden border-t border-slate-100">
          <div className="w-full px-6 lg:px-14 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            {/* Header: 2 Columns */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-10 sm:mb-14">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    SIZING &amp; FOOTPRINT CALCULATOR
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#0f1b3a] leading-[1.08] tracking-tight">
                  Media area and <br />
                  <span className="text-primary-blue">footprint comparison.</span>
                </h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-md lg:pb-2">
                <p className="text-slate-600 text-sm sm:text-base lg:text-[16px] leading-relaxed font-normal">
                  Calculate required filter media area (<span className="font-mono text-[#0f1b3a] font-medium">A = Q / V</span>) and evaluate estimated equipment footprint between Cartridge and Baghouse systems for your airflow and dust type.
                </p>
              </motion.div>
            </div>

            {/* Interactive Calculator Component */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <FilterCalculator />
            </motion.div>
          </div>
        </section>

        {/* 07 / COMPLETE SYSTEM SCOPE SECTION */}
        <section id="complete-system-scope" className="pt-8 pb-4 sm:pt-10 sm:pb-6 lg:pt-12 lg:pb-8 bg-white relative overflow-hidden border-t border-slate-100">
          <div className="w-full px-6 lg:px-12 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            {/* Upper Row: Left Content & Right Annotated Equipment */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10 xl:gap-12">
              {/* Left Column: Heading, Lead, 3 Benefits, CTAs */}
              <div className="w-full lg:w-[48%] xl:w-[46%] flex flex-col justify-center pb-2">
                {/* Section Eyebrow */}
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    COMPLETE SYSTEM SCOPE
                  </span>
                </div>

                {/* Section Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-black text-[#0f1b3a] leading-[1.08] tracking-tight mb-4 sm:mb-5">
                  The collector is <br />
                  one part of the <br />
                  <span className="text-primary-blue">solution.</span>
                </h2>

                {/* Lead Text */}
                <p className="text-slate-600 text-sm sm:text-base lg:text-[16px] xl:text-[17px] leading-relaxed mb-5 sm:mb-6 max-w-xl font-normal">
                  Effective industrial dust collection connects the process to a suitable filtration and handling arrangement. Discuss the complete equipment boundary before comparing quotations.
                </p>

                {/* 3 Benefit Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 pt-1">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-[#0f1b3a] font-bold text-xs sm:text-[14px] leading-snug">Cleaner Workplace</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs leading-snug mt-1">Reduce airborne dust and improve air quality.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                      <Leaf className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-[#0f1b3a] font-bold text-xs sm:text-[14px] leading-snug">Safer Operations</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs leading-snug mt-1">Control dust at source for a healthier environment.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart3 className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-[#0f1b3a] font-bold text-xs sm:text-[14px] leading-snug">Higher Productivity</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs leading-snug mt-1">Maintain consistent airflow and reliable performance.</p>
                    </div>
                  </div>
                </div>

                {/* CTA Row */}
                <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-1">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-primary-blue hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all group"
                  >
                    Discuss Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Column: Annotated Main Equipment Visualization */}
              <div className="w-full lg:w-[52%] xl:w-[54%] relative">
                <div className="relative w-full aspect-[1563/1006] rounded-2xl overflow-hidden select-none">
                  <Image
                    src="/Industrial Dust Collection System with Napcen Logo.png"
                    alt="Industrial Dust Collection System Scope Diagram"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: 4 Scope Cards Grid */}
            <div className="mt-3 sm:mt-5 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                {
                  num: "01",
                  title: "Capture & Ducting",
                  desc: "Design hoods, machine adapters, branch ducts and dampers to capture dust at the right point.",
                  image: "/Stainless Steel Exhaust Hood with Rising Steam.png",
                  alt: "Capture & Ducting Hood"
                },
                {
                  num: "02",
                  title: "Filtration & Cleaning",
                  desc: "Select suitable filter media, cleaning controls and access arrangements for the material and duty.",
                  image: "/Industrial Pleated Filter Cartridges.png",
                  alt: "Pleated Filter Cartridges"
                },
                {
                  num: "03",
                  title: "Fan & Controls",
                  desc: "Size the fan for required air volume and total resistance, including VFD and control systems.",
                  image: "/Industrial Blue Centrifugal Blower Assembly.png",
                  alt: "Centrifugal Blower Assembly"
                },
                {
                  num: "04",
                  title: "Dust Discharge",
                  desc: "Specify collection bins, valves or conveyors around loading, handling and maintenance needs.",
                  image: "/Industrial Hopper with Collection Drum.png",
                  alt: "Hopper with Collection Drum"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0 pr-1">
                    <span className="text-primary-blue font-bold text-xs tracking-wider block mb-1">
                      {item.num}
                    </span>
                    <h3 className="text-[#0f1b3a] font-bold text-base sm:text-[17px] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed mb-0 line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* 08 / TECHNICAL SELECTION GUIDE SECTION */}
        <section id="selection-guide" className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100 scroll-mt-24">
          <div className="w-full px-6 lg:px-14 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            {/* Header: 2 Columns */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16 mb-12 sm:mb-16">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-xl">
                <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block mb-3">
                  TECHNICAL SELECTION GUIDE
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0f1b3a] leading-[1.12] tracking-tight">
                  Eight inputs.<br />
                  <span className="text-primary-blue">A stronger design basis.</span>
                </h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-md lg:pb-2">
                <p className="text-slate-600 text-[14px] sm:text-[16px] leading-relaxed font-normal">
                  Good information helps avoid an undersized collector, an unsuitable filter or an installation that is difficult to maintain.
                </p>
              </motion.div>
            </div>

            {/* 8 Technical Input Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {[
                {
                  num: "01",
                  tag: "01 / MATERIAL",
                  title: "Material",
                  desc: "Identify the dust, coatings and contaminants. Note hazardous, reactive or combustible properties.",
                  icon: FlaskConical
                },
                {
                  num: "02",
                  tag: "02 / PARTICLE BEHAVIOUR",
                  title: "Particle behaviour",
                  desc: "Describe size distribution, density, abrasion, moisture and any tendency to stick or agglomerate.",
                  icon: Sparkles
                },
                {
                  num: "03",
                  tag: "03 / CAPTURE POINTS",
                  title: "Capture points",
                  desc: "List machines, hoods and connections, including which points operate at the same time.",
                  icon: Target
                },
                {
                  num: "04",
                  tag: "04 / AIRFLOW & RESISTANCE",
                  title: "Airflow & resistance",
                  desc: "Share machine requirements and duct routes. Confirm the fan duty against total system resistance.",
                  icon: Wind
                },
                {
                  num: "05",
                  tag: "05 / TEMPERATURE",
                  title: "Temperature",
                  desc: "Record normal and exceptional conditions, moisture and any risk of condensation.",
                  icon: Thermometer
                },
                {
                  num: "06",
                  tag: "06 / PRODUCTION DUTY",
                  title: "Production duty",
                  desc: "Include hours per day, loading variation, shift patterns and planned expansion.",
                  icon: Clock
                },
                {
                  num: "07",
                  tag: "07 / SPACE & UTILITIES",
                  title: "Space & utilities",
                  desc: "Define available height, footprint, service access, electricity and compressed-air supply.",
                  icon: Box
                },
                {
                  num: "08",
                  tag: "08 / OUTLET & HANDLING",
                  title: "Outlet & handling",
                  desc: "Set the required outlet condition and how collected material will be contained and removed.",
                  icon: ClipboardCheck
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative overflow-hidden group bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,27,58,0.08)] hover:border-primary-blue/30 hover:bg-white transition-all duration-300 flex flex-col justify-start min-h-[190px]"
                  >
                    {/* Light icon watermark in background behind description */}
                    <div className="absolute right-0 bottom-0 w-28 h-28 sm:w-32 sm:h-32 text-primary-blue/[0.05] group-hover:text-primary-blue/[0.12] transition-all duration-500 pointer-events-none translate-x-2 translate-y-2 group-hover:scale-110 flex items-center justify-center">
                      <Icon className="w-full h-full stroke-[1.2]" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Top Row: Tag Pill & Icon Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-primary-blue uppercase px-2.5 py-1 ">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-[19px] font-bold text-[#0f1b3a] leading-snug mb-2 group-hover:text-primary-blue transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 09 / BENEFITS & MAINTENANCE SECTION */}
        <section id="benefits-maintenance" className="pt-8 sm:pt-12 pb-20 lg:pb-24 bg-white relative overflow-hidden border-t border-slate-100">
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 max-w-[1600px] mx-auto relative z-10">
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    BENEFITS &amp; MAINTENANCE
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b3a] leading-[1.12] tracking-tight">
                  Benefits that depend on<br />
                  <span className="text-primary-blue">good capture</span> and upkeep.
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex items-center gap-6 max-w-md lg:text-left"
              >
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Benefits depend on correct selection, installation and maintenance. Define the outcomes your process needs before specifying the equipment.
                </p>
              </motion.div>
            </div>

            {/* 3 Benefits Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: 01 / WORKPLACE */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,27,58,0.08)] hover:border-primary-blue/30 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                {/* Light plain image in the background behind description */}
                <div className="absolute right-1 bottom-1 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-30">
                  <Image
                    src="/dust_shield_graphic.jpg"
                    alt="Reduce uncontrolled spread"
                    fill
                    className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle fade to maintain 100% text readability */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-slate-50/30 to-slate-50/70 group-hover:to-white/70 transition-colors" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-primary-blue uppercase px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100/50 mb-2.5">
                      01 / WORKPLACE
                    </span>
                    <h3 className="text-base sm:text-[18px] font-bold text-[#0f1b3a] leading-snug group-hover:text-primary-blue transition-colors">
                      Reduce uncontrolled spread
                    </h3>
                  </div>

                  {/* Normal description - clean text with no box */}
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal pt-1">
                    Capture at the generation point can limit dust migration across a work area. Adequate containment and operator practices remain part of effective exposure control.
                  </p>
                </div>
              </motion.div>

              {/* Card 2: 02 / PRODUCTION */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,27,58,0.08)] hover:border-primary-blue/30 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                {/* Light plain image in the background behind description */}
                <div className="absolute right-1 bottom-1 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-30">
                  <Image
                    src="/Industrial Conveyor Extraction System.png"
                    alt="Manage process housekeeping"
                    fill
                    className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle fade to maintain 100% text readability */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-slate-50/30 to-slate-50/70 group-hover:to-white/70 transition-colors" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-primary-blue uppercase px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100/50 mb-2.5">
                      02 / PRODUCTION
                    </span>
                    <h3 className="text-base sm:text-[18px] font-bold text-[#0f1b3a] leading-snug group-hover:text-primary-blue transition-colors">
                      Manage process housekeeping
                    </h3>
                  </div>

                  {/* Normal description - clean text with no box */}
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal pt-1">
                    A planned collection and discharge route helps reduce uncontrolled deposits around compatible process equipment and makes routine removal more organized.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: 03 / RESOURCES */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,27,58,0.08)] hover:border-primary-blue/30 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                {/* Light plain image in the background behind description */}
                <div className="absolute right-1 bottom-1 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-30">
                  <Image
                    src="/Glossy Green Recycling Symbol Over Aggregate Pile.png"
                    alt="Evaluate material recovery"
                    fill
                    className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle fade to maintain 100% text readability */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-slate-50/30 to-slate-50/70 group-hover:to-white/70 transition-colors" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-primary-blue uppercase px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100/50 mb-2.5">
                      03 / RESOURCES
                    </span>
                    <h3 className="text-base sm:text-[18px] font-bold text-[#0f1b3a] leading-snug group-hover:text-primary-blue transition-colors">
                      Evaluate material recovery
                    </h3>
                  </div>

                  {/* Normal description - clean text with no box */}
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal pt-1">
                    Some processes allow collected material to be recovered. Product quality, contamination, handling and reuse requirements determine whether recovery is appropriate.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MAINTENANCE & SYSTEM PERFORMANCE SECTION */}
        <section id="maintenance-performance" className="pt-8 sm:pt-12 pb-20 lg:pb-24 bg-white relative overflow-hidden">
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 max-w-[1600px] mx-auto relative z-10">
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    MAINTENANCE & SYSTEM PERFORMANCE
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b3a] leading-[1.12] tracking-tight">
                  Keep airflow visible.<br />
                  <span className="text-primary-blue">Keep maintenance</span> practical.
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex items-center gap-6 max-w-md lg:text-left"
              >
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Inspection and servicing should follow the equipment instructions and process hazards. Trends are more useful than isolated readings.
                </p>
              </motion.div>
            </div>

            {/* 3 Maintenance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: 01 / MONITOR */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,27,58,0.08)] hover:border-primary-blue/30 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                {/* Light plain gauge image in the background behind description */}
                <div className="absolute right-1 bottom-1 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-30">
                  <Image
                    src="/differential_pressure_gauge.jpg"
                    alt="Differential pressure gauge"
                    fill
                    className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle fade to maintain 100% text readability */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-slate-50/30 to-slate-50/70 group-hover:to-white/70 transition-colors" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-primary-blue uppercase px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100/50 mb-2.5">
                      01 / MONITOR
                    </span>
                    <h3 className="text-base sm:text-[18px] font-bold text-[#0f1b3a] leading-snug group-hover:text-primary-blue transition-colors">
                      Watch differential pressure
                    </h3>
                  </div>

                  {/* Normal description - clean text with no box */}
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal pt-1">
                    Pressure across the filter helps describe resistance. Review trends together with airflow, cleaning operation and production conditions; pressure alone does not prove filter integrity.
                  </p>
                </div>
              </motion.div>

              {/* Card 2: 02 / INSPECT */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,27,58,0.08)] hover:border-primary-blue/30 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                {/* Light plain duct elbow image in the background behind description */}
                <div className="absolute right-1 bottom-1 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-30">
                  <Image
                    src="/duct_elbow_component.jpg"
                    alt="Check the extraction path"
                    fill
                    className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle fade to maintain 100% text readability */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-slate-50/30 to-slate-50/70 group-hover:to-white/70 transition-colors" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-primary-blue uppercase px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100/50 mb-2.5">
                      02 / INSPECT
                    </span>
                    <h3 className="text-base sm:text-[18px] font-bold text-[#0f1b3a] leading-snug group-hover:text-primary-blue transition-colors">
                      Check the extraction path
                    </h3>
                  </div>

                  {/* Normal description - clean text with no box */}
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal pt-1">
                    Inspect accessible hoods, ducts, joints and discharge points for leaks, buildup and damage. Poor capture may originate outside the collector housing.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: 03 / SERVICE */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group relative overflow-hidden bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(15,27,58,0.08)] hover:border-primary-blue/30 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                {/* Light plain filter cartridge image in the background behind description */}
                <div className="absolute right-1 bottom-1 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-30">
                  <Image
                    src="/Industrial Pleated Filter Cartridges.png"
                    alt="Plan filter and dust handling"
                    fill
                    className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle fade to maintain 100% text readability */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-slate-50/30 to-slate-50/70 group-hover:to-white/70 transition-colors" />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-bold tracking-[0.15em] text-primary-blue uppercase px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-100/50 mb-2.5">
                      03 / SERVICE
                    </span>
                    <h3 className="text-base sm:text-[18px] font-bold text-[#0f1b3a] leading-snug group-hover:text-primary-blue transition-colors">
                      Plan filter and dust handling
                    </h3>
                  </div>

                  {/* Normal description - clean text with no box */}
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal pt-1">
                    Provide safe maintenance access and appropriate containment for collected material. Select replacement filters against the original duty and equipment requirements.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 11 / OPERATING COST PLANNING (WHAT DETERMINES THE PRICE?) SECTION */}
        <section id="pricing-factors" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-slate-100">
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 max-w-[1600px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">

              {/* Left Column: Heading & System Description */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-5 max-w-xl"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    WHAT DETERMINES THE PRICE?
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f1b3a] leading-[1.12] tracking-tight mb-7">
                  Compare scope.<br />
                  <span className="text-primary-blue">Then compare cost.</span>
                </h2>

                <div className="space-y-5 text-slate-600 text-[15px] sm:text-[16px] leading-relaxed font-normal">
                  <p>
                    A dust collector quotation should explain the duty and equipment included. Two collectors with the same motor rating may have very different filtration area, airflow capability and installation requirements.
                  </p>
                  <p>
                    Ask for the design basis, collector configuration, fan duty, discharge arrangement and utilities. Separate equipment supply from ducting, installation and other site work so the comparison is meaningful.
                  </p>
                </div>
              </motion.div>

              {/* Right Column: 4 Scope & Cost Factors with Tick Icons */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-7 w-full lg:pt-3"
              >
                <div className="flex flex-col">
                  {[
                    {
                      title: "Process and capacity",
                      desc: "Airflow, loading, particle behaviour and continuous or intermittent operation influence equipment size."
                    },
                    {
                      title: "Filtration and construction",
                      desc: "Media, operating temperature, material compatibility and access arrangements affect the configuration."
                    },
                    {
                      title: "System integration",
                      desc: "Hoods, ductwork, fans, discharge devices and controls define the complete extraction scope."
                    },
                    {
                      title: "Operating and maintenance costs",
                      desc: "Electricity, compressed air, filter replacements, handling and servicing contribute to lifecycle cost."
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="py-6 sm:py-7 border-b border-slate-200/80 first:border-t border-slate-200/80 flex items-start gap-4 sm:gap-5 group transition-all duration-200 hover:pl-2"
                    >
                      {/* Tick Icon instead of number */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 text-primary-blue flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-all duration-300">
                        <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-[19px] font-bold text-[#0f1b3a] group-hover:text-primary-blue transition-colors duration-200 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-[14.5px] leading-relaxed mt-1.5 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 12 / PROJECTS & MANUFACTURING SECTION */}
        <ProjectsManufacturingSection
          onSelectEquipment={(collectorName) => {
            setFormData((prev) => ({
              ...prev,
              collector: collectorName,
              desc: prev.desc
                ? `${prev.desc}\n\n[Inquiring about: ${collectorName}]`
                : `Inquiring about: ${collectorName}`
            }));
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 12 / SERVICE & SPARE PARTS SECTION */}
        <section id="service-spares" className="py-14 sm:py-20 lg:py-24 bg-[#090e11] text-white relative overflow-hidden border-t border-slate-900">
          {/* Background Industrial Baghouse & Ductwork Artwork */}
          <div className="absolute top-0 right-0 w-full lg:w-[62%] xl:w-[56%] h-[460px] lg:h-[560px] pointer-events-none z-0 overflow-hidden">
            <Image
              src="/industrial_baghouse_system.jpg"
              alt="Industrial Baghouse System & Ductwork"
              fill
              className="object-cover object-right opacity-85 lg:opacity-95 brightness-115 contrast-105"
              quality={95}
              priority
            />
            {/* Soft Edge Feather Overlays */}
            <div className="absolute inset-y-0 left-0 w-48 sm:w-64 bg-gradient-to-r from-[#090e11] via-[#090e11]/70 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090e11] to-transparent z-10" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#090e11] to-transparent z-10" />
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 max-w-[1780px] mx-auto relative z-10">
            {/* Header Area */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-3xl mb-8 sm:mb-10"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                  SERVICE & SPARE PARTS
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black text-white leading-[1.08] tracking-tight mb-4">
                Support the installed system.<br />
                Keep replacements compatible.
              </h2>

              {/* Subtitle / Paragraphs */}
              <div className="text-slate-400 text-sm sm:text-[15px] leading-relaxed space-y-1 font-normal max-w-2xl">
                <p>Discuss service availability and the exact scope for your equipment and location.</p>
                <p>A useful service enquiry identifies the machine, symptoms and operating conditions.</p>
              </div>
            </motion.div>

            {/* 4 Service Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 xl:gap-6 mb-8 sm:mb-12"
            >
              {[
                {
                  num: "01",
                  icon: Layers,
                  title: "Replacement filters",
                  desc: "Share collector model, filter dimensions, media specification and dust duty. Cartridge and bag selection should account for compatibility, sealing and cleaning arrangements.",
                  img: "/Industrial Filter Cartridges and Bags.png",
                  imgAlt: "Replacement filter cartridges and bags"
                },
                {
                  num: "02",
                  icon: Settings,
                  title: "Cleaning-system components",
                  desc: "For pulse valves, diaphragms or controllers, include part references and pneumatic/electrical details. Confirm component suitability before ordering replacements.",
                  img: "/Industrial Pneumatic Valve Assembly.png",
                  imgAlt: "Pulse jet cleaning system components and pneumatic valve assembly"
                },
                {
                  num: "03",
                  icon: Search,
                  title: "Inspection & troubleshooting",
                  desc: "Describe weak suction, rising pressure, dust leakage or irregular discharge. Existing drawings, photographs and readings help define an inspection scope.",
                  img: "/Industrial Pressure Gauge with Brass Fitting.png",
                  imgAlt: "Industrial pressure gauge with brass fitting for inspection"
                },
                {
                  num: "04",
                  icon: BarChart3,
                  title: "Retrofit & upgrade review",
                  desc: "Discuss changes to media, pickup points, branch balance, fan controls or discharge. Establish why performance is poor before changing equipment.",
                  img: "/Industrial Blue Blower with Stainless Ductwork.png",
                  imgAlt: "Industrial blue blower with stainless ductwork upgrade"
                }
              ].map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="relative bg-[#0e1619]/90 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:shadow-[0_10px_30px_rgba(10,92,187,0.12)] hover:-translate-y-0.5"
                  >
                    {/* Subtle Top Ambient Glow on Hover */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>

                        {/* Title */}
                        <h3 className="text-[15px] sm:text-base font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>
                      </div>

                      {/* Same Row: Description on Left & Product Image on Right */}
                      <div className="flex items-center justify-between gap-3 sm:gap-4 pt-1 mt-auto">
                        <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed font-normal flex-1">
                          {card.desc}
                        </p>

                        <div className="relative w-20 h-16 sm:w-24 sm:h-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={card.img}
                            alt={card.imgAlt}
                            fill
                            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Callout Banner: Have an existing collector? */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative rounded-3xl border border-blue-500/30 bg-[#0c1417]/95 p-6 sm:p-8 lg:p-9 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Subtle Industrial Background Watermark on Right */}
              <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-50 pointer-events-none overflow-hidden">
                <Image
                  src="/industrial_baghouse_system.jpg"
                  alt="Existing Collector Ductwork"
                  fill
                  className="object-cover object-right brightness-110 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c1417] via-[#0c1417]/60 to-transparent" />
              </div>

              {/* Left Content */}
              <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                <div className="w-14 h-14 flex items-center justify-center text-white-400 shrink-0 ">
                  <Headset className="w-12 h-12" />
                </div>
                <div>
                  <span className="text-blue-400 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase block mb-1">
                    EXISTING INSTALLATION
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-1">
                    Have an existing collector?
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm lg:text-[15px] font-normal">
                    Include its nameplate, filter details and the issue you want to resolve.
                  </p>
                </div>
              </div>

              {/* Right CTA Button */}
              <div className="relative z-10 shrink-0">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 bg-[#0a5cbb] hover:bg-blue-600 text-white font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-[15px] shadow-[0_4px_25px_rgba(10,92,187,0.35)] hover:shadow-[0_6px_30px_rgba(10,92,187,0.5)] transition-all cursor-pointer group"
                >
                  <span>Discuss service or spares</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>



        {/* WORKFLOW / PROJECT LIFECYCLE SECTION */}
        <WorkflowSection />

        {/* FAQ SECTION */}
        <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden scroll-mt-24">
          <span id="faqs" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-24 items-start">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="static lg:sticky lg:top-32 mb-2 lg:mb-0">
                <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block mb-2 sm:mb-4">
                  14 / DUST COLLECTION FAQS
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#0f1b3a] leading-[1.1] tracking-tight mb-4 lg:mb-6">
                  Answers before<br />you specify.
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-sm">
                  Practical explanations for production teams, maintenance engineers and procurement buyers.
                </p>
              </motion.div>

              <div className="flex flex-col">
                {visibleFaqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div key={i} className="border-b border-slate-200 last:border-0 overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                      >
                        <h3 className={`text-lg font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-primary-blue' : 'text-[#0f1b3a] group-hover:text-primary-blue'}`}>
                          {faq.q}
                        </h3>
                        <div className={`relative shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'border-primary-blue bg-primary-blue shadow-md' : 'border-slate-200 bg-slate-50 group-hover:border-primary-blue group-hover:bg-blue-50'}`}>
                          <div className={`absolute w-3.5 h-[2px] transition-all duration-300 rounded-full ${isOpen ? 'bg-white' : 'bg-slate-600 group-hover:bg-primary-blue'}`}></div>
                          <div className={`absolute w-[2px] h-3.5 transition-all duration-300 rounded-full ${isOpen ? 'bg-white rotate-90 scale-0' : 'bg-slate-600 group-hover:bg-primary-blue scale-100'}`}></div>
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="pb-8 pr-12 text-slate-500 text-[15px] font-medium leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {dustFaqs.length > 8 && (
                  <div className="pt-8 flex justify-center w-full">
                    <button
                      type="button"
                      onClick={() => setShowAllFaqs(!showAllFaqs)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-primary-blue text-[#0f1b3a] hover:text-primary-blue font-bold text-sm shadow-sm transition-all bg-white cursor-pointer"
                    >
                      <span>{showAllFaqs ? "Show less" : "Read more"}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllFaqs ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* COMBINED CTA & FOOTER SECTION */}
        <Footer
          className="bg-black pt-24"
          brandName="NAPCEN"
          brandDescription="Industrial Air Pollution Control Equipment & Engineering Solutions. Built around the application, not just the equipment."
          creatorName="NAPCEN Team"
          creatorUrl="#"
          navLinks={[
            { label: "Collectors", href: "#collectors" },
            { label: "Applications", href: "#applications" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Projects", href: "#projects" },
            { label: "Selection guide", href: "#selection-guide" },
            { label: "FAQs", href: "#faq" },
          ]}
          socialLinks={[
            { icon: <Globe className="w-5 h-5" />, href: "#", label: "Website" },
            { icon: <Users className="w-5 h-5" />, href: "#", label: "LinkedIn" },
            { icon: <Mail className="w-5 h-5" />, href: "#contact", label: "Email" },
          ]}
          brandIcon={<Image src="/Napcen-logo.webp" alt="NAPCEN Logo" width={80} height={80} className="object-contain p-2" />}
        >
          <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-20 border-b border-white/10 pb-20">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">

              {/* Left Column */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-xl">
                <span className="text-white font-mono text-[11px] tracking-[0.3em] uppercase mb-6 block">
                  Let's Build Together
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-[54px] font-black text-white mb-6 leading-[1.1] tracking-tight">
                  Need industrial air <br className="hidden md:block" />
                  pollution control equipment?
                </h2>
                <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                  Start a technical discussion with NAPCEN engineers. We analyze your process to provide the most effective pollution control solution.
                </p>

                {/* Contact Minimal Blocks */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-[#12161b] flex items-center justify-center transition-all border border-white/5 shrink-0">
                        <Phone className="text-cyan-400 w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">SALES INQUIRY</div>
                        <a href="tel:+917904469219" className="text-white text-[15px] font-bold tracking-wide hover:text-cyan-400 transition-colors block">
                          +91 79044 69219
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-[#12161b] flex items-center justify-center transition-all border border-white/5 shrink-0">
                        <Mail className="text-cyan-400 w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">GENERAL SUPPORT</div>
                        <a href="mailto:info@napcen.com" className="text-white text-[15px] font-bold tracking-wide hover:text-cyan-400 transition-colors block"> info@napcen.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#12161b] flex items-center justify-center transition-all border border-white/5 shrink-0 mt-1">
                      <MapPin className="text-cyan-400 w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white text-[15px] font-bold tracking-wide hover:text-cyan-400 transition-colors block leading-relaxed">
                        No. 42, Main Road, Villianur,<br />
                        Puducherry, India - 605110
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column (Dark Sleek Card) */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative z-10 overflow-hidden group">
                {/* Glow effect */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-colors duration-700"></div>

                <h3 className="text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Request a quotation</h3>
                <p className="text-slate-400 mb-10 font-medium leading-relaxed relative z-10">
                  Provide your process specifications, and our engineers will evaluate the requirements for a customized solution.
                </p>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative z-10 flex w-full justify-between items-center bg-white hover:bg-slate-200 text-black font-black py-4 px-8 rounded-full transition-all text-sm tracking-widest uppercase group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer">
                  <span>Get my quotation</span>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Privacy Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <h4 className="text-slate-300 font-bold text-sm mb-2">Enquiry data & privacy</h4>
              <p className="text-slate-500 text-xs leading-relaxed max-w-4xl">
                Your enquiry details are submitted securely to NAPCEN's engineering team for prompt technical review and customized quotation. We do not sell or share your contact information with third parties. For direct communications, you can also reach us at <a href="mailto:info@napcen.com" className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors">info@napcen.com</a>.
              </p>
            </div>
          </div>
        </Footer>
      </main>
    </div>
  );
}