interface ResponIncome {
  id: string;
  total_pemasukan: number;
  tanggal: Date;
  kategori: string;
  deskripsi?: string;
}

interface RequestIncome {
  id?: string;
  total_pemasukan: number|"";
  tanggal: string;
  kategori: string;
  deskripsi?: string;
}

export type { ResponIncome, RequestIncome };
