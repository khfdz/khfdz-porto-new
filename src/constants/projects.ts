import projectManulife from "@/assets/manulife.png";
import gadgetStore1 from "@/assets/gadget-store-1.png";
import gadgetStore2 from "@/assets/gadget-store-2.png";
import gadgetStore3 from "@/assets/gadget-store-3.png";
import gadgetStore4 from "@/assets/gadget-store-4.png";
import gadgetStore5 from "@/assets/gadget-store-5.png";
import gadgetStore6 from "@/assets/gadget-store-6.png";
import getaway1 from "@/assets/getaway-heaven-1.png";
import getaway2 from "@/assets/getaway-heaven-2.png";
import getaway3 from "@/assets/getaway-heaven-3.png";
import getaway4 from "@/assets/getaway-heaven-4.png";
import getaway5 from "@/assets/getaway-heaven-5.png";
import projectLarana from "@/assets/larana.png";
import pakOlin1 from "@/assets/pak-olin-1.png";
import pakOlin2 from "@/assets/pak-olin-2.png";
import rockPaper1 from "@/assets/rock-paper-1.png";
import rockPaper2 from "@/assets/rock-paper-2.png";
import rockPaper3 from "@/assets/rock-paper-3.png";
import rockPaper4 from "@/assets/rock-paper-4.png";
import antrianFo1 from "@/assets/antrian-fo-1.png";
import antrianFo2 from "@/assets/antrian-fo-2.png";
import antrianFo3 from "@/assets/antrian-fo-3.png";
import antrianFo4 from "@/assets/antrian-fo-4.png";
import antrianFo5 from "@/assets/antrian-fo-5.png";
import antrianFo6 from "@/assets/antrian-fo-6.png";
import antrianFo7 from "@/assets/antrian-fo-7.png";
import antrianFo8 from "@/assets/antrian-fo-8.png";
import antrianFarmasi1 from "@/assets/antrian-farmasi-1.png";
import antrianFarmasi2 from "@/assets/antrian-farmasi-2.png";
import antrianFarmasi3 from "@/assets/antrian-farmasi-3.png";
import antrianFarmasi4 from "@/assets/antrian-farmasi-4.png";
import antrianFarmasi5 from "@/assets/antrian-farmasi-5.png";
import antrianFarmasi6 from "@/assets/antrian-farmasi-6.png";
import antrianFarmasi7 from "@/assets/antrian-farmasi-7.png";
import antrianFarmasi8 from "@/assets/antrian-farmasi-8.png";
import portoKhfdz from "@/assets/porto-khfdz.png";

import {
  Code2, Globe, FileCode, Palette, Smartphone,
  Server, Layers, Database, GitBranch, Box,
  Terminal, Settings, Cloud, Wifi, Wrench, Cpu,
  Shield, HardDrive, Layout
} from "lucide-react";

export interface Project {
  title: string;
  desc: string;
  stack: string[];
  tools: string[];
  images: string[];
  demo: string;
  github: string;
}

