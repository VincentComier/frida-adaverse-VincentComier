import { db } from "@/db";
import { projectsDetails } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = Number(id);

    // Mettre à jour updated_at avec la date actuelle
    const updatedProject = await db
      .update(projectsDetails)
      .set({ updatedAt: new Date() })
      .where(eq(projectsDetails.id, projectId))
      .returning();

    if (updatedProject.length === 0) {
      return Response.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Projet validé avec succès",
      project: updatedProject[0],
    });
  } catch (error) {
    console.error("Erreur lors de la validation du projet:", error);
    return Response.json(
      { error: "Erreur serveur lors de la validation" },
      { status: 500 }
    );
  }
}
