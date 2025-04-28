export function isSqliteUniqueError(error: unknown): error is { code: string } {
    return typeof error === "object" && error !== null && 'code' in error && (error as any).code === "SQLITE_CONSTRAINT_UNIQUE";
}