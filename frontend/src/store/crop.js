import { create } from 'zustand'

export const useCropStore = create((set) => ({
    crops: [],
    setCrops: (crops) => set({ crops }),
    createCrop: async (newCrop) => {
        if (!newCrop.name || !newCrop.variety || !newCrop.plantingDate || !newCrop.expectedHarvestDate || !newCrop.currentStatus) {
            return {success: false, message: 'Please fill all fields'}
        }
        const res = await fetch('/api/crops', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCrop)
        })
        const data = await res.json()
        set((state) => ({ crops: [...state.crops, data.data] }))
        return {success: true, message: 'Crop created successfully'}
    },
    fetchCrops: async () => {
		const res = await fetch("/api/crops");
		const data = await res.json();
		set({ crops: data.data });
	},
    deleteCrop: async (id) => {
		const res = await fetch(`/api/crops/${id}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ crops: state.crops.filter((crop) => crop._id !== id) }));
		return { success: true, message: data.message };
	},
    updateCrop: async (id, selectedCrop) => {
		const res = await fetch(`/api/crops/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(selectedCrop),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			crops: state.crops.map((crop) => (crop._id === id ? data.data : crop)),
		}));

		return { success: true, message: data.message };
	},
}));