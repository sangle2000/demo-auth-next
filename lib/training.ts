import { TrainingType } from "@/utils/Types";
import db from "./db"

export function getTrainings(): TrainingType[] {
    const stmt = db.prepare('SELECT * FROM trainings');
    return stmt.all() as TrainingType[]
}