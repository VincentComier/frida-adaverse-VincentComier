"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ProjectSubmitForm from "@/components/ProjectSubmitForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "";

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      router.push("/");
    } else {
      router.push(`/?filter=${value}`);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 bg-[#F5A642]">
        <Link href="/" className="hover:opacity-90 transition shrink-0">
          <Image 
            src="/logo.svg" 
            alt="MosaicFolio" 
            width={60} 
            height={60}
            priority
            className="h-14 w-14"
          />
        </Link>

        <div className="flex items-center gap-4">
          <select
            value={currentFilter}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md border border-[#1a1a2e] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
          >
            <option value="">Tous les projets</option>
            <option value="1">Ada Check Events</option>
            <option value="2">Ada Quiz</option>
            <option value="3">Adaence</option>
            <option value="4">Adaopte</option>
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-[#1a1a2e] text-white font-semibold rounded-md hover:bg-[#252541] transition focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
          >
            Soumettre projet
          </button>
        </div>
      </nav>

      {showForm && <ProjectSubmitForm onClose={() => setShowForm(false)} />}
    </>
  );
}
