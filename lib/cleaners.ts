export interface Cleaner {
  id: string;
  userId: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  color: string;
  active: boolean;
}

export function rowToCleaner(row: Record<string, unknown>): Cleaner {
  return {
    id: row.id as string,
    userId: (row.user_id as string) ?? null,
    name: row.name as string,
    email: (row.email as string) ?? null,
    phone: (row.phone as string) ?? null,
    color: row.color as string,
    active: (row.active as boolean) ?? true,
  };
}
