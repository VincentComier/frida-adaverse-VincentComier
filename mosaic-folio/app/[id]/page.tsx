"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
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
  studentId: number;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/projects?id=${resolvedParams.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Projet non trouvé");
                }
                return response.json();
            })
            .then((data) => {
                setProject(data.projects?.[0] || null);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération du projet:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [resolvedParams.id]);

    if (loading) return <p className="text-center py-12">Chargement du projet...</p>;
    if (error) return <p className="text-center py-12 text-red-600">Erreur: {error}</p>;
    if (!project) return <p className="text-center py-12">Projet non trouvé.</p>;

    const projectName = projectNames[project.projectName] || `Projet ${project.projectName}`;
    
    // Récupérer le thumbnail depuis GitHub si disponible
    const repoName = project.github.split('/').pop()?.replace('.git', '') || project.title;
    const imageUrl = `https://raw.githubusercontent.com/${project.gitUsername}/${repoName}/main/thumbnail.png`;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link 
                    href="/" 
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6 font-semibold"
                >
                    ← Retour aux projets
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="h-96 bg-gray-200 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/no-thumbnail.png";
                            }}
                        />
                    </div>

                    <div className="p-8">
                        <div className="mb-4">
                            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 text-base font-semibold rounded-full">
                                {projectName}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{project.title}</h1>

                        <p className="text-gray-600 text-lg mb-2">
                            Par <span className="font-semibold">{project.gitUsername}</span>
                        </p>

                        <p className="text-gray-500 mb-8">
                            Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>

                        <div className="flex gap-4">
                            <a
                                href={project.demolink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-6 py-3 bg-amber-500 text-white text-center rounded-md hover:bg-amber-600 transition font-semibold text-lg"
                            >
                                Voir la démo
                            </a>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-6 py-3 bg-gray-800 text-white text-center rounded-md hover:bg-gray-900 transition font-semibold text-lg"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}