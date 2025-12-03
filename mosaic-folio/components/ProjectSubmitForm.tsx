"use client";

import { useState } from "react";

interface ProjectSubmitFormProps {
  onClose: () => void;
}

export default function ProjectSubmitForm({ onClose }: ProjectSubmitFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    github: "",
    demolink: "",
    gitUsername: "",
    projectId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la soumission");
      }

      alert("Projet soumis avec succès ! Il sera publié après validation.");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Soumettre un projet</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1">
              Titre *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-gray-900"
              placeholder="Mon super projet"
            />
          </div>

          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-900 mb-1">
              URL GitHub *
            </label>
            <input
              type="url"
              id="github"
              required
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-gray-900"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label htmlFor="demolink" className="block text-sm font-medium text-gray-900 mb-1">
              URL de démo *
            </label>
            <input
              type="text"
              id="demolink"
              required
              value={formData.demolink}
              onChange={(e) => setFormData({ ...formData, demolink: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-gray-900"
              placeholder="https://mon-projet.vercel.app"
            />
          </div>

          <div>
            <label htmlFor="gitUsername" className="block text-sm font-medium text-gray-900 mb-1">
              Nom d'utilisateur GitHub *
            </label>
            <input
              type="text"
              id="gitUsername"
              required
              value={formData.gitUsername}
              onChange={(e) => setFormData({ ...formData, gitUsername: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-600 text-gray-900"
              placeholder="votre-username"
            />
          </div>

          <div>
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-900 mb-1">
              Projet Ada *
            </label>
            <select
              id="projectId"
              required
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
            >
              <option value="">Sélectionnez un projet</option>
              <option value="1">Ada Check Events</option>
              <option value="2">Ada Quiz</option>
              <option value="3">Adaence</option>
              <option value="4">Adaopte</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-500 text-white font-semibold rounded-md hover:bg-amber-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
}
