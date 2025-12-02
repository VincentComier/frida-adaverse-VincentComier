"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { projectNames } from "@/lib/projectConst";

export const dynamic = 'force-dynamic';

interface Project {
  id: number;
  title: string;
  github: string;
  demolink: string;
  createdAt: string;
  projectId: number;
  projectName: number;
  gitUsername: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedProject = searchParams.get("filter") || "";

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject === "") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.projectId === Number(selectedProject))
      );
    }
  }, [selectedProject, projects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data.projects);
      setFilteredProjects(data.projects);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Projets de la communauté Ada
          </h1>
          <p className="text-gray-600">
            Découvrez les projets réalisés par les apprenant·e·s d'Ada Tech School
          </p>
        </div>



        <p className="text-center text-gray-600 mb-8">
          {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""} affiché{filteredProjects.length > 1 ? "s" : ""}
          {selectedProject && ` - ${projectNames[Number(selectedProject)]}`}
        </p>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des projets...</p>
          </div>
        )}

        {!loading && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucun projet trouvé pour ce filtre.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
