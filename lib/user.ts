import db from "./db"

export function createUser(email: string, password: string) {
    const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, password)
    return result.lastInsertRowid;
}

export function getUserByEmail(email: string): { id: string, email: string, password: string } {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as { id: string, email: string, password: string }
}