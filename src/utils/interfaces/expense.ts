interface ResponExpense {
  id: string;
  total_pengeluaran: number;
  tanggal: Date | string;
  kategori: string;
  deskripsi?: string;
}

interface RequestExpense {
  id?: string;
  total_pengeluaran: number | "";
  tanggal: string;
  kategori: string;
  deskripsi?: string;
}

export type { ResponExpense, RequestExpense };