export const projects: Project[] = [
  {
    title: "My First Portfolio",
    desc: "A personal portfolio website showcasing my early projects, skills, and information as a beginner developer.",
    stack: ["React", "Tailwind"],
    tools: [],
    images: [portoKhfdz],
    demo: "https://porto-khfdz.vercel.app/",
    github: "https://github.com/khfdz/Porto-khfdz",
  },
  {
    title: "Game Rock-Paper-Scissor",
    desc: "A Rock-Paper-Scissors game application featuring extended rules that include Spock and Lizard for a more dynamic and engaging gameplay experience.",
    stack: ["React", "Tailwind"],
    tools: [],
    images: [rockPaper1, rockPaper2, rockPaper3, rockPaper4],
    demo: "https://rockpaperscissor-khfdz.vercel.app/",
    github: "https://github.com/khfdz/rockpaperscissor-khfdz",
  },
  {
    title: "Front Office Queue System - RS Permata Keluarga Karawang",
    desc: "A specialized front office queue management system designed for RS Permata Keluarga Karawang, featuring ticket printing and an automated calling system to streamline patient management.",
    stack: ["React", "Express", "Node.js", "MySQL"],
    tools: ["Ubuntu", "PM2", "Nginx", "Docker"],
    images: [antrianFo1, antrianFo2, antrianFo3, antrianFo4, antrianFo5, antrianFo6, antrianFo7, antrianFo8],
    demo: "#",
    github: "#",
  },
  {
    title: "Pharmacy Queue System - RS Permata Keluarga Karawang",
    desc: "A specialized pharmacy queue management system designed for RS Permata Keluarga Karawang, featuring ticket printing and an automated calling system to streamline medicine collection and patient management.",
    stack: ["React", "Express", "Node.js", "MySQL"],
    tools: ["Ubuntu", "PM2", "Nginx", "Docker"],
    images: [antrianFarmasi1, antrianFarmasi2, antrianFarmasi3, antrianFarmasi4, antrianFarmasi5, antrianFarmasi6, antrianFarmasi7, antrianFarmasi8],
    demo: "#",
    github: "#",
  },
  {
    title: "Manulife Report",
    desc: "Developed a frontend interface to display financial reports using static data from JSON, focusing on clean layout, data presentation, and responsive design.",
    stack: ["HTML", "CSS", "JavaScript"],
    tools: [],
    images: [projectManulife],
    demo: "https://tugas-pak-rizky.vercel.app/",
    github: "https://github.com/khfdz/Tugas-Pak-Rizky",
  },
  {
    title: "Gadget Store",
    desc: "A modern e-commerce interface showcasing various gadgets with clean UI, intuitive navigation, and structured product display to enhance user browsing experience.",
    stack: ["React", "Tailwind"],
    tools: [],
    images: [gadgetStore1, gadgetStore2, gadgetStore3, gadgetStore4, gadgetStore5, gadgetStore6],
    demo: "https://tugas14-fe-gadget-store2.vercel.app/",
    github: "https://github.com/khfdz/tugas14-FE-Gadget-Store",
  },
  {
    title: "Getawayhaven",
    desc: "A modern villa rental website featuring clean UI, intuitive navigation, and well-structured property listings to provide a seamless browsing experience for users exploring vacation stays.",
    stack: ["React", "Tailwind"],
    tools: [],
    images: [getaway1, getaway2, getaway3, getaway4, getaway5],
    demo: "https://getaway-haven.vercel.app/",
    github: "https://github.com/khfdz/GetawayHaven",
  },
  {
    title: "Furniture by Larana",
    desc: "A modern furniture browsing website that showcases various home decor and furniture collections with clean UI, intuitive navigation, and well-structured product displays to enhance user exploration experience.",
    stack: ["React", "Tailwind"],
    tools: [],
    images: [projectLarana],
    demo: "https://furniture-by-larana-2b58.vercel.app/#home",
    github: "https://github.com/khfdz/FurnitureByLarana",
  },
  {
    title: "Pak Olin",
    desc: "A web application that allows users to search, view, and reserve parking spaces online with a clean interface and intuitive booking flow for a seamless parking experience.",
    stack: ["React", "Tailwind"],
    tools: [],
    images: [pakOlin1, pakOlin2],
    demo: "https://ilcs-test-seven.vercel.app/",
    github: "https://github.com/khfdz/ilcs-test",
  }
];

export interface SkillInfo {
  name: string;
  icon: any;
  level: number;
}

export const skillMetadata: Record<string, SkillInfo> = {
  // Stack
  "React": { name: "React", icon: Code2, level: 90 },
  "Tailwind": { name: "Tailwind CSS", icon: Palette, level: 95 },
  "Express": { name: "Express", icon: Layers, level: 85 },
  "Node.js": { name: "Node.js", icon: Server, level: 88 },
  "MySQL": { name: "MySQL", icon: Database, level: 82 },
  "HTML": { name: "HTML", icon: Globe, level: 95 },
  "CSS": { name: "CSS", icon: Palette, level: 92 },
  "JavaScript": { name: "JavaScript", icon: FileCode, level: 85 },
  // Tools
  "Ubuntu": { name: "Ubuntu/Linux", icon: Terminal, level: 78 },
  "PM2": { name: "PM2", icon: Settings, level: 75 },
  "Nginx": { name: "Nginx", icon: Layout, level: 78 },
  "Docker": { name: "Docker", icon: Box, level: 70 },
  "MongoDB": { name: "MongoDB", icon: Database, level: 80 },
  "VPS": { name: "VPS Administration", icon: Cloud, level: 85 },
};
