import { getTrainings } from "@/lib/training";
import { TrainingType } from "@/utils/Types";

export default async function TrainingPage() {
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