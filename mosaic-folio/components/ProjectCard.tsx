"use client";

import Link from "next/link";
import { projectNames } from "@/lib/projectConst";

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

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectName = projectNames[project.projectName] || `Projet ${project.projectName}`;
  
  // Récupérer le thumbnail depuis GitHub
  const repoName = project.github.split('/').pop()?.replace('.git', '') || project.title;
  const imageUrl = `https://raw.githubusercontent.com/${project.gitUsername}/${repoName}/main/thumbnail.png`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/no-thumbnail.png";
          }}
        />
      </div>

      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
            {projectName}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>

        <p className="text-gray-600 text-sm mb-4">
          Par <span className="font-semibold">{project.gitUsername}</span>
        </p>

        <p className="text-gray-500 text-xs mb-4">
          Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR")}
        </p>

        <Link
          href={`/${project.id}`}
          className="block w-full px-4 py-2 bg-amber-500 text-white text-center rounded-md hover:bg-amber-600 transition font-semibold"
        >
          Détails
        </Link>
      </div>
    </div>
  );
}
