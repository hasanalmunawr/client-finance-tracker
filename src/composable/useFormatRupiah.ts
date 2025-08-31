export function formatRupiah(val: number) {
 return val.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}
