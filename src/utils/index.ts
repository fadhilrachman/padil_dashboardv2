// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
const convertDate = (param: string): string => {
  const date = new Date(param);

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

console.log(convertDate("2012-09-1"));

// const komaSatu = [4, 7, 10, 13, 16, 19, 22, 25, 28];
// const komaDua = [5, 8, 11, 14, 17, 20, 23, 26, 29];
// const komeTiga = [6, 9, 12, 15, 18, 21, 24, 27, 30];

// const formatRupiah = (param) => {
//   const angka = String(param);
//   let hasil = "";

//   for (let i = 0; i < angka.length; i++) {
//     if (komaSatu.includes(angka.length)) {
//       i % 4 === 1 ? (hasil += ",") : "";
//     }
//     if (komaDua.includes(angka.length)) {
//       i % 5 === 2 ? (hasil += ",") : "";
//     }
//     if (komeTiga.includes(angka.length)) {
//       i % 6 === 3 ? (hasil += ",") : "";
//     }
//     hasil += angka[i];
//   }
// };

function formatNumber(n: number): string {
  const str = n.toString();
  return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getToken = () => {
  return localStorage.getItem("token");
};

export { convertDate, formatNumber, getToken };
