import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import { TrainingType } from "@/utils/Types";
import { redirect } from "next/navigation";

export default async function TrainingPage() {
    const reuslt = await verifyAuth()

    if (!reuslt.user) {
        return redirect("/")
    }

    const trainingSesstions: TrainingType[] = getTrainings()

    return (
        <main>
            <h1>Find your favorite activity</h1>
            <ul id="training-sessions">
                {
                    trainingSesstions.map((training: TrainingType) => (
                        <li key={training.id}>
                            <img src={`/trainings/${training.image}`} alt={training.title} />
                            <div>
                                <h2>{training.title}</h2>
                                <p>{training.description}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}