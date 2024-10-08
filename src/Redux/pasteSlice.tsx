import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


interface Paste {
  _id: string;
  title: string;
  content: string;
  
}

interface PasteState {
  pastes: Paste[];
}

const initialState: PasteState = {
  pastes: JSON.parse(localStorage.getItem("pastes") || "[]"),
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action: PayloadAction<Paste>) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        toast.error("Paste already exists");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste added successfully");
    },

    updatePastes: (state, action: PayloadAction<Paste>) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
  
        state.pastes[index] = paste;

        
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      
        toast.success("Paste updated");
      }
    },

    removeFromPastes: (state, action: PayloadAction<string>) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        
        state.pastes.splice(index, 1);

      
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
    
        toast.success("Paste deleted");
      }
    },

    resetPaste: (state) => {
      state.pastes = [];
      
      localStorage.removeItem("pastes");
      
      toast.success("All pastes reset");
    },
  },
});

export const { addToPastes, removeFromPastes, updatePastes, resetPaste } = pasteSlice.actions;

export default pasteSlice.reducer;

