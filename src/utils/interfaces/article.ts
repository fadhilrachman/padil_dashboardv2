interface ResponAricle {
  id: string;
  total_pemasukan: number;
  tanggal: Date | string;
  kategori: string;
  deskripsi?: string;
}

interface RequestArticle {
  id?: string;
  judul: string;
  tanggal: string;
  kategori: string;
  link: string;
}

export type { ResponAricle, RequestArticle };
