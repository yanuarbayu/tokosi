 // Class Barang
 class Barang {
    constructor(nama, harga, stok) {
        this.nama = nama;
        this.harga = harga;
        this.stok = stok;
    }
}

// Class BarangManager
class BarangManager {
    constructor() {
        this.barangList = JSON.parse(localStorage.getItem('barangList')) || [];
        this.renderBarangList();
    }

    tambahBarang(nama, harga, stok) {
        if (!nama || !harga || !stok) {
            alert("Nama, harga, dan stok barang harus diisi!");
            return;
        }
        const barang = new Barang(nama.trim(), harga.trim(), stok.trim());
        this.barangList.push(barang);
        this.saveToLocalStorage();
        this.renderBarangList();
        this.clearForm();
    }

    editBarang(index) {
        const barang = this.barangList[index];
        const namaBaru = prompt("Edit Nama Barang:", barang.nama);
        const hargaBaru = prompt("Edit Harga Barang:", barang.harga);
        const stokBaru = prompt("Edit Stok Barang:", barang.stok);

        if (namaBaru !== null && hargaBaru !== null && stokBaru !== null) {
            this.barangList[index] = new Barang(
                namaBaru.trim(),
                hargaBaru.trim(),
                stokBaru.trim()
            );
            this.saveToLocalStorage();
            this.renderBarangList();
        }
    }

    deleteBarang(index) {
        if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            this.barangList.splice(index, 1);
            this.saveToLocalStorage();
            this.renderBarangList();
        }
    }

    searchBarang(query) {
        const filteredBarangList = this.barangList.filter(barang =>
            barang.nama.toLowerCase().includes(query.toLowerCase())
        );
        this.renderBarangList(filteredBarangList);
    }

    saveToLocalStorage() {
        localStorage.setItem('barangList', JSON.stringify(this.barangList));
    }

    renderBarangList(filteredBarangList = this.barangList) {
        const $tbody = $('#barangList');
        $tbody.empty();
        filteredBarangList.forEach((barang, index) => {
            const $row = $(`
                <tr>
                    <td>${barang.nama}</td>
                    <td>Rp ${barang.harga}</td>
                    <td>${barang.stok}</td>
                    <td>
                        <a class="edit" data-index="${index}">Edit</a>
                        <a class="delete" data-index="${index}">Delete</a>
                    </td>
                </tr>
            `);
            $tbody.append($row);
        });
    }

    clearForm() {
        $('#namaBarang').val('');
        $('#hargaBarang').val('');
        $('#stokBarang').val('');
    }
}

// Initialize BarangManager
const barangManager = new BarangManager();

// Event Handling with jQuery
$(document).ready(function () {
    $('#tambahBarang').click(function () {
        const nama = $('#namaBarang').val();
        const harga = $('#hargaBarang').val();
        const stok = $('#stokBarang').val();
        barangManager.tambahBarang(nama, harga, stok);
    });

    $(document).on('click', '.edit', function () {
        const index = $(this).data('index');
        barangManager.editBarang(index);
    });

    $(document).on('click', '.delete', function () {
        const index = $(this).data('index');
        barangManager.deleteBarang(index);
    });

    $('#searchBarang').on('input', function () {
        const query = $(this).val();
        barangManager.searchBarang(query);
    });
});