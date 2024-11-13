import express from "express";
import db from "../config/config.js";
import { ref, push, set, get, update } from "firebase/database";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create Mahasiswa
router.post("/", auth, async (req, res) => {
  try {
    const mahasiswa = {
      ...req.body,
      deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const newMahasiswaRef = push(ref(db, 'mahasiswa'));
    await set(newMahasiswaRef, mahasiswa);
    
    res.status(201).json({ 
      message: "Mahasiswa berhasil ditambahkan",
      mahasiswa: { id: newMahasiswaRef.key, ...mahasiswa }
    });
  } catch (error) {
    console.error("Error menambahkan mahasiswa:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menambahkan mahasiswa" });
  }
});

// Read Mahasiswa
router.get("/", auth, async (req, res) => {
  try {
    const mahasiswaRef = ref(db, 'mahasiswa');
    const snapshot = await get(mahasiswaRef);
    
    const mahasiswas = [];
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      if (!data.deleted) {
        mahasiswas.push({
          id: childSnapshot.key,
          ...data
        });
      }
    });
    
    res.status(200).json({
      message: "Data mahasiswa berhasil diambil",
      mahasiswas
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data mahasiswa" });
  }
});

// Update Mahasiswa
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    const mahasiswaRef = ref(db, `mahasiswa/${id}`);
    await update(mahasiswaRef, updateData);
    
    res.status(200).json({
      message: "Data mahasiswa berhasil diperbarui",
      mahasiswa: { id, ...updateData }
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat memperbarui data mahasiswa" });
  }
});

// Delete Mahasiswa
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswaRef = ref(db, `mahasiswa/${id}`);
    await update(mahasiswaRef, {
      deleted: true,
      updatedAt: new Date().toISOString()
    });
    
    res.status(200).json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus mahasiswa" });
  }
});

export default router; 