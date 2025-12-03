"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  github: string;
  demolink: string;
  createdAt: string;
  projectName: string;
  gitUsername: string;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingProjects = async () => {
    try {
      const response = await fetch("/api/projects?pending=true");
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProjects();
  }, []);

  const handleValidate = async (projectId: number) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
      });

      if (response.ok) {
        // Recharger la liste après validation
        fetchPendingProjects();
      } else {
        alert("Erreur lors de la validation");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la validation");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
        <div className="text-center text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Projets à valider ({projects.length})
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Retour
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
            Aucun projet en attente de validation
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {project.title}
                    </h2>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Projet:</span> {project.projectName}
                      </p>
                      <p>
                        <span className="font-medium">Auteur:</span> {project.gitUsername}
                      </p>
                      <p>
                        <span className="font-medium">Soumis le:</span>{" "}
                        {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                      <div className="flex gap-4 mt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          GitHub →
                        </a>
                        <a
                          href={project.demolink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Démo →
                        </a>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleValidate(project.id)}
                    className="ml-4 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition"
                  >
                    Valider
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
