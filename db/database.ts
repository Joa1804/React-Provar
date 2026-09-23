import type { SQLiteDatabase } from 'expo-sqlite';

export async function databaseConnection(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status INTEGER NOT NULL DEFAULT 0
    );
  `);
}